'use strict';
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml','.pdf':'application/pdf','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
http.createServer((request,response)=>{let file;try{const pathname=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname);file=path.resolve(root,'.'+pathname);if(pathname.endsWith('/'))file=path.join(file,'index.html');if(!file.startsWith(root+path.sep))throw Error();const stat=fs.statSync(file);if(!stat.isFile())throw Error();response.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Content-Length':stat.size,'Cache-Control':'no-store'});fs.createReadStream(file).pipe(response);}catch{response.writeHead(404);response.end('Not found');}}).listen(4173,'127.0.0.1',()=>console.log('Portfolio preview: http://127.0.0.1:4173/'));
