(() => {
  const data = window.LIFE_DATA || { albums: [] };
  const projects = document.querySelector('[data-photo-projects]');
  const dialog = document.querySelector('.gallery-dialog');
  const title = document.querySelector('[data-gallery-title]');
  const grid = document.querySelector('[data-gallery-grid]');
  const classes = ['photo-a', 'photo-b', 'photo-c'];
  const cycle = ['16:9','3:2','9:16','1:1','4:5','2:3','5:4'];
  const open = album => { title.textContent = album.location; const images = album.images || []; grid.innerHTML = images.length ? images.map((src,index) => `<img src="${src}" alt="${album.location}, photograph ${index + 1}" loading="lazy" />`).join('') : '<div class="gallery-empty">Add photographs through <em>life-editor.html</em>.</div>'; dialog.showModal(); };
  projects.innerHTML = data.albums.map((album,index) => { const aspect = album.aspect || cycle[index % cycle.length]; const aspectClass = `aspect-${aspect.replace(':', 'x')}`; return `<button class="photo-project ${aspectClass} ${classes[index % classes.length]} ${album.cover ? 'has-image' : ''}" style="--album-aspect:${aspect.replace(':',' / ')}" data-id="${album.id}">${album.cover ? `<img class="album-cover" src="${album.cover}" alt="${album.location}" loading="lazy" />` : ''}<strong>${album.location}</strong></button>`; }).join('');
  projects.querySelectorAll('.photo-project').forEach(button => button.addEventListener('click', () => open(data.albums.find(album => album.id === button.dataset.id))));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
