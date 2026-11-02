/**
 * Presets, Frame Styles, and Color Themes for Khmer Student Notebook Covers
 */

const FRAME_STYLES = [
  {
    id: 'cartoon-kids',
    name: 'កូនក្មេង & ឥន្ទធនូរីករាយ (Primary School Cartoon Kids)',
    description: 'កុមារារីករាយ មេឃស្រឡះ ព្រះអាទិត្យ ខ្មៅដៃពណ៌ និងស៊ុមរលកតារា',
    previewColor: '#38bdf8',
    badge: 'ពេញនិយមបំផុត',
    isSpecial: true
  },
  {
    id: 'royal-kbach',
    name: 'ក្បាច់ភ្ញីទេសរាជវាំងមាស (Royal Golden Phni Tes)',
    description: 'ក្បាច់បុរាណខ្មែរ ពណ៌ទឹកមាសអភិជន គែមភ្លោះ និងក្បាច់ភ្ញីទេសរំលេច ៤ ជ្រុង',
    previewColor: '#d4af37',
    badge: 'បែបខ្មែរ',
    isKhmerSpecial: true
  },
  {
    id: 'angkor-wat',
    name: 'ក្បាច់អង្គរវត្ត & ផ្កាឈូកទិព្វ (Angkor Wat Heritage)',
    description: 'រចនាបថអង្គរវត្តកំពូល ៥ ដ៏ពិសិដ្ឋ ផ្កាឈូកទិព្វ និងក្បាច់ចម្លាក់ថ្មបុរាណ',
    previewColor: '#b8860b',
    badge: 'បេតិកភណ្ឌ',
    isKhmerSpecial: true
  },
  {
    id: 'romdoul-khmer',
    name: 'ផ្ការំដួលជាតិខ្មែរ វិចិត្រ (National Romdoul Blossom)',
    description: 'រំលេចផ្ការំដួលតំណាងជាតិខ្មែរ គែមស្លឹកឈើ និងស៊ុមរលកទន់ភ្លន់',
    previewColor: '#eab308',
    badge: 'ផ្កាជាតិ',
    isKhmerSpecial: true
  },
  {
    id: 'notebook-grid',
    name: 'ក្រឡាសៀវភៅសិស្សកម្ពុជា (Khmer Ruled Notebook Grid)',
    description: 'ក្រឡាហ្គារ៉ូសៀវភៅសិស្សខ្នាតស្ដង់ដារ បន្ទាត់ក្រហម-ខៀវ និងស្ទីគ័រតុបតែង',
    previewColor: '#00897b',
    badge: 'សៀវភៅសិស្ស'
  },
  {
    id: 'cambodian-flag',
    name: 'ទង់ជាតិ & បូកិត្តិយសជាតិ (Cambodia National Ribbon)',
    description: 'ឆ្នូតខៀវ-ក្រហម-ខៀវ បង្ហាញពីមោទនភាពជាតិខ្មែរ និងរូបអង្គរវត្តមាស',
    previewColor: '#1d4ed8',
    badge: 'មោទនភាពជាតិ',
    isKhmerSpecial: true
  },
  {
    id: 'luxury-gold-double',
    name: 'ស៊ុមមាសអភិជនបន្ទាត់ភ្លោះ (Luxury Golden Double)',
    description: 'បន្ទាត់មាសភ្លោះអភិជន រំលេចក្បាច់គ្រាប់មាស ៤ ជ្រុង សម្រាប់ក្របផ្លូវការ',
    previewColor: '#d4af37',
    badge: 'មាសអភិជន',
    isKhmerSpecial: true
  },
  {
    id: 'sample-floral-stripes',
    name: 'គំរូផ្កាឆ្នូតប៉ាស្ទែល & ផ្នត់រលក (Pastel Scallop Floral)',
    description: 'ឆ្នូតចម្រុះពណ៌បែបកុមារ + ផ្នត់រលកផ្កាឈូក + ផ្កាតុបតែង ៤ ជ្រុង',
    previewColor: '#ff80ab',
    badge: 'ពេញនិយម'
  },
  {
    id: 'sweet-floral',
    name: 'ផ្កាសាគូរ៉ា & ប៉ាស្ទែលទន់ភ្លន់ (Sweet Pastel Sakura)',
    description: 'ស៊ុមផ្ការីកស្គុះស្គាយពណ៌ផ្កាឈូក និងស្វាយ សម្រាប់សិស្សស្រី',
    previewColor: '#ec4899',
    badge: 'គួរឱ្យស្រឡាញ់'
  },
  {
    id: 'cosmic-galaxy',
    name: 'កាឡាក់ស៊ីអវកាស & វិទ្យាសាស្ត្រ (Cosmic Space)',
    description: 'ផ្ទៃមេឃពេលយប់ ពន្លឺផ្កាយ និងរង្វង់គន្លងភព សម្រាប់មុខវិជ្ជាវិទ្យាសាស្ត្រ',
    previewColor: '#6366f1',
    badge: 'អវកាស'
  },
  {
    id: 'rainbow-fun',
    name: 'ឥន្ទធនូរីករាយ & កុមារតូច (Playful Rainbow)',
    description: 'ក្បូរក្បាច់ឥន្ទធនូចម្រុះពណ៌ ភ្លឺស្រស់ថ្លា សម្រាប់កុមារតូចៗថ្នាក់ទី ១-៣',
    previewColor: '#f97316',
    badge: 'កុមារ'
  },
  {
    id: 'honor-badge',
    name: 'បូកិត្តិយស & ស្លឹកជ័យលាភី (Laurel Honor Medal)',
    description: 'កម្រងស្លឹកជ័យលាភីមាស សម្រាប់សិស្សពូកែ និងក្របកិត្តិយស',
    previewColor: '#ca8a04',
    badge: 'កិត្តិយស'
  },
  {
    id: 'cyber-stem',
    name: 'ស៊ីប័រ STEM & បច្ចេកវិទ្យា (Cyber STEM Tech)',
    description: 'ខ្សែបន្ទាត់បច្ចេកវិទ្យា និង Node អេឡិចត្រូនិក ពន្លឺខៀវ Cyber ទំនើប',
    previewColor: '#00f0ff',
    badge: 'បច្ចេកវិទ្យា'
  },
  {
    id: 'khmer-silk-ribbon',
    name: 'ស៊ុមឆ្នូតក្រណាត់សូត្រខ្មែរ (Traditional Khmer Silk)',
    description: 'រចនាបថឆ្នូតសូត្រមាស-ក្រហមបុរាណ បង្ហាញពីប្រពៃណីខ្មែរដ៏រុងរឿង',
    previewColor: '#991b1b',
    badge: 'សូត្រខ្មែរ',
    isKhmerSpecial: true
  },
  {
    id: 'custom',
    name: 'ស៊ុមផ្ទាល់ខ្លួនពី PC (Custom Uploaded Frame)',
    description: 'បញ្ចូលរូបភាពស៊ុមផ្ទាល់ខ្លួនពីកុំព្យូទ័រ (PNG / JPG / WebP)',
    previewColor: '#8b5cf6',
    isCustom: true
  }
];

