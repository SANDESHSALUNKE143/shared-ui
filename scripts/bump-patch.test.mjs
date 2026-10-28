import assert from "node:assert/strict";
import test from "node:test";

import { bumpFiles, bumpPatch } from "./bump-patch.mjs";

test("bumps the patch and writes it into the package, the readme, and the lockfile", () => {
  const packageJson = '{\n  "name": "@shared-ui/react",\n  "version": "0.2.9"\n}\n';
  const readme = "The package version is [0.2.9](packages/ui/package.json).\nA fix is a patch (`0.2.1`).\n";
  const lock = '{\n    "packages/ui": {\n      "name": "@shared-ui/react",\n      "version": "0.2.9",\n      "license": "MIT"\n    }\n}\n';
  const next = bumpFiles({ packageJson, readme, lock });
  assert.equal(next.version, "0.2.10");
  assert.equal(bumpPatch("1.0.0"), "1.0.1");
  assert.match(next.packageJson, /"version": "0.2.10"/);
  assert.match(next.readme, /The package version is \[0.2.10\]/);
  assert.match(next.readme, /patch \(`0.2.1`\)/);
  assert.match(next.lock, /"version": "0.2.10"/);
});
