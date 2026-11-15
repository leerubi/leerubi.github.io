# Dajin Lee research portfolio

Static academic portfolio for https://leerubi.github.io/.

## Structure

- `index.html`: research introduction, category filters, and visual project gallery.
- `publications.html`: manuscripts under review, full papers by year, and a separate published extended-abstract section.
- `cv.html`: CV highlights and the existing public CV.
- `projects/`: individual research pages with figures, systems, findings, and on-demand video embeds.
- `research.json`: public project content and publication metadata.
- `assets/`: styles, progressive enhancement, and images from the published research.

Regenerate the HTML after editing research content:

```sh
node scripts/build-site.cjs
```

The site has no build-time dependencies. GitHub Pages serves the generated files directly from the repository root. Navigation, research content, and publication links work without JavaScript; JavaScript adds category filtering and click-to-load video players.

## Content scope

The portfolio includes published work and three author-authorized manuscripts under review: STO (CHI 2027 submission), multimodal music previews (CHI 2027 submission), and co-located head cues (Virtual Reality, Springer). Review status is shown on cards and project pages, and these manuscripts have their own section above published papers. The CHI 2026 STO extended abstract remains a separate bibliographic entry. Unpublished manuscript PDFs are not uploaded; the portfolio presents figures, research summaries, and the existing supplementary video links. The public CV is retained unchanged.

Future interests are stated as interests, without presenting proposed devices or results as completed work. No full manuscript PDFs or private proposal text have been uploaded.

## Research media

Project figures come from author-provided research material. HAPTCHA, UIST 2024 heartbeat feedback, and Social Touch use the supplied teaser PNGs; WHC 2021 uses the original vector figures rendered with their backgrounds intact. New manuscript figures preserve their original alpha masks on white. Published papers link to their original publications. They document the collaborative research projects and do not imply that every component was personally fabricated by Dajin Lee. No synthetic research photographs or fabricated experimental results are used.

YouTube and Google Drive players load only after a visitor clicks the play control. The original video link remains available below the player in case embedding is unavailable.

## Existing resources

The public CV is `CV_Dajin_Lee_261015_public.pdf`. The former homepage linked to a résumé file that was absent from the repository; that broken link has been removed. Original repository assets are preserved in Git history and are not deleted as part of this redesign.

## Typography and color

All site typography uses Open Sans. The lab brand blue is `#0085ca`, verified from the Interaction Laboratory stylesheet. Small text and button backgrounds use the darker `#00699f` for contrast.