const DEFAULT_SUBJECTS = [
  {
    id: 'khmer',
    name: 'ភាសាខ្មែរ',
    subtitle: 'Khmer Language',
    category: 'language',
    icon: '📚',
    themeColor: '#1565c0',
    accentColor: '#ffd54f',
    bgGradient: 'linear-gradient(135deg, #f0f7ff 0%, #e1effe 100%)',
    frameStyle: 'cartoon-kids',
    defaultColors: {
      schoolName: '#0d47a1',
      schoolStroke: '#ffffff',
      grade: '#d84315',
      subject: '#1565c0',
      name: '#2e7d32',
      year: '#6a1b9a'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Moul',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'math',
    name: 'គណិតវិទ្យា',
    subtitle: 'Mathematics',
    category: 'science',
    icon: '📐',
    themeColor: '#00897b',
    accentColor: '#ff7043',
    bgGradient: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
    frameStyle: 'notebook-grid',
    defaultColors: {
      schoolName: '#00695c',
      schoolStroke: '#ffffff',
      grade: '#e65100',
      subject: '#00796b',
      name: '#1565c0',
      year: '#4e342e'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Moul',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'dictation',
    name: 'សរសេរតាមអាន',
    subtitle: 'Dictation',
    category: 'language',
    icon: '📝',
    themeColor: '#ff4081',
    accentColor: '#ffd54f',
    bgGradient: 'linear-gradient(135deg, #fffde7 0%, #fff9c4 100%)',
    frameStyle: 'cartoon-kids',
    defaultColors: {
      schoolName: '#c2185b',
      schoolStroke: '#ffffff',
      grade: '#00838f',
      subject: '#0097a7',
      name: '#c2185b',
      year: '#1565c0'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Koulen',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'composition',
    name: 'តែងសេចក្ដី',
    subtitle: 'Composition',
    category: 'language',
    icon: '✍️',
    themeColor: '#6a1b9a',
    accentColor: '#ab47bc',
    bgGradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
    frameStyle: 'romdoul-khmer',
    defaultColors: {
      schoolName: '#4a148c',
      schoolStroke: '#ffffff',
      grade: '#00838f',
      subject: '#6a1b9a',
      name: '#c2185b',
      year: '#283593'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Moul',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'science',
    name: 'វិទ្យាសាស្ត្រ',
    subtitle: 'Science & Environment',
    category: 'science',
    icon: '🔬',
    themeColor: '#303f9f',
    accentColor: '#00bcd4',
    bgGradient: 'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%)',
    frameStyle: 'cosmic-galaxy',
    defaultColors: {
      schoolName: '#1a237e',
      schoolStroke: '#ffffff',
      grade: '#0097a7',
      subject: '#283593',
      name: '#00796b',
      year: '#c2185b'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Moul',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'social',
    name: 'សិក្សាសង្គម',
    subtitle: 'Social Studies',
    category: 'social',
    icon: '🌍',
    themeColor: '#e65100',
    accentColor: '#ffd54f',
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
    frameStyle: 'angkor-wat',
    defaultColors: {
      schoolName: '#bf360c',
      schoolStroke: '#ffffff',
      grade: '#00838f',
      subject: '#d84315',
      name: '#1565c0',
      year: '#2e7d32'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Moul',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'english',
    name: 'ភាសាអង់គ្លេស',
    subtitle: 'English Language',
    category: 'language',
    icon: '🔤',
    themeColor: '#c62828',
    accentColor: '#1565c0',
    bgGradient: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
    frameStyle: 'cambodian-flag',
    defaultColors: {
      schoolName: '#b71c1c',
      schoolStroke: '#ffffff',
      grade: '#1565c0',
      subject: '#c62828',
      name: '#00796b',
      year: '#4a148c'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Moul',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'art',
    name: 'គំនូរ & សិល្បៈ',
    subtitle: 'Art & Drawing',
    category: 'art',
    icon: '🎨',
    themeColor: '#e91e63',
    accentColor: '#00e676',
    bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    frameStyle: 'cartoon-kids',
    defaultColors: {
      schoolName: '#880e4f',
      schoolStroke: '#ffffff',
      grade: '#00897b',
      subject: '#ad1457',
      name: '#3949ab',
      year: '#ef6c00'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Dangrek',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'civics',
    name: 'សីលធម៌ & ពលរដ្ឋ',
    subtitle: 'Morality & Civics',
    category: 'social',
    icon: '🕊️',
    themeColor: '#2e7d32',
    accentColor: '#ffca28',
    bgGradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    frameStyle: 'cartoon-kids',
    defaultColors: {
      schoolName: '#1b5e20',
      schoolStroke: '#ffffff',
      grade: '#d84315',
      subject: '#2e7d32',
      name: '#1565c0',
      year: '#6a1b9a'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Moul',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'homework',
    name: 'កិច្ចការផ្ទះ',
    subtitle: 'Homework Notebook',
    category: 'general',
    icon: '⭐',
    themeColor: '#f57c00',
    accentColor: '#00acc1',
    bgGradient: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
    frameStyle: 'notebook-grid',
    defaultColors: {
      schoolName: '#e65100',
      schoolStroke: '#ffffff',
      grade: '#00838f',
      subject: '#f57c00',
      name: '#283593',
      year: '#2e7d32'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Moul',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'ict',
    name: 'ព័ត៌មានវិទ្យា',
    subtitle: 'ICT & Computer',
    category: 'science',
    icon: '💻',
    themeColor: '#0284c7',
    accentColor: '#38bdf8',
    bgGradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    frameStyle: 'cyber-stem',
    defaultColors: {
      schoolName: '#0369a1',
      schoolStroke: '#ffffff',
      grade: '#0284c7',
      subject: '#075985',
      name: '#0f766e',
      year: '#4338ca'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Koulen',
      name: 'Koulen',
      year: 'Koulen'
    }
  },
  {
    id: 'sport',
    name: 'អប់រំកាយ & កីឡា',
    subtitle: 'Physical Education',
    category: 'sport',
    icon: '🏃‍♂️',
    themeColor: '#dc2626',
    accentColor: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    frameStyle: 'rainbow-fun',
    defaultColors: {
      schoolName: '#991b1b',
      schoolStroke: '#ffffff',
      grade: '#b45309',
      subject: '#b91c1c',
      name: '#1e40af',
      year: '#065f46'
    },
    defaultFonts: {
      schoolName: 'Moul',
      grade: 'Koulen',
      subject: 'Moul',
      name: 'Koulen',
      year: 'Koulen'
    }
  }
];

// Presets Storage Manager
const SubjectPresetsManager = {
  key: 'khmer_cover_subjects_v3',

  getAll() {
    try {
      const saved = localStorage.getItem(this.key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed reading subjects from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SUBJECTS));
  },

  save(list) {
    try {
      localStorage.setItem(this.key, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed saving subjects to localStorage:', e);
    }
  },

  add(item) {
    const list = this.getAll();
    list.push(item);
    this.save(list);
    return item;
  },

  update(id, updated) {
    const list = this.getAll();
    const idx = list.findIndex(s => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updated };
      this.save(list);
      return list[idx];
    }
    return null;
  },

  delete(id) {
    const list = this.getAll().filter(s => s.id !== id);
    this.save(list);
  },

  reset() {
    this.save(DEFAULT_SUBJECTS);
    return JSON.parse(JSON.stringify(DEFAULT_SUBJECTS));
  }
};

