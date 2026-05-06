# Sanity Data Migration Scripts

This directory contains scripts to migrate existing blog posts and off-plan properties from code files into Sanity CMS.

## Prerequisites

1. **Sanity Write Token**: You need a Sanity API write token to run the migrations.
   - Go to https://sanity.io/manage
   - Select your project
   - Go to API → Tokens
   - Create a new token with **Editor** permissions
   - Add it to your `.env.local` file:
     ```
     SANITY_API_WRITE_TOKEN=your_token_here
     ```

2. **Environment Variables**: Make sure these are set in `.env.local`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_WRITE_TOKEN`

## Usage

### Migrate All Data

Run both migrations in sequence:

```bash
npm run migrate:all
```

### Migrate Individual Content Types

**Off-Plan Properties Only:**
```bash
npm run migrate:off-plan
```

**Blog Posts Only:**
```bash
npm run migrate:blogs
```

## What Gets Migrated

### Off-Plan Properties
- All properties from `data/off-plan-data.js`
- Fields: slug, title, fullTitle, location, category, rooms, area, price, geography, description
- Images remain in `/public` folder (not uploaded to Sanity)

### Blog Posts
- All blog posts from `components/pages/BlogDetailPage.js`
- Merged with metadata from `app/blogs/[blogId]/page.js`
- Fields: title, slug, metaTitle, metaDescription, date, details (content), excerpt
- Images need to be uploaded manually in Sanity Studio

## Notes

- **Original files are preserved** - The migration scripts don't modify your existing data files
- **Duplicate checking** - Scripts skip documents that already exist in Sanity
- **Rate limiting** - 200ms delay between requests to avoid API limits
- **Error handling** - Individual document errors won't stop the migration
- **Images** - Images stay in `/public` folder. Upload them manually in Sanity Studio if needed

## Troubleshooting

### "SANITY_API_WRITE_TOKEN not found"
- Make sure you've added the token to `.env.local`
- Check that the token has Editor permissions

### "No data found"
- Verify the source files exist and have the correct structure
- Check file paths in the scripts

### Migration fails partway through
- The script will continue with remaining items
- Check the error messages to see which documents failed
- You can re-run the script - it will skip existing documents

## After Migration

1. Visit `http://localhost:3000/studio` to view your content
2. Review and edit content as needed
3. Upload images manually in Sanity Studio
4. Test your pages to ensure everything works correctly


