/**
 * Khmer Fonts System & Local System Font Scanner
 * Integrates Google Fonts, Native Windows Khmer Fonts, and IndexedDB Custom Font Store
 */

const GOOGLE_KHMER_FONTS = [
  { id: 'Moul', name: 'អក្សរមូល (Khmer Moul)', family: "'Moul', cursive", category: 'title', googleFont: 'Moul' },
  { id: 'Moulpali', name: 'មូលបាលី (Khmer Moulpali)', family: "'Moulpali', cursive", category: 'title', googleFont: 'Moulpali' },
  { id: 'Koulen', name: 'គូលេន (Khmer Koulen)', family: "'Koulen', cursive", category: 'title', googleFont: 'Koulen' },
  { id: 'Angkor', name: 'អង្គរ (Khmer Angkor)', family: "'Angkor', cursive", category: 'title', googleFont: 'Angkor' },
  { id: 'Bayon', name: 'បាយ័ន (Khmer Bayon)', family: "'Bayon', cursive", category: 'decorative', googleFont: 'Bayon' },
  { id: 'Preahvihear', name: 'ព្រះវិហារ (Khmer Preahvihear)', family: "'Preahvihear', cursive", category: 'title', googleFont: 'Preahvihear' },
  { id: 'Battambang', name: 'បាត់ដំបង (Khmer Battambang)', family: "'Battambang', sans-serif", category: 'body', googleFont: 'Battambang:wght@400;700;900' },
  { id: 'Siemreap', name: 'សៀមរាប (Khmer Siemreap)', family: "'Siemreap', sans-serif", category: 'body', googleFont: 'Siemreap' },
  { id: 'Kantumruy Pro', name: 'កណ្ដុំរុយ ប្រូ (Kantumruy Pro)', family: "'Kantumruy Pro', sans-serif", category: 'modern', googleFont: 'Kantumruy+Pro:wght@400;600;700' },
  { id: 'Kdam Thmor Pro', name: 'ក្ដាមថ្ម ប្រូ (Kdam Thmor Pro)', family: "'Kdam Thmor Pro', sans-serif", category: 'modern', googleFont: 'Kdam+Thmor+Pro' },
  { id: 'Dangrek', name: 'ដងរែក (Khmer Dangrek)', family: "'Dangrek', cursive", category: 'decorative', googleFont: 'Dangrek' },
  { id: 'Bokor', name: 'បូកគោ (Khmer Bokor)', family: "'Bokor', cursive", category: 'decorative', googleFont: 'Bokor' },
  { id: 'Chenla', name: 'ចេនឡា (Khmer Chenla)', family: "'Chenla', cursive", category: 'title', googleFont: 'Chenla' },
  { id: 'Fasthand', name: 'ដៃលឿន (Khmer Fasthand)', family: "'Fasthand', cursive", category: 'handwriting', googleFont: 'Fasthand' },
  { id: 'Freehand', name: 'ដៃសេរី (Khmer Freehand)', family: "'Freehand', cursive", category: 'handwriting', googleFont: 'Freehand' },
  { id: 'Hanuman', name: 'ហនុមាន (Khmer Hanuman)', family: "'Hanuman', serif", category: 'serif', googleFont: 'Hanuman:wght@400;700;900' },
  { id: 'Nokora', name: 'នគរ (Khmer Nokora)', family: "'Nokora', serif", category: 'serif', googleFont: 'Nokora:wght@400;700' },
  { id: 'Odor Mean Chey', name: 'ឧត្តរមានជ័យ (Odor Mean Chey)', family: "'Odor Mean Chey', cursive", category: 'decorative', googleFont: 'Odor+Mean+Chey' },
  { id: 'Taprom', name: 'តាព្រហ្ម (Khmer Taprom)', family: "'Taprom', cursive", category: 'decorative', googleFont: 'Taprom' },
  { id: 'Suwannaphum', name: 'សុវណ្ណភូមិ (Suwannaphum)', family: "'Suwannaphum', serif", category: 'serif', googleFont: 'Suwannaphum:wght@400;700' }
];

