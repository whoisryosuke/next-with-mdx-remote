import fs, { readdirSync } from "fs";
import path from "path";

function getFiles(dir) {
  const dirents = readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), "posts");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = getFiles(POSTS_PATH)
  // .forEach((path) => console.log("mdx path", path))
  // Only include md(x) files
  .map((filePath) => filePath.replace(POSTS_PATH, ""))
  .map((filePath) => filePath.replace(path.sep, "/"))
  .map((filePath) => filePath.replace(path.sep, "/").substr(1))
  .map((filePath) => {
    // console.log(filePath);
    return filePath;
  })
  .filter((path) => /\.mdx?$/.test(path));
