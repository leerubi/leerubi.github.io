'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname,'..');
const data = JSON.parse(fs.readFileSync(path.join(root,'research.json'),'utf8'));
const files = ['index.html','publications.html','cv.html',...data.projects.map(project=>`projects/${project.id}.html`)];
let localLinks=0;
for (const file of files) {
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: one h1`);
  assert(html.includes('aria-label="Main navigation"'),`${file}: navigation`);
  assert(html.includes('id="main"'),`${file}: main landmark`);
  assert(!/Confidential|href="undefined"|doi.org\/XXXX/.test(html),`${file}: no private filenames or placeholder links`);
  for (const match of html.matchAll(/\b(?:href|src|data)="([^"#]+)(?:#[^"]*)?"/g)) {
    const url=match[1].replace(/&amp;/g,'&');
    if (/^(?:https?:|mailto:|data:)/.test(url))continue;
    const destination=path.resolve(path.dirname(path.join(root,file)),url);
    assert(destination.startsWith(root+path.sep),`${file}: path containment`);
    assert(fs.existsSync(destination),`${file}: missing ${url}`);
    localLinks++;
  }
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]*"/.test(image[0]),`${file}: image alternative`);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${match[1]}"`),`${file}: broken fragment ${match[1]}`);
}
const pub=fs.readFileSync(path.join(root,'publications.html'),'utf8');
assert(pub.includes('ACM CHI Extended Abstracts'));
assert(pub.includes('Extended abstract'));
assert(pub.includes('id="under-review"'));
assert(!pub.includes('id="year-2027"'),'review submissions are not published papers');
for(const project of data.projects.filter(project=>project.status)){
  assert.equal(project.status,'Under review');
  assert(!project.paper,'no public manuscript URL has been supplied');
  const page=fs.readFileSync(path.join(root,'projects',project.id+'.html'),'utf8');
  assert(page.includes('Under review')&&page.includes('Manuscript'),'clear review status');
}
assert.equal(data.projects.filter(project=>project.status).length,3);
const css=fs.readFileSync(path.join(root,'assets/style.css'),'utf8');
assert(css.includes('*[hidden]{display:none!important}'),'filtered lead project stays hidden');
assert(css.includes('@media(max-width:560px)'),'mobile layout');
assert(css.includes("--sans:'Open Sans'")&&!/DM Sans|Libre Caslon|Georgia/.test(css),'one typeface');
assert(css.includes('--brand:#0085ca'),'Interaction Laboratory blue');
const buttons=['all',...data.categories.map(category=>category.id)].map(id=>({dataset:{filter:id},textContent:id,setAttribute(key,value){this[key]=value;},addEventListener(event,callback){this.click=callback;}}));
const cards=data.projects.map(project=>({dataset:{category:project.category},hidden:false}));
const count={textContent:''};
let createdFrame;
const video={dataset:{videoSrc:'https://www.youtube-nocookie.com/embed/LsX1mJNLg8k?autoplay=1',videoTitle:'Research presentation'},addEventListener(event,callback){this.click=callback;},replaceWith(frame){createdFrame=frame;}};
const context={document:{querySelectorAll(selector){return selector==='[data-filter]'?buttons:selector==='[data-category]'?cards:selector==='[data-video-src]'?[video]:[];},querySelector(){return count;},createElement(){return {focus(){this.focused=true;}};}}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/site.js'),'utf8'),context);
for (const button of buttons) {
  button.click();
  const expected=data.projects.filter(project=>button.dataset.filter==='all'||project.category===button.dataset.filter).length;
  assert.equal(cards.filter(card=>!card.hidden).length,expected);
  assert(count.textContent.startsWith(String(expected)));
  assert.equal(buttons.filter(item=>item['aria-pressed']==='true').length,1);
}
video.click();
assert(createdFrame.src.startsWith('https://www.youtube-nocookie.com/'));
assert.equal(createdFrame.title,'Research presentation');
assert(createdFrame.focused);
const assets=new Set(data.projects.flatMap(project=>[project.image,project.extraImage].filter(Boolean)));
for(const image of assets){const bytes=fs.readFileSync(path.join(root,'assets/images',image));assert.equal(bytes[0],0xff);assert.equal(bytes[1],0xd8);}
console.log(`Verified ${files.length} pages, ${localLinks} local links, ${assets.size} research images, all category filters, and click-to-load video behavior.`);
