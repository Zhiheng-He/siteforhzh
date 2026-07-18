# Updating site content without editing HTML

## Home

1. Open `index-editor.html` locally in a browser.
2. Update your name, introduction, photo path, current project, email, and selected News items.
3. Choose **Download home-data.js**.
4. Replace `assets/home-data.js` in GitHub with the downloaded file and commit it.

For a portrait, first upload a web-sized image to `assets/images/`, then enter its path in the editor, for example `assets/images/portrait.jpg`.

## Research

1. Open `content-editor.html` locally in a browser.
2. Select a paper or choose **Add paper +**.
3. Fill in the paper details. Keywords are comma-separated; conference acceptances and awards use one line each. In **Dates**, add any number of lines in the form `Label | date`, for example `First draft | 2025.02` or `Published | 2026.06`.
4. Choose **Download research-data.js**.
5. Replace `assets/research-data.js` in GitHub with the downloaded file and commit it.

The keyword selector keeps every paper in the list. Matching papers appear first; the rest remain visible in a quieter treatment below.

## Life photo albums

1. Open `life-editor.html` locally.
2. Choose an album or create one, then select all its photographs at once with **Batch-select photographs**.
3. Download `life-data.js`.
4. In GitHub, upload that downloaded file to `assets/life-data.js` and upload the selected photographs to the paths shown in the editor, for example `assets/images/albums/kyoto/photo-01.jpg`.
5. Commit the changes. The first selected photograph is used as the cover automatically unless you enter a different cover path.

The editor intentionally only prepares image paths: a static website running in your browser cannot upload files into GitHub by itself. In the GitHub upload screen, you can select all photos from an album together.

## Research images

Upload a web-sized image to `assets/images/`, then enter its path, such as `assets/images/paper-title.jpg`, in the Research editor. A public image URL also works.
