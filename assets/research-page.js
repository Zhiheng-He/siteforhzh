(() => {
  const data = window.RESEARCH_DATA, list = document.querySelector('[data-paper-list]'), detail = document.querySelector('[data-paper-detail]'), filterRow = document.querySelector('[data-filter-row]'), status = document.querySelector('[data-filter-status]'), count = document.querySelector('[data-paper-count]');
  let activeFilter = 'all', activeId = data.papers[0]?.id;
  const filterTags = paper => ['all', ...paper.tags];
  const matches = paper => filterTags(paper).includes(activeFilter);
  const ordered = () => [...data.papers].sort((a,b) => Number(matches(b)) - Number(matches(a)));
  const dates = paper => paper.dates?.length ? paper.dates : [{label:'First draft', date:paper.firstDraft || paper.year || ''}, ...(paper.updated ? [{label:'Updated', date:paper.updated}] : [])].filter(item => item.date);
  /* Seven muted keyword colours. New keywords receive a stable colour from this set. */
  const palette = [{bg:'#d4e0d4',ink:'#42604d'},{bg:'#e7ddd7',ink:'#735c54'},{bg:'#dfe1ed',ink:'#525f78'},{bg:'#e4ddea',ink:'#6c6078'},{bg:'#d9e5e5',ink:'#4e696b'},{bg:'#e8e0c3',ink:'#706342'},{bg:'#d9dfbc',ink:'#5f653e'}];
  const colourSlots = {care:0, culture:1, methods:2, technology:3, memory:4, place:5, material:6};
  const colourFor = keyword => { if (keyword === 'all') return {bg:'#e4e3dd',ink:'#62665f'}; const n = [...keyword].reduce((sum,char) => sum + char.charCodeAt(0), 0); return palette[colourSlots[keyword] ?? n % palette.length]; };
  const tagStyle = keyword => { const colour = colourFor(keyword); return `style="--keyword-bg:${colour.bg};--keyword-ink:${colour.ink}"`; };
  const setDetailGlow = paper => { const colours = paper.tags.map(tag => colourFor(tag).bg); ['one','two','three'].forEach((slot,index) => detail.style.setProperty(`--detail-glow-${slot}`, colours[index % colours.length] || '#d4e0d4')); };
  const tags = values => values.map(value => `<span class="keyword-tag" ${tagStyle(value)}>${value}</span>`).join('');
  const venue = paper => paper.venueBold === false ? `<i>${paper.venue}</i>` : `<strong><i>${paper.venue}</i></strong>`;
  const dateMarkup = (paper, className) => `<span class="${className}">${dates(paper).map(item => `<span><b>${item.label}</b>${item.date}</span>`).join('')}</span>`;
  const renderDetail = paper => {
    if (!paper) { detail.innerHTML = '<p class="empty-detail">No papers available yet.</p>'; return; }
    setDetailGlow(paper);
    const usableLinks = paper.links?.filter(link => !['DOI','Project page'].includes(link.label)) || [];
    const actions = usableLinks.length ? `<span class="detail-actions">${usableLinks.map(link => `<a href="${link.url}" target="_blank" rel="noreferrer"><span class="paper-link-globe" aria-hidden="true"></span>link to paper</a>`).join('')}</span>` : '';
    const outcomes = paper.outcomes?.length ? `<section class="detail-outcomes"><ul>${paper.outcomes.map(item => `<li>${item}</li>`).join('')}</ul></section>` : '';
    const visual = paper.media ? `<figure class="detail-media"><img src="${paper.media}" alt="Project visual for ${paper.title}" /></figure>` : `<div class="detail-media placeholder"><span>Optional image, diagram,<br />or project still</span></div>`;
    detail.innerHTML = `<div class="detail-top"><p class="eyebrow">${paper.type}</p><div class="detail-tags">${tags(paper.tags)}</div></div><h2 class="detail-title">${paper.title} ${actions}</h2><p class="detail-citation"><span>${paper.authors}</span>${venue(paper)}<span>${paper.publication}</span></p><div class="detail-date-row">${dateMarkup(paper,'detail-dates')}</div><div class="detail-body"><section><p>${paper.abstract}</p></section>${outcomes}${visual}</div>`;
  };
  const renderList = () => {
    const papers = ordered(); if (!papers.some(paper => paper.id === activeId)) activeId = papers[0]?.id;
    const row = (paper,index) => `<button class="paper-row ${paper.id === activeId ? 'is-selected' : ''} ${matches(paper) ? 'is-match' : 'is-muted'}" data-id="${paper.id}" aria-current="${paper.id === activeId}"><span class="row-no">${String(index+1).padStart(2,'0')}</span><span class="row-main"><span class="row-title">${paper.title}</span><span class="row-meta">${paper.authors} · ${venue(paper)}</span><span class="row-tags">${tags(paper.tags)}</span></span>${dateMarkup(paper,'row-dates')}</button>`;
    const selected = papers.filter(matches), remaining = papers.filter(paper => !matches(paper));
    list.innerHTML = `<div class="matched-paper-group ${activeFilter === 'all' ? 'is-all' : ''}" ${tagStyle(activeFilter)}>${selected.map((paper,index) => row(paper,index)).join('')}</div>${remaining.length ? `<div class="unmatched-paper-group">${remaining.map((paper,index) => row(paper,index + selected.length)).join('')}</div>` : ''}`;
    list.querySelectorAll('.paper-row').forEach(button => button.addEventListener('click', () => { activeId = button.dataset.id; renderList(); }));
    const matched = selected.length; if (count) count.textContent = `${data.papers.length} papers`; status.textContent = activeFilter === 'all' ? 'Showing all research' : `${matched} matching · others retained below`; renderDetail(data.papers.find(paper => paper.id === activeId));
  };
  const renderFilters = () => { filterRow.innerHTML = ['all',...data.keywords].map(keyword => `<button class="archive-pill ${keyword === activeFilter ? 'is-active' : ''} ${keyword === 'all' ? 'all-filter' : 'keyword-filter'}" data-filter="${keyword}" ${tagStyle(keyword)}>${keyword}<span>${data.papers.filter(paper => filterTags(paper).includes(keyword)).length}</span></button>`).join(''); filterRow.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; activeId = ordered()[0]?.id; renderFilters(); renderList(); })); };
  const setFilterClearance = () => document.documentElement.style.setProperty('--filter-clearance', `${filterRow.closest('.archive-filter').offsetHeight + 28}px`);
  renderFilters(); renderList(); setFilterClearance(); window.addEventListener('resize', setFilterClearance);
})();
