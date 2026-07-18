# Content editing guide

## Research

Keep the seven most current or representative items inside the `Recent Featured Research` section in `research.html`. Put older or supplementary work in `Full List`.

Each item has a `data-tags` value. Use comma-separated lowercase keywords, for example `data-tags="care,method"`. Add the same visible keyword labels inside its `tag-list`. The filter automatically handles both sections.

Featured entries can also include a `project-media` figure beneath the abstract. Replace its placeholder with an image, diagram, video still, or other project visual stored in `assets/images/`; you can keep or remove the figure per paper.

For a featured item, duplicate a full `research-card` block and give its abstract a new unique ID. For a full-list item, duplicate a `full-list-item` block. Increase `data-order` for a new older item so that `all` restores chronological order.

## News

Replace the three list items in the `news-list` in `index.html`. Use the `time` element for a compact date and the paragraph for the update.

## Music

In `life.html`, replace `id=000000` in each NetEase iframe URL with the ID from NetEase's generated embed code. The responsive layout requires no further changes.
