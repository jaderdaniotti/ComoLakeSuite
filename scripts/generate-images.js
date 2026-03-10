/**
 * Script che scandisce le cartelle in src/images (volta, cavour, cernobbio, dante, duomo)
 * e genera src/images.js con import statici per ogni immagine, divisi per suite.
 *
 * Uso: node scripts/generate-images.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "src", "images");

const SUITE_FOLDERS = [
  { folder: "volta", key: "Volta" },
  { folder: "cavour", key: "Cavour" },
  { folder: "cernobbio", key: "Cernobbio" },
  { folder: "comosole", key: "ComoSole" },
  { folder: "dante", key: "Dante" },
  { folder: "duomo", key: "VistaDuomo" },
];

// Suite presenti nel sito: se una cartella non esiste o è vuota, viene usato placeholder URL
const PLACEHOLDER_URL = "https://www.comolakesuites.com/wp-content/uploads/placeholder-suite.jpg";

const EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];

function getImageFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext)))
    .sort();
}

function safeVarName(base, index) {
  return `${base}_${index}`;
}

const lines = [];

// Import logo
lines.push('import logobianco from "./images/logobianco.png";');
lines.push("");

const suiteData = {};
const allImports = [];

for (const { folder, key } of SUITE_FOLDERS) {
  const dir = path.join(IMAGES_DIR, folder);
  const files = getImageFiles(dir);
  const baseVar = folder.toLowerCase().replace(/[^a-z0-9]/g, "");

  const vars = [];
  files.forEach((file, i) => {
    const varName = safeVarName(baseVar, i);
    const relPath = `./images/${folder}/${file}`;
    allImports.push({ varName, relPath });
    vars.push(varName);
  });

  suiteData[key] = {
    folder,
    vars,
    first: vars.length > 0 ? vars[0] : null,
  };
}

// Scrivi tutti gli import (dopo il logo)
for (const { varName, relPath } of allImports) {
  lines.push(`import ${varName} from "${relPath}";`);
}
lines.push("");

// Oggetto export
lines.push("/**");
lines.push(" * Immagini per suite, generate da scripts/generate-images.js");
lines.push(" * Hero = prima immagine, Gallery = tutte in ordine, Thumb = prima immagine.");
lines.push(" */");
lines.push("const images = {");
lines.push("  logobianco,");
lines.push("");

// Home (placeholder se non hai ancora le immagini)
lines.push("  // Home – sostituire quando hai le immagini in public/images/");
lines.push('  heroHome: "https://www.comolakesuites.com/wp-content/uploads/hero-home.jpg",');
lines.push('  esperienzaVideo: "https://www.comolakesuites.com/wp-content/uploads/esperienza-video.jpg",');
lines.push("");

for (const { key } of SUITE_FOLDERS) {
  const data = suiteData[key];
  const heroKey = `suite${key}Hero`;
  const galleryKey = `suite${key}Gallery`;
  const thumbKey = key === "VistaDuomo" ? "thumbVistaDuomo" : `thumb${key}`;

  lines.push(`  // Suite ${key}`);
  if (data && data.vars.length > 0) {
    const { vars, first } = data;
    lines.push(`  ${heroKey}: ${first},`);
    lines.push(`  ${galleryKey}: [${vars.join(", ")}],`);
    lines.push(`  ${thumbKey}: ${first},`);
  } else {
    lines.push(`  ${heroKey}: "${PLACEHOLDER_URL}",`);
    lines.push(`  ${galleryKey}: ["${PLACEHOLDER_URL}"],`);
    lines.push(`  ${thumbKey}: "${PLACEHOLDER_URL}",`);
  }
  lines.push("");
}

lines.push("  // Servizi (placeholder – aggiungere in public/images/ se necessario)");
lines.push('  serviziParcheggio: "https://www.comolakesuites.com/wp-content/uploads/servizi-parcheggio.jpg",');
lines.push('  serviziWifi: "https://www.comolakesuites.com/wp-content/uploads/servizi-wifi.jpg",');
lines.push('  serviziTerrazza: "https://www.comolakesuites.com/wp-content/uploads/servizi-terrazza.jpg",');
lines.push('  serviziPulizie: "https://www.comolakesuites.com/wp-content/uploads/servizi-pulizie.jpg",');
lines.push('  serviziColazione: "https://www.comolakesuites.com/wp-content/uploads/servizi-colazione.jpg",');
lines.push('  serviziCucina: "https://www.comolakesuites.com/wp-content/uploads/servizi-cucina.jpg",');
lines.push('  serviziBiancheria: "https://www.comolakesuites.com/wp-content/uploads/servizi-biancheria.jpg",');
lines.push('  serviziClima: "https://www.comolakesuites.com/wp-content/uploads/servizi-clima.jpg",');
lines.push("};");
lines.push("");
lines.push("export default images;");

const outPath = path.join(ROOT, "src", "images.js");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log(`Scritto ${outPath} con ${allImports.length} immagini.`);
SUITE_FOLDERS.forEach(({ folder, key }) => {
  const count = suiteData[key].vars.length;
  console.log(`  - ${folder}: ${count} immagini`);
});
