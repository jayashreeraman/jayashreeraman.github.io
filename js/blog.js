let currentView = 'list';
let posts = [];
let currentCategory = 'All';
let searchQuery = '';
let currentTag = null;
let currentPage = 1;
const postsPerPage = 6;

// Fallback post data (in case JSON file fails to load)
const fallbackPosts = [
  {
    "title": "md to html",
    "category": "Learning",
    "url": "./posts/html/learning/j-md_to_html.html",
    "date": "2024-01-15",
    "tags": ["markdown", "html", "tools"],
    "excerpt": "A guide on converting markdown files to HTML format."
  },
  {
    "title": "how to read",
    "category": "Learning",
    "url": "./posts/html/learning/j-how_to_read.html",
    "date": "2024-01-10",
    "tags": ["reading", "learning", "tips"],
    "excerpt": "Tips and strategies for effective reading and comprehension."
  },
  {
    "title": "Urban Planning Basics",
    "category": "Urban Planning",
    "url": "./posts/html/urban/j-urban_planning.html",
    "date": "2024-01-05",
    "tags": ["planning", "urban", "development"],
    "excerpt": "Introduction to fundamental urban planning principles."
  },
  {
    "title": "Data Analysis for Cities",
    "category": "Urban Analytics",
    "url": "./posts/html/urban/j-urban_analytics.html",
    "date": "2023-12-28",
    "tags": ["analytics", "data", "urban"],
    "excerpt": "How to use data analytics to understand urban patterns."
  },
  {
    "title": "Policy Framework Overview",
    "category": "Urban Policy",
    "url": "./posts/html/urban/j-urban_policy.html",
    "date": "2023-12-20",
    "tags": ["policy", "governance", "urban"],
    "excerpt": "Understanding urban policy frameworks and their implementation."
  }
];

// Fetch posts from JSON
async function loadPosts() {
  try {
    const path = window.postsJsonPath || './posts.json';
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    posts = data.posts;
  } catch (error) {
    console.warn('Could not load posts.json, using fallback data:', error);
    posts = fallbackPosts;
  }
  populateCategories();
  renderPosts();
}

// Dynamically extract and populate categories from the loaded data
function populateCategories() {
  const select = document.getElementById('categoryFilter');
  if (!select) return;
  
  const uniqueCategories = [...new Set(posts.map(post => post.category))].sort();
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    if (category === currentCategory) option.selected = true;
    select.appendChild(option);
  });
}

// Render posts based on current view
function renderPosts() {
  const container = document.getElementById('postsContainer');
  container.innerHTML = '';
  
  // Filter posts by category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = currentCategory === 'All' || post.category === currentCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
                          post.title.toLowerCase().includes(searchLower) || 
                          post.excerpt.toLowerCase().includes(searchLower) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchLower));
    const matchesTag = currentTag === null || post.tags.includes(currentTag);
    return matchesCategory && matchesSearch && matchesTag;
  });
  
  // Render the active tag filter badge
  const activeFiltersContainer = document.getElementById('activeFilters');
  if (activeFiltersContainer) {
    if (currentTag) {
      activeFiltersContainer.innerHTML = `<button class="clear-tag-btn" onclick="clearTagFilter()">Filtering by tag: #${currentTag} &times;</button>`;
    } else {
      activeFiltersContainer.innerHTML = '';
    }
  }

  if (filteredPosts.length === 0) {
    container.innerHTML = '<p style="color: #718096; padding: 2rem 0;">No posts found matching your search criteria.</p>';
    container.className = '';
    document.getElementById('paginationContainer').innerHTML = ''; // clear pagination
    return;
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  if (currentPage > totalPages) currentPage = totalPages;
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  if (currentView === 'list') {
    renderListView(paginatedPosts);
  } else {
    renderCardView(paginatedPosts);
  }
  
  renderPagination(totalPages);
}

// Render pagination controls
function renderPagination(totalPages) {
  const container = document.getElementById('paginationContainer');
  container.innerHTML = '';

  if (totalPages <= 1) return; // Hide pagination if only 1 page

  // Prev button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.innerHTML = '&laquo; Prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => goToPage(currentPage - 1);
  container.appendChild(prevBtn);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.onclick = () => goToPage(i);
    container.appendChild(pageBtn);
  }

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.innerHTML = 'Next &raquo;';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => goToPage(currentPage + 1);
  container.appendChild(nextBtn);
}

// List view rendering
function renderListView(postsToRender) {
  const container = document.getElementById('postsContainer');
  container.className = 'posts-list';
  
  postsToRender.forEach(post => {
    const item = document.createElement('div');
    item.className = 'post-item-list';
    item.innerHTML = `
      <div class="post-header">
        <h3><a href="${post.url}">${post.title}</a></h3>
        <span class="post-date">${new Date(post.date).toLocaleDateString()}</span>
      </div>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-meta">
        <span class="post-category">${post.category}</span>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

// Card view rendering
function renderCardView(postsToRender) {
  const container = document.getElementById('postsContainer');
  container.className = 'posts-grid';
  
  postsToRender.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="card-content">
        <h3><a href="${post.url}">${post.title}</a></h3>
        <span class="post-date">${new Date(post.date).toLocaleDateString()}</span>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-meta">
          <span class="post-category">${post.category}</span>
          <div class="post-tags">
            ${post.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Toggle view buttons
document.getElementById('listViewBtn').addEventListener('click', () => {
  currentView = 'list';
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('listViewBtn').classList.add('active');
  renderPosts();
});

document.getElementById('cardViewBtn').addEventListener('click', () => {
  currentView = 'card';
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('cardViewBtn').classList.add('active');
  renderPosts();
});

// Update URL with current filters
function updateURL() {
  const url = new URL(window.location);
  
  if (currentCategory !== 'All') url.searchParams.set('category', currentCategory);
  else url.searchParams.delete('category');
  
  if (searchQuery) url.searchParams.set('search', searchQuery);
  else url.searchParams.delete('search');
  
  if (currentTag) url.searchParams.set('tag', currentTag);
  else url.searchParams.delete('tag');
  
  if (currentPage > 1) url.searchParams.set('page', currentPage);
  else url.searchParams.delete('page');
  
  window.history.replaceState({}, '', url);
}

// Navigation logic for pagination
window.goToPage = function(page) {
  currentPage = page;
  updateURL();
  renderPosts();
  document.querySelector('.controls-container').scrollIntoView({ behavior: 'smooth' });
};

// Tag filtering functions (attached to window so inline onclick can reach them)
window.filterByTag = function(tag) {
  currentTag = tag;
  currentPage = 1; // reset to first page on filter
  updateURL();
  renderPosts();
};

window.clearTagFilter = function() {
  currentTag = null;
  currentPage = 1; // reset to first page on filter
  updateURL();
  renderPosts();
};

// Load posts on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize filters from URL
  const params = new URLSearchParams(window.location.search);
  if (params.has('category')) currentCategory = params.get('category');
  if (params.has('search')) {
    searchQuery = params.get('search');
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = searchQuery;
  }
  if (params.has('tag')) currentTag = params.get('tag');
  if (params.has('page')) currentPage = parseInt(params.get('page')) || 1;

  loadPosts();

  // Filter Event Listeners
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      currentPage = 1; // reset on search
      updateURL();
      renderPosts();
    });
  }
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      currentPage = 1; // reset on filter
      updateURL();
      renderPosts();
    });
  }
});
