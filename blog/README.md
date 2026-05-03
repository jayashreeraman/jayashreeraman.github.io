# Blog

This is a dynamic blog system that loads posts from a JSON file, making it easy to add and manage content without editing HTML.

## Adding New Posts

### Step 1: Create Your Post HTML File
Create a new HTML file in the appropriate category folder (`Administrivia/`, `Learning/`, or `Urban/`).

Example structure:
```
blog/
├── Administrivia/
├── Learning/
├── Urban/
│   ├── urban_planning.html
│   ├── urban_analytics.html
│   └── urban_policy.html
```

### Step 2: Add Post Metadata to posts.json

Open `blog/posts.json` and add a new entry to the `posts` array:

```json
{
  "title": "Your Post Title",
  "category": "Category Name",
  "url": "./Category/filename.html",
  "date": "YYYY-MM-DD",
  "tags": ["tag1", "tag2", "tag3"],
  "excerpt": "A brief description of your post (2-3 sentences)."
}
```

### Field Descriptions

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Post title | "Urban Planning Basics" |
| `category` | Category name (Administrivia, Learning, Urban Planning, Urban Analytics, Urban Policy) | "Urban Planning" |
| `url` | Relative path to the HTML file | "./Urban/urban_planning.html" |
| `date` | Publication date in YYYY-MM-DD format | "2024-01-15" |
| `tags` | Array of relevant tags | ["planning", "urban", "development"] |
| `excerpt` | Brief preview of the post content | "Introduction to fundamental..." |

### Step 3: Verify the Post Appears

The post will automatically appear on the blog homepage in both list and card views. No additional changes needed!

## Example: Adding a New Urban Policy Post

1. Create `blog/Urban/new_policy_post.html`
2. Add to `posts.json`:
```json
{
  "title": "Zoning Laws in Modern Cities",
  "category": "Urban Policy",
  "url": "./Urban/new_policy_post.html",
  "date": "2024-01-20",
  "tags": ["zoning", "policy", "regulation"],
  "excerpt": "An exploration of zoning laws and their impact on urban development."
}
```
3. The post is live!

## View Modes

The blog supports two view modes:
- **List View**: Posts displayed as a list with metadata
- **Card View**: Posts displayed as responsive cards in a grid

Users can toggle between views using the buttons at the top of the blog page.

## Troubleshooting

### Posts not showing?
1. **Check posts.json exists** at `/blog/posts.json`
2. **Verify JSON format** - ensure all fields are present and properly formatted
3. **Check browser console** (F12) for error messages
4. **Fallback data** - The blog includes fallback post data that will display if `posts.json` cannot be loaded

### To update posts:
- Edit `blog/posts.json` directly
- The blog will automatically load your changes (may need to refresh page)
- Fallback data ensures posts always display, even if JSON file has issues

## File Structure

```
blog/
├── index.html              # Main blog page
├── posts.json              # Post metadata (edit this to add posts)
├── README.md               # This file
├── Administrivia/
│   └── md_to_html.html
├── Learning/
│   └── how_to_read.html
└── Urban/
    ├── index.html
    ├── urban_planning.html
    ├── urban_analytics.html
    └── urban_policy.html
```