const WINDOWS_KHMER_FONTS = [
  { id: 'Khmer OS Muol Light', baseName: 'Khmer OS Muol Light', name: '💻 Khmer OS Muol Light (អក្សរមូលស្រាល)', family: "'Khmer OS Muol Light', 'Moul', cursive", isSystem: true, category: 'title' },
  { id: 'Khmer OS Muol', baseName: 'Khmer OS Muol', name: '💻 Khmer OS Muol (អក្សរមូលដិត)', family: "'Khmer OS Muol', 'Moul', cursive", isSystem: true, category: 'title' },
  { id: 'Khmer OS Muol Pali', baseName: 'Khmer OS Muol Pali', name: '💻 Khmer OS Muol Pali (មូលបាលី)', family: "'Khmer OS Muol Pali', 'Moulpali', cursive", isSystem: true, category: 'title' },
  { id: 'Khmer OS Battambang', baseName: 'Khmer OS Battambang', name: '💻 Khmer OS Battambang (បាត់ដំបង)', family: "'Khmer OS Battambang', 'Battambang', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer OS Bokor', baseName: 'Khmer OS Bokor', name: '💻 Khmer OS Bokor (បូកគោ)', family: "'Khmer OS Bokor', 'Bokor', cursive", isSystem: true, category: 'decorative' },
  { id: 'Khmer OS Content', baseName: 'Khmer OS Content', name: '💻 Khmer OS Content (អត្ថបទ)', family: "'Khmer OS Content', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer OS Fasthand', baseName: 'Khmer OS Fasthand', name: '💻 Khmer OS Fasthand (ដៃលឿន)', family: "'Khmer OS Fasthand', cursive", isSystem: true, category: 'handwriting' },
  { id: 'Khmer OS Freehand', baseName: 'Khmer OS Freehand', name: '💻 Khmer OS Freehand (ដៃសេរី)', family: "'Khmer OS Freehand', cursive", isSystem: true, category: 'handwriting' },
  { id: 'Khmer OS Metal Chrieng', baseName: 'Khmer OS Metal Chrieng', name: '💻 Khmer OS Metal Chrieng (ឆ្លាក់ជ្រៀង)', family: "'Khmer OS Metal Chrieng', cursive", isSystem: true, category: 'decorative' },
  { id: 'Khmer OS Siemreap', baseName: 'Khmer OS Siemreap', name: '💻 Khmer OS Siemreap (សៀមរាប)', family: "'Khmer OS Siemreap', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer OS System', baseName: 'Khmer OS System', name: '💻 Khmer OS System (ប្រព័ន្ធ)', family: "'Khmer OS System', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer OS', baseName: 'Khmer OS', name: '💻 Khmer OS', family: "'Khmer OS', sans-serif", isSystem: true, category: 'body' },
  { id: 'Khmer UI', baseName: 'Khmer UI', name: '💻 Khmer UI (Windows UI)', family: "'Khmer UI', 'Leelawadee UI', sans-serif", isSystem: true, category: 'modern' },
  { id: 'Khmer UI Bold', baseName: 'Khmer UI Bold', name: '💻 Khmer UI Bold (Windows ដិត)', family: "'Khmer UI Bold', 'Khmer UI', sans-serif", isSystem: true, category: 'modern' },
  { id: 'DaunPenh', baseName: 'DaunPenh', name: '💻 DaunPenh (ដូនពេញ)', family: "'DaunPenh', cursive", isSystem: true, category: 'title' },
  { id: 'Leelawadee UI', baseName: 'Leelawadee UI', name: '💻 Leelawadee UI', family: "'Leelawadee UI', sans-serif", isSystem: true, category: 'modern' }
];

const USER_CUSTOM_FONTS = [];
const SCANNED_PC_FONTS = [];

// IndexedDB Helper for persistent font uploads
const FontStorageDB = {
  dbName: 'KhmerBookCoverStudioFontsDB',
  storeName: 'fonts',
  version: 1,

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async saveFont(fontObj) {
    try {
      const db = await this.openDB();
      const tx = db.transaction(this.storeName, 'readwrite');
      tx.objectStore(this.storeName).put(fontObj);
      return new Promise(res => tx.oncomplete = res);
    } catch (e) {
      console.warn('Could not save font to IndexedDB', e);
    }
  },

  async getAllFonts() {
    try {
      const db = await this.openDB();
      const tx = db.transaction(this.storeName, 'readonly');
      const req = tx.objectStore(this.storeName).getAll();
      return new Promise(res => req.onsuccess = () => res(req.result || []));
    } catch (e) {
      console.warn('Could not load fonts from IndexedDB', e);
      return [];
    }
  },

  async deleteFont(id) {
    try {
      const db = await this.openDB();
      const tx = db.transaction(this.storeName, 'readwrite');
      tx.objectStore(this.storeName).delete(id);
      return new Promise(res => tx.oncomplete = res);
    } catch (e) {
      console.warn('Could not delete font from IndexedDB', e);
    }
  }
};

const FontManager = {
  async init() {
    // 1. Inject Google Fonts stylesheet asynchronously
    this.loadGoogleFonts();

    // 2. Load stored user fonts from IndexedDB
    try {
      const saved = await FontStorageDB.getAllFonts();
      for (const item of saved) {
        try {
          const fontFace = new FontFace(item.familyClean, item.buffer);
          await fontFace.load();
          document.fonts.add(fontFace);
          USER_CUSTOM_FONTS.push(item);
        } catch (err) {
          console.warn('Failed restoring font:', item.name, err);
        }
      }
    } catch (e) {
      console.warn('IndexedDB font restore error:', e);
    }
  },

  loadGoogleFonts() {
    const families = GOOGLE_KHMER_FONTS.map(f => f.googleFont).filter(Boolean);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${families.join('&family=')}&display=swap`;
    document.head.appendChild(link);
  },

  async registerFontFile(file) {
    const baseName = file.name.replace(/\.[^/.]+$/, '').trim();
    const familyClean = 'Custom_' + baseName.replace(/[^a-zA-Z0-9_]/g, '_') + '_' + Date.now();
    const buffer = await file.arrayBuffer();

    const fontFace = new FontFace(familyClean, buffer);
    await fontFace.load();
    document.fonts.add(fontFace);

    const fontItem = {
      id: familyClean,
      name: `📁 ${baseName}`,
      family: `'${familyClean}', sans-serif`,
      familyClean: familyClean,
      isCustom: true,
      category: 'custom',
      buffer: buffer
    };

    USER_CUSTOM_FONTS.push(fontItem);
    await FontStorageDB.saveFont(fontItem);
    return fontItem;
  },

  async scanLocalPCFonts() {
    if (!('queryLocalFonts' in window)) {
      throw new Error('កម្មវិធីរុករក (Browser) មិនគាំទ្រ queryLocalFonts API ទេ។ សូមប្រើ Edge ឬ Chrome ហើយអនុញ្ញាតសិទ្ធិ!');
    }

    try {
      const fonts = await window.queryLocalFonts();
      const seen = new Set();
      SCANNED_PC_FONTS.length = 0;

      for (const f of fonts) {
        const lower = f.family.toLowerCase();
        if (
          lower.includes('khmer') ||
          lower.includes('moul') ||
          lower.includes('battambang') ||
          lower.includes('bokor') ||
          lower.includes('angkor') ||
          lower.includes('bayon') ||
          lower.includes('koulen') ||
          lower.includes('daunpenh') ||
          lower.includes('leelawadee') ||
          lower.includes('siemreap')
        ) {
          if (!seen.has(f.family)) {
            seen.add(f.family);
            SCANNED_PC_FONTS.push({
              id: f.family,
              name: `🖥️ ${f.family}`,
              family: `'${f.family}', sans-serif`,
              category: 'scanned',
              isScanned: true
            });
          }
        }
      }
      return SCANNED_PC_FONTS;
    } catch (err) {
      throw new Error('ការស្កេន Font ត្រូវបានបដិសេធ ឬបរាជ័យ៖ ' + err.message);
    }
  },

  getAllFontsList() {
    return [
      ...USER_CUSTOM_FONTS,
      ...SCANNED_PC_FONTS,
      ...WINDOWS_KHMER_FONTS,
      ...GOOGLE_KHMER_FONTS
    ];
  },

  getFontFamilyString(fontId) {
    if (!fontId) return "'Khmer OS Muol Light', 'Moul', cursive, sans-serif";

    // 1. Custom font
    const custom = USER_CUSTOM_FONTS.find(f => f.id === fontId);
    if (custom) return custom.family;

    // 2. Scanned
    const scanned = SCANNED_PC_FONTS.find(f => f.id === fontId);
    if (scanned) return scanned.family;

    // 3. Windows system font
    const win = WINDOWS_KHMER_FONTS.find(f => f.id === fontId || f.baseName === fontId);
    if (win) return win.family;

    // 4. Google font
    const google = GOOGLE_KHMER_FONTS.find(f => f.id === fontId);
    if (google) return google.family;

    return `'${fontId}', 'Khmer OS Muol Light', 'Moul', sans-serif`;
  }
};

