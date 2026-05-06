"use server";

import fs from 'fs';
import path from 'path';
import axios from 'axios';

const BLOG_LINKS_FILE = path.join(process.env.NODE_ENV === 'production' ? '/vercel/path0/.next/server' : process.cwd(), 'data', 'blogLinks.json');
//const BLOG_LINKS_API = 'https://hspropertyae.adiie9.com/api/bloglinks.php';
const BLOG_LINKS_API = 'https://hspropertyae.adiie9.com/api/blogs/org/1/list';
//const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
const EXPIRATION_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds --- TESTING PURPOSES ONLY, PLEASE REVERT TO 1 HOUR OR MORE IN PRODUCTION

/**
 * Fetch blog links from the API and save them to a local file.
 */
async function fetchAndSaveBlogLinks() {
  try {
    const response = await axios.get(BLOG_LINKS_API);
    const blogLinks = response.data;

    // Save the data to the local file
    fs.writeFileSync(BLOG_LINKS_FILE, JSON.stringify(blogLinks, null, 2), 'utf-8');

    return blogLinks;
  } catch (error) {
    console.error('Error fetching blog links:', error);

    // Fail-safe: Load the local file if fetching live data fails
    if (fs.existsSync(BLOG_LINKS_FILE)) {
      console.warn('Loading blog links from local file due to fetch error.');
      const cachedData = fs.readFileSync(BLOG_LINKS_FILE, 'utf-8');
      return JSON.parse(cachedData);
    }

    return null;
  }
}

/**
 * Get blog links from the local file or fetch from the API if the file is expired.
 */
export async function getBlogLinks() {
  try {
    // Check if the file exists
    if (fs.existsSync(BLOG_LINKS_FILE)) {
      const stats = fs.statSync(BLOG_LINKS_FILE);
      const lastModified = new Date(stats.mtime).getTime();
      const now = Date.now();

      // Check if the file is expired
      if (now - lastModified < EXPIRATION_TIME) {
        // Read and return the cached data
        const cachedData = fs.readFileSync(BLOG_LINKS_FILE, 'utf-8');
        return JSON.parse(cachedData);
      }
    }

    // If the file doesn't exist or is expired, fetch new data
    return await fetchAndSaveBlogLinks();
  } catch (error) {
    console.error('Error getting blog links:', error);
    return null;
  }
}
