/**
 * Purpose: bump the shared package patch version in the files a merge to dev must update.
 * Used by: .github/workflows/bump-version.yml
 */

import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export function bumpPatch(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new Error(`Cannot bump version ${version}.`);
  }
  return `${match[1]}.${match[2]}.${Number(match[3]) + 1}`;
}

export function replaceVersionField(source, version) {
  const pattern = /"version": "\d+\.\d+\.\d+"/;
  if (!pattern.test(source)) {
    throw new Error("Could not find a version field.");
  }
  return source.replace(pattern, `"version": "${version}"`);
}

export function replaceReadmeVersion(markdown, version) {
  const pattern = /The package version is \[\d+\.\d+\.\d+\]/;
  if (!pattern.test(markdown)) {
    throw new Error("Could not find the package version in the README.");
  }
  return markdown.replace(pattern, `The package version is [${version}]`);
}

export function replaceLockVersion(lock, version) {
  const marker = '"packages/ui": {\n      "name": "@shared-ui/react",\n      "version": "';
  const at = lock.indexOf(marker);
  if (at < 0) {
    throw new Error("Could not find @shared-ui/react in the lockfile.");
  }
  const valueStart = at + marker.length;
  const valueEnd = lock.indexOf('"', valueStart);
  return `${lock.slice(0, valueStart)}${version}${lock.slice(valueEnd)}`;
}

export function bumpFiles({ packageJson, readme, lock }) {
  const version = bumpPatch(JSON.parse(packageJson).version);
  return {
    version,
    packageJson: replaceVersionField(packageJson, version),
    readme: replaceReadmeVersion(readme, version),
    lock: replaceLockVersion(lock, version),
  };
}

function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const packagePath = resolve(root, "packages/ui/package.json");
  const readmePath = resolve(root, "README.md");
  const lockPath = resolve(root, "package-lock.json");
  const next = bumpFiles({
    packageJson: readFileSync(packagePath, "utf8"),
    readme: readFileSync(readmePath, "utf8"),
    lock: readFileSync(lockPath, "utf8"),
  });
  writeFileSync(packagePath, next.packageJson);
  writeFileSync(readmePath, next.readme);
  writeFileSync(lockPath, next.lock);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `version=${next.version}\n`);
  }
  console.log(next.version);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
