import { mkdir, readFile, writeFile } from "node:fs/promises";
const source = new URL("../src/lib/data.ts", import.meta.url);
const images = new URL("../public/images/", import.meta.url);
await mkdir(images, { recursive: true });
let data = await readFile(source, "utf8");
const matches = [
  ...data.matchAll(/(\w+): '(https:\/\/images\.unsplash\.com[^']+)'/g),
];
const files = await Promise.all(
  matches.map(async ([, name, url]) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${name}: ${response.status}`);
    await writeFile(
      new URL(`${name}.jpg`, images),
      Buffer.from(await response.arrayBuffer()),
    );
    return { url, path: `/images/${name}.jpg` };
  }),
);
for (const file of files) data = data.replace(file.url, file.path);
await writeFile(source, data);
console.log(`Downloaded ${files.length} photographs for local serving.`);
