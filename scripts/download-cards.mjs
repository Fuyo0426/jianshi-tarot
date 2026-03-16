import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const OUT_DIR = './public/cards/rider-waite';
const DELAY_MS = 800;

const CARD_MAP = [
  // Major Arcana — using Wikimedia Commons direct file download API
  { file: 'major-00.jpg', wiki: 'RWS_Tarot_00_Fool.jpg' },
  { file: 'major-01.jpg', wiki: 'RWS_Tarot_01_Magician.jpg' },
  { file: 'major-02.jpg', wiki: 'RWS_Tarot_02_High_Priestess.jpg' },
  { file: 'major-03.jpg', wiki: 'RWS_Tarot_03_Empress.jpg' },
  { file: 'major-04.jpg', wiki: 'RWS_Tarot_04_Emperor.jpg' },
  { file: 'major-05.jpg', wiki: 'RWS_Tarot_05_Hierophant.jpg' },
  { file: 'major-06.jpg', wiki: 'RWS_Tarot_06_Lovers.jpg' },
  { file: 'major-07.jpg', wiki: 'RWS_Tarot_07_Chariot.jpg' },
  { file: 'major-08.jpg', wiki: 'RWS_Tarot_08_Strength.jpg' },
  { file: 'major-09.jpg', wiki: 'RWS_Tarot_09_Hermit.jpg' },
  { file: 'major-10.jpg', wiki: 'RWS_Tarot_10_Wheel_of_Fortune.jpg' },
  { file: 'major-11.jpg', wiki: 'RWS_Tarot_11_Justice.jpg' },
  { file: 'major-12.jpg', wiki: 'RWS_Tarot_12_Hanged_Man.jpg' },
  { file: 'major-13.jpg', wiki: 'RWS_Tarot_13_Death.jpg' },
  { file: 'major-14.jpg', wiki: 'RWS_Tarot_14_Temperance.jpg' },
  { file: 'major-15.jpg', wiki: 'RWS_Tarot_15_Devil.jpg' },
  { file: 'major-16.jpg', wiki: 'RWS_Tarot_16_Tower.jpg' },
  { file: 'major-17.jpg', wiki: 'RWS_Tarot_17_Star.jpg' },
  { file: 'major-18.jpg', wiki: 'RWS_Tarot_18_Moon.jpg' },
  { file: 'major-19.jpg', wiki: 'RWS_Tarot_19_Sun.jpg' },
  { file: 'major-20.jpg', wiki: 'RWS_Tarot_20_Judgement.jpg' },
  { file: 'major-21.jpg', wiki: 'RWS_Tarot_21_World.jpg' },
  // Minor Arcana — Wands
  { file: 'wands-1.jpg',  wiki: 'Wands01.jpg' },
  { file: 'wands-2.jpg',  wiki: 'Wands02.jpg' },
  { file: 'wands-3.jpg',  wiki: 'Wands03.jpg' },
  { file: 'wands-4.jpg',  wiki: 'Wands04.jpg' },
  { file: 'wands-5.jpg',  wiki: 'Wands05.jpg' },
  { file: 'wands-6.jpg',  wiki: 'Wands06.jpg' },
  { file: 'wands-7.jpg',  wiki: 'Wands07.jpg' },
  { file: 'wands-8.jpg',  wiki: 'Wands08.jpg' },
  { file: 'wands-9.jpg',  wiki: 'Wands09.jpg' },
  { file: 'wands-10.jpg', wiki: 'Wands10.jpg' },
  { file: 'wands-11.jpg', wiki: 'Wands11.jpg' },
  { file: 'wands-12.jpg', wiki: 'Wands12.jpg' },
  { file: 'wands-13.jpg', wiki: 'Wands13.jpg' },
  { file: 'wands-14.jpg', wiki: 'Wands14.jpg' },
  // Cups
  { file: 'cups-1.jpg',   wiki: 'Cups01.jpg' },
  { file: 'cups-2.jpg',   wiki: 'Cups02.jpg' },
  { file: 'cups-3.jpg',   wiki: 'Cups03.jpg' },
  { file: 'cups-4.jpg',   wiki: 'Cups04.jpg' },
  { file: 'cups-5.jpg',   wiki: 'Cups05.jpg' },
  { file: 'cups-6.jpg',   wiki: 'Cups06.jpg' },
  { file: 'cups-7.jpg',   wiki: 'Cups07.jpg' },
  { file: 'cups-8.jpg',   wiki: 'Cups08.jpg' },
  { file: 'cups-9.jpg',   wiki: 'Cups09.jpg' },
  { file: 'cups-10.jpg',  wiki: 'Cups10.jpg' },
  { file: 'cups-11.jpg',  wiki: 'Cups11.jpg' },
  { file: 'cups-12.jpg',  wiki: 'Cups12.jpg' },
  { file: 'cups-13.jpg',  wiki: 'Cups13.jpg' },
  { file: 'cups-14.jpg',  wiki: 'Cups14.jpg' },
  // Swords
  { file: 'swords-1.jpg',  wiki: 'Swords01.jpg' },
  { file: 'swords-2.jpg',  wiki: 'Swords02.jpg' },
  { file: 'swords-3.jpg',  wiki: 'Swords03.jpg' },
  { file: 'swords-4.jpg',  wiki: 'Swords04.jpg' },
  { file: 'swords-5.jpg',  wiki: 'Swords05.jpg' },
  { file: 'swords-6.jpg',  wiki: 'Swords06.jpg' },
  { file: 'swords-7.jpg',  wiki: 'Swords07.jpg' },
  { file: 'swords-8.jpg',  wiki: 'Swords08.jpg' },
  { file: 'swords-9.jpg',  wiki: 'Swords09.jpg' },
  { file: 'swords-10.jpg', wiki: 'Swords10.jpg' },
  { file: 'swords-11.jpg', wiki: 'Swords11.jpg' },
  { file: 'swords-12.jpg', wiki: 'Swords12.jpg' },
  { file: 'swords-13.jpg', wiki: 'Swords13.jpg' },
  { file: 'swords-14.jpg', wiki: 'Swords14.jpg' },
  // Pentacles
  { file: 'pentacles-1.jpg',  wiki: 'Pents01.jpg' },
  { file: 'pentacles-2.jpg',  wiki: 'Pents02.jpg' },
  { file: 'pentacles-3.jpg',  wiki: 'Pents03.jpg' },
  { file: 'pentacles-4.jpg',  wiki: 'Pents04.jpg' },
  { file: 'pentacles-5.jpg',  wiki: 'Pents05.jpg' },
  { file: 'pentacles-6.jpg',  wiki: 'Pents06.jpg' },
  { file: 'pentacles-7.jpg',  wiki: 'Pents07.jpg' },
  { file: 'pentacles-8.jpg',  wiki: 'Pents08.jpg' },
  { file: 'pentacles-9.jpg',  wiki: 'Pents09.jpg' },
  { file: 'pentacles-10.jpg', wiki: 'Pents10.jpg' },
  { file: 'pentacles-11.jpg', wiki: 'Pents11.jpg' },
  { file: 'pentacles-12.jpg', wiki: 'Pents12.jpg' },
  { file: 'pentacles-13.jpg', wiki: 'Pents13.jpg' },
  { file: 'pentacles-14.jpg', wiki: 'Pents14.jpg' },
];

