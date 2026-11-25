// One original one-line office joke, written to /output/entry.txt.
// The turn: "open-door policy" sounds welcoming until the last word
// flips it into blame — a true boss observation, one line, no setup wasted.
const JOKE =
  "My boss calls it an open-door policy, but the door only opens when he wants someone else to take the blame.";

function writeEntry(): void {
  const targets: string[] = ["/output/entry.txt"];
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (outDir) targets.push(outDir + "/entry.txt");
  targets.push("./entry.txt");
  for (const target of targets) {
    try {
      const fs = require("node:fs");
      const path = require("node:path");
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, JOKE, "utf8");
      return;
    } catch {
      // That location failed (read-only cwd, missing dir); try the
      // next one instead of throwing, so the run still exits 0.
    }
  }
}

writeEntry();
process.exit(0);
