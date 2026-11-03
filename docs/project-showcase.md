# Reusable project showcase

Opt a project into the viewer with `layout: project-showcase`. Keep its existing
title, description, skills, and main-image metadata for the engineering archive.
The viewer renders only its title and the sections listed in `showcase_sections`.

```yaml
layout: project-showcase
showcase_sections:
  - id: story
    title: My Story
    placeholder: Future project content will go here.
  - id: design
    title: Design
    content_file: sections/design.md
```

Use unique, URL-safe IDs. List order controls the panels, sidebar, and mobile selector.
No layout or JavaScript changes are required
when adding, renaming, removing, or reordering sections.

`placeholder` is optional. Without `content_file`, each section contains a neutral
media placeholder. Later, `content_file` can reference Markdown/HTML relative to the
project's folder (for example `sections/design.md`, without front matter). This can
contain text, images, responsive galleries, or video. Keep media in the project
folder and use site-relative media URLs. The existing YouTube include is available
for future embeds. Panels grow if content needs more than one screen.

The document scrolls normally; there is no nested scrolling region. On these pages
only, the existing site navigation and project title/back button are fixed at the
top. The right sidebar stays visible without a dividing line; mobile uses a sticky
selector below the title.

Scrolling is unrestricted: no automatic snapping, input interception, gesture locks,
forced destinations, or pause-to-unlock behavior. The crimson sidebar highlight
follows the section in view as the document scrolls. Section titles use ordinary
browser anchor links; the mobile selector changes the anchor. There are no scripted
scroll calls or link interception, and sections use natural content height rather
than full-screen panels. Reduced motion disables the highlight animation.
Normal scrolling, keyboard controls, header,
footer, and back navigation remain available at all times.

The earlier pinball write-up is preserved in `_archive/pinball-case-study.md`,
outside the rendered project collection. It is not displayed by the skeleton.