const HEADERS = {
  'User-Agent': 'TarotEducationProject/1.0 (monkeyjack8204@gmail.com; Educational tarot website using public domain RWS images)',
  'Accept': 'image/jpeg,image/*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://jianshi-tarot.vercel.app',
};

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function downloadOne(entry, index) {
  const outPath = join(OUT_DIR, entry.file);
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${entry.wiki}?width=320`;

  try {
    const res = await fetch(url, { headers: HEADERS, redirect: 'follow' });
    if (!res.ok) {
      console.log(`[${index+1}/78] FAIL ${entry.file} — HTTP ${res.status}`);
      return false;
    }
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);

    // Check JPEG magic bytes (FF D8)
    if (bytes[0] !== 0xFF || bytes[1] !== 0xD8) {
      console.log(`[${index+1}/78] NOT JPEG ${entry.file} (${bytes.length}b) — first bytes: ${bytes[0].toString(16)} ${bytes[1].toString(16)}`);
      return false;
    }

    await writeFile(outPath, bytes);
    console.log(`[${index+1}/78] OK ${entry.file} — ${bytes.length} bytes`);
    return true;
  } catch (e) {
    console.log(`[${index+1}/78] ERROR ${entry.file} — ${e.message}`);
    return false;
  }
}

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  let success = 0, failed = [];

  for (let i = 0; i < CARD_MAP.length; i++) {
    const ok = await downloadOne(CARD_MAP[i], i);
    if (ok) success++;
    else failed.push(CARD_MAP[i].file);
    if (i < CARD_MAP.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\nDone: ${success}/78 success`);
  if (failed.length) console.log('Failed:', failed.join(', '));
}

main();
