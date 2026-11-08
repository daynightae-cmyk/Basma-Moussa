/**
 * Generates size derivatives and social preview crops from the approved
 * artwork already in public/brand and public/media.
 *
 * The approved master logo (public/brand/basma-logo-master.png) is never
 * regenerated or redrawn — only resized for icons and social cards.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const brandDir = path.join(root, "public", "brand");
const mediaDir = path.join(root, "public", "media");

const NAVY = { r: 7, g: 11, b: 24, alpha: 1 };

async function icons() {
  const source = path.join(brandDir, "basma-icon-circle.png");
  await sharp(source).resize(32, 32).png().toFile(path.join(brandDir, "favicon-32.png"));
  await sharp(source).resize(180, 180).png().toFile(path.join(brandDir, "apple-touch-icon.png"));
  await sharp(source).resize(192, 192).png().toFile(path.join(brandDir, "icon-192.png"));
  console.log("icons: favicon-32, apple-touch-icon, icon-192");
}

async function landscapeOg(name, fileName) {
  const input = path.join(mediaDir, fileName);
  await sharp(input)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(brandDir, `${name}.jpg`));
  console.log(`og: ${name}.jpg <- ${fileName}`);
}

async function portraitOg(name, fileName) {
  const input = path.join(mediaDir, fileName);
  const background = await sharp(input)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .blur(38)
    .modulate({ brightness: 0.55 })
    .toBuffer();

  const foreground = await sharp(input)
    .resize({ height: 630, fit: "cover" })
    .toBuffer();

  const fgMeta = await sharp(foreground).metadata();
  const fgWidth = fgMeta.width ?? 472;

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: NAVY,
    },
  })
    .composite([
      { input: background, top: 0, left: 0 },
      { input: foreground, top: 0, left: Math.round((1200 - fgWidth) / 2) },
      {
        input: Buffer.from(
          `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#070B18" stop-opacity="0.15"/>
                <stop offset="0.6" stop-color="#070B18" stop-opacity="0.05"/>
                <stop offset="1" stop-color="#070B18" stop-opacity="0.65"/>
              </linearGradient>
            </defs>
            <rect width="1200" height="630" fill="url(#shade)"/>
            <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#D7AB62" stroke-opacity="0.22" stroke-width="2"/>
          </svg>`,
        ),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(brandDir, `${name}.jpg`));
  console.log(`og: ${name}.jpg <- composed from ${fileName}`);
}

async function main() {
  await mkdir(brandDir, { recursive: true });
  await icons();
  await landscapeOg("og-home", "01-home-hero.webp");
  await landscapeOg("og-media", "03-media-universe.webp");
  await landscapeOg("og-legal", "06-legal-lens.webp");
  await landscapeOg("og-soundroom", "08-voice-identity.webp");
  await landscapeOg("og-stories", "11-documentary-archive.webp");
  await landscapeOg("og-beyond", "04-interview-studio.webp");
  await portraitOg("og-about", "02-about-portrait.webp");
  await portraitOg("og-city", "07-city-voices.webp");
  await portraitOg("og-contact", "10-contact-collaboration.webp");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
