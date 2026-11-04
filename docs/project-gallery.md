# Project photo galleries

The pinball gallery data is in the project's `index.md`, under `project_gallery`.
The current gallery contains 143 photos and 43 ordinary videos, arranged in four
eras: Pre-Playfield (52), Playfield (83), Electrical (22), and Final (29).
The 130 Apple Live Photo movie companions and the ZIP archive are excluded.
The second video was removed from the listing because it did not work; its source
file remains in the folder. No source files were deleted or renamed.
Filenames are displayed as temporary captions to make review and regrouping easy.

The eras follow these positions in the original ten-item review groups:

- Pre-Playfield: Groups 1–2, Group 5 items 8–10, and Groups 6–8.
- Playfield: Groups 3–4 and Group 5 items 1–7, excluding Group 3 items 4–5;
  followed by Group 11 item 4 through Group 17 item 1.
- Electrical: Group 9 through Group 11 item 3.
- Final: Group 17 item 2 onward, followed by the two videos moved from Group 3
  items 4–5.

Put photos in `_projects/custom-electromechanical-pinball-machine/gallery/` and
set each entry's `image` to a relative filename such as `gallery/finished-front.png`.
File extensions and capitalization must match. Each image entry has a unique `id`,
optional `alt` and `caption`, and a `featured` flag.

```yaml
- id: finished-front
  image: gallery/finished-front.png
  alt: Front view of the finished machine
  caption: ""
  featured: true
```

Entries marked `featured: true` appear in the project-page preview. Keep four
entries featured to retain the four-cover preview. Add more entries with
`featured: false` to show them only on the full gallery page. Group order and image
order follow the YAML list. Rename groups or add more groups with a `title` and
`images` list to reorganize the right-side collection.

View All Photos opens `/projects/custom-electromechanical-pinball-machine/gallery/`
in the same tab. Clicking a featured slot opens that page with that photo selected.
The page title is Gallery in a fixed, full-width crimson banner beneath the site
navigation. The current era appears above the main viewer and updates
with selection. The selected photo/video uses approximately three-quarters of the
old viewing width, with the previous and next items previewed on either side.
Click a side preview, use Left/Right keys in the viewer, swipe a photo horizontally,
or scroll horizontally over the viewer to change selection. Vertical page scrolling
is unchanged. Previous/next navigation crosses eras but stops at the first/last item.
At the first item, the empty left preview shows a right-pointing Scroll cue; at the
last, the right preview shows a left-pointing Scroll cue. Clicking a cue moves inward.
Only the selected center item uses a video player; neighboring videos remain static
dark-grey Play tiles and do not download or play. Side photos use small thumbnails.
On desktop, the selector panel uses two-thirds of its previous width, with centered
era headings. Its thumbnail grid adjusts its density to fit the available window
height. The viewer's overall grid allocation is unchanged; its center uses the
three-quarter-width treatment described above.
The three-image viewer scales together on desktop to balance its left outer gap
with the space before the thumbnail panel. Each era title is a full-width crimson
button matching the thumbnail grid's width; selecting it displays the era's first
item (photo or video), with the current era shown in a darker crimson.
On mobile these areas stack. The Back link returns to the project's Gallery section.
Missing files show neutral placeholders. Main images are contained without cropping;
thumbnail previews fill their frames.

The sidebar uses separate 160-pixel JPEG thumbnails, referenced with `thumbnail`.
The five featured photos use 640-pixel previews, referenced with `preview`.
These derived files live in `gallery/thumbnails/` and `gallery/previews/`; do not
import those folders as additional gallery photos. Originals remain unchanged and
load only when selected in the main viewer. Thumbnails load lazily and decode
asynchronously. Video tiles use a dark grey background and do not load video data
until selected.

## Videos

Video entries live in the same `images` list as photos, but use `video` instead of
`image`. They display a Play video tile and play in the large viewer when selected.
They start muted with normal player controls for sound, pause, seeking, and fullscreen.
If the browser blocks autoplay, use the Play control. Switching items pauses and
unloads the previous video. If a format cannot play, an Open original video link
appears. MP4/H.264 is the preferred browser-compatible format.

```yaml
- id: gameplay
  video: gallery/gameplay.mp4
  alt: Gameplay video
  caption: Gameplay video
  featured: false
```

Only explicitly listed entries appear; the folder is not automatically imported.
Apple Live Photo MOV companions are not listed. An entry marked `live_photo: true`
is excluded from both featured slots and the full viewer. Ordinary MOV videos are
not blanket-excluded. The first five photos are temporarily marked featured; move
those flags to your final five selections later. To rearrange review groups, move
entries between the `images` lists and rename the corresponding group titles.

The route is defined in `project-galleries/pinball.html`, outside the project
collection so it does not become another engineering project card. Its `project_id`
matches the project's `gallery_id`. Future projects can reuse `project-gallery`
with a matching ID, their own permalink, and `project_return_url`.

Electrical Era cover: IMG_2382.JPEG. IMG_2387.MP4 was removed from the
gallery listing at the owner's request; the original file is retained.
