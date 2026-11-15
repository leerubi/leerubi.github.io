# Dajin Lee research portfolio

Static academic portfolio for https://leerubi.github.io/.

## Structure

- `index.html`: research introduction, category filters, and visual project gallery.
- `publications.html`: full papers by year and a separate published extended-abstract section.
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

Only published research is presented as project content. Unpublished music exploration work and the unpublished STO full-paper extension are not included. The already published CHI 2026 STO extended abstract appears only in its own bibliographic section, explicitly labeled as an extended abstract. Other manuscripts under review are not displayed. The existing public CV is retained unchanged.

Future interests are stated as interests, without presenting proposed devices or results as completed work. No confidential manuscripts, private proposal text, or unpublished media have been added.

## Research media

Project figures are extracted from the author's supplied published papers, with captions and links to the original publications. They document the collaborative research projects and do not imply that every component was personally fabricated by Dajin Lee. No synthetic research photographs or fabricated experimental results are used.

YouTube and Google Drive players load only after a visitor clicks the play control. The original video link remains available below the player in case embedding is unavailable.

## Existing resources

The public CV is `CV_Dajin_Lee_261015_public.pdf`. The former homepage linked to a résumé file that was absent from the repository; that broken link has been removed. Original repository assets are preserved in Git history and are not deleted as part of this redesign.
