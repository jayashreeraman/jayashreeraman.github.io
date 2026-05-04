let currentView = 'list';
let posts = [];

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
  renderPosts();
}

// Render posts based on current view
function renderPosts() {
  const container = document.getElementById('postsContainer');
  container.innerHTML = '';
  
  if (currentView === 'list') {
    renderListView();
  } else {
    renderCardView();
  }
}

// List view rendering
function renderListView() {
  const container = document.getElementById('postsContainer');
  container.className = 'posts-list';
  
  posts.forEach(post => {
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
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

// Card view rendering
function renderCardView() {
  const container = document.getElementById('postsContainer');
  container.className = 'posts-grid';
  
  posts.forEach(post => {
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
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
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

// Load posts on page load
document.addEventListener('DOMContentLoaded', loadPosts);
