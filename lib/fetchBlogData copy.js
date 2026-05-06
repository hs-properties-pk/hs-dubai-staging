"use server";

import fs from 'fs';
import path from 'path';
import axios from 'axios';

const BLOG_DATA_FILE = path.join(process.env.NODE_ENV === 'production' ? '/vercel/path0/.next/server' : process.cwd(), 'data', 'blogData.json');
const BLOG_DATA_API = 'https://hspropertyae.adiie9.com/api/blogs/org/1/full';
//const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
const EXPIRATION_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds --- TESTING PURPOSES ONLY, PLEASE REVERT TO 1 HOUR OR MORE IN PRODUCTION

// In-memory cache
let inMemoryCache = null;
let cacheTimestamp = null;

/**
 * Fetch blog data from the API and save them to a local file.
 */
async function fetchAndSaveBlogData() {
  try {
    const response = await axios.get(BLOG_DATA_API);
    const blogData = response.data;

    console.log('API response data:', blogData);

    // Save the data to the local file
    fs.writeFileSync(BLOG_DATA_FILE, JSON.stringify(blogData, null, 2), 'utf-8');

    // Update in-memory cache
    inMemoryCache = blogData;
    cacheTimestamp = Date.now();

    return blogData;
  } catch (error) {
    console.error('Error fetching blog data:', error);

    // Fail-safe: Load the local file if fetching live data fails
    if (fs.existsSync(BLOG_DATA_FILE)) {
      console.warn('Loading blog data from local file due to fetch error.');
      const cachedData = fs.readFileSync(BLOG_DATA_FILE, 'utf-8');
      const parsedData = JSON.parse(cachedData);

      // Update in-memory cache
      inMemoryCache = parsedData;
      cacheTimestamp = Date.now();

      return parsedData;
    }

    return null;
  }
}

/**
 * Get blog data from the in-memory cache, local file, or fetch from the API if needed.
 */
export async function getBlogData() {
  try {
    const now = Date.now();

    // Check in-memory cache first
    if (inMemoryCache && cacheTimestamp && now - cacheTimestamp < EXPIRATION_TIME) {
      console.time('Read from in-memory cache');
      console.timeEnd('Read from in-memory cache');
      return inMemoryCache;
    }

    // Check if the file exists
    if (fs.existsSync(BLOG_DATA_FILE)) {
      const stats = fs.statSync(BLOG_DATA_FILE);
      const lastModified = new Date(stats.mtime).getTime();

      // Check if the file is expired
      if (now - lastModified < EXPIRATION_TIME) {
        console.time('Read and parse local file');
        const cachedData = fs.readFileSync(BLOG_DATA_FILE, 'utf-8');
        const parsedData = JSON.parse(cachedData);
        console.timeEnd('Read and parse local file');

        // Update in-memory cache
        inMemoryCache = parsedData;
        cacheTimestamp = now;

        return parsedData;
      }
    }

    // If the file doesn't exist or is expired, fetch new data
    return await fetchAndSaveBlogData();
  } catch (error) {
    console.error('Error getting blog data:', error);
    return null;
  }
}
