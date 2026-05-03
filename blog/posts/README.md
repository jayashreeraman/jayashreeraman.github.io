# Blog Posts

All blog posts are stored as markdown files in category-specific folders and automatically converted to HTML via GitHub Actions.

## Adding a New Post

### Step 1: Create a Markdown File

Create a new `.md` file in the appropriate category folder:

```
posts/
├── administrivia/
│   └── your-post.md
├── learning/
│   └── your-post.md
└── urban/
    └── your-post.md
```

### Step 2: Write Your Markdown

Example `posts/urban/my-post.md`:

```markdown
# My Post Title

Published: 2024-01-20
Tags: tag1, tag2, tag3

## Introduction

Your post content goes here...

## Section 2

More content...
```

### Step 3: Update posts.json

Add an entry to `/blog/posts.json`:

```json
{
  "title": "My Post Title",
  "category": "Urban Planning",
  "url": "./posts/urban/my-post.html",
  "date": "2024-01-20",
  "tags": ["tag1", "tag2", "tag3"],
  "excerpt": "Brief description of your post..."
}
```

### Step 4: Push to Main Branch

Push your changes to the main branch:

```bash
git add blog/posts/**/*.md
git commit -m "Add new post: My Post Title"
git push origin main
```

The GitHub Actions workflow will automatically:
1. Detect the new markdown files
2. Convert them to HTML using markdown-folder-to-html
3. Commit the converted HTML files back to the repository

## Workflow Details

- **Trigger**: Runs on push to `main` branch when markdown files in `blog/posts/` are modified
- **Tool**: Uses [markdown-folder-to-html](https://github.com/joakin/markdown-folder-to-html)
- **Output**: Generates `.html` files in the same directory as `.md` files
- **Auto-commit**: Converted HTML files are automatically committed and pushed

## File Structure

```
blog/
├── index.html
├── posts.json
├── README.md
├── posts/
│   ├── administrivia/
│   │   ├── md_to_html.md
│   │   └── md_to_html.html
│   ├── learning/
│   │   ├── how_to_read.md
│   │   └── how_to_read.html
│   └── urban/
│       ├── urban_planning.md
│       ├── urban_planning.html
│       ├── urban_analytics.md
│       ├── urban_analytics.html
│       ├── urban_policy.md
│       └── urban_policy.html
```

## Tips

- Keep your markdown file names consistent with their URL slugs (use hyphens, no spaces)
- Update `posts.json` before pushing to ensure posts appear on the blog
- The workflow runs automatically; you don't need to manually convert files
- Check the Actions tab in your GitHub repository to see workflow results
