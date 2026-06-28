/**
 * Downloads the original invitation's images + video into /public/assets.
 * Run with:  npm run fetch-assets
 *
 * Requires Node 18+ (built-in fetch). Safe to re-run; it overwrites files.
 * If the original host ever goes away, just drop your own files into
 * /public/assets using the same names listed below.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://Nayan-Natasha.invitationmedia.in";

// originalUrlPath  ->  local filename (matches paths in site.config.ts)
const ASSETS = {
  "/assets/hero-bg-BoJZa16A.webp": "hero-bg.webp",
  "/assets/monogram-DluBM9hV.webp": "monogram.webp",
  "/assets/families-bg-Bdmrjm8V.webp": "families-bg.webp",
  "/assets/Storyboard-9-BPOwQluv.webp": "story-bg.webp",
  "/assets/Storyboard-1-ROZeRR6g.webp": "story-1.webp",
  "/assets/Storyboard-2-vMt0D-Xn.webp": "story-2.webp",
  "/assets/Storyboard-3-CU__j4NP.webp": "story-3.webp",
  "/assets/Storyboard-4-C9jvakjK.webp": "story-4.webp",
  "/assets/Storyboard-5-CozcjNj1.webp": "story-5.webp",
  "/assets/Storyboard-6-Dn8BwMkO.webp": "story-6.webp",
  "/assets/Storyboard-7-BlXAwcZq.webp": "story-7.webp",
  "/assets/schedule-bg-CrjkodkA.webp": "schedule-bg.webp",
  "/assets/schedule-card-1-DVLF0AQy.webp": "schedule-card-1.webp",
  "/assets/wedding-bg-C8jmWq-L.webp": "wedding-bg.webp",
  "/assets/wedding-content-DwkeZBGv.webp": "wedding-content.webp",
  "/assets/reception-bg-Bhu2sMue.webp": "reception-bg.webp",
  "/assets/reception-content-BM7GeP99.webp": "reception-content.webp",
  "/assets/rsvp-bg-I-N3en4m.webp": "rsvp-bg.webp",
  "/assets/rsvp-shape-z1pcPNfJ.webp": "rsvp-shape.webp",
  "/__l5e/assets-v1/585f15cb-9422-47bd-a097-b70856de55b9/envelope-intro.mp4":
    "envelope-intro.mp4",
};

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e0c87552-bce0-4d01-bb29-bc1703e9ee87/id-preview-e38da3a9--5ca5f9b4-9726-41ad-b4e6-7ad10a9ec8c6.lovable.app-1780287839171.png";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "assets");

async function download(url, filename) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 wedding-asset-fetcher" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(OUT_DIR, filename), buf);
  console.log(`  ✓ ${filename}  (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Downloading assets into ${OUT_DIR}\n`);

  const jobs = Object.entries(ASSETS).map(([path, name]) =>
    download(ORIGIN + path, name).catch((e) =>
      console.warn(`  ✗ ${name}: ${e.message}`)
    )
  );
  jobs.push(
    download(OG_IMAGE, "og-image.png").catch((e) =>
      console.warn(`  ✗ og-image.png: ${e.message}`)
    )
  );

  await Promise.all(jobs);
  console.log("\nDone. Review anything marked ✗ and re-run if needed.");
}

main();
