/**
 * 30 Authentic & Ultra-High-Definition 3D Text Styles for Khmer Typography
 * Supports Gold Foils, Royal Palace Gems, Pop Colors, Cyber Neon, Stone Carvings, and Khmer Heritage
 */

const TEXT_3D_STYLES = [
  // 1. Royal Gold & Metallics
  {
    id: 'royal-gold-3d',
    name: '1. មាសអភិជន 3D (Royal Gold Foil)',
    category: 'gold',
    icon: '👑',
    badge: 'ពេញនិយម',
    fill: '#ffd700',
    fillColor2: '#b45309',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#ca8a04',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#78350f',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #1e293b, #0f172a)'
  },
  {
    id: 'palace-antique-gold',
    name: '2. មាសបុរាណរាជវាំង 3D (Palace Antique Gold)',
    category: 'gold',
    icon: '🏛️',
    badge: 'រាជវាំង',
    fill: '#fde047',
    fillColor2: '#854d0e',
    gradientFill: true,
    stroke: '#fef08a',
    strokeWidth: 3,
    glowColor: '#eab308',
    glowBlur: 4,
    depth: 5,
    extrusionColor: '#451a03',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #1c1917, #0c0a09)'
  },
  {
    id: 'platinum-chrome-3d',
    name: '3. ផ្លាទីនក្រូមចាំង 3D (Platinum Chrome)',
    category: 'gold',
    icon: '⚡',
    badge: 'ក្រូមមាស',
    fill: '#f8fafc',
    fillColor2: '#94a3b8',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#cbd5e1',
    glowBlur: 4,
    depth: 5,
    extrusionColor: '#334155',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #0f172a, #1e293b)'
  },
  {
    id: 'rose-gold-luxury',
    name: '4. មាសផ្កាកុលាប 3D (Rose Gold Luxury)',
    category: 'gold',
    icon: '🌸',
    badge: 'ផ្កាកុលាប',
    fill: '#fecdd3',
    fillColor2: '#f43f5e',
    gradientFill: true,
    stroke: '#fff1f2',
    strokeWidth: 3,
    glowColor: '#fb7185',
    glowBlur: 4,
    depth: 5,
    extrusionColor: '#881337',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #2a0815, #140409)'
  },

  // 2. Royal Gems & Jewelry
  {
    id: 'royal-ruby-gem',
    name: '5. ត្បូងទទឹមរាជ 3D (Royal Ruby Gem)',
    category: 'gem',
    icon: '💎',
    badge: 'ត្បូងទទឹម',
    fill: '#ef4444',
    fillColor2: '#991b1b',
    gradientFill: true,
    stroke: '#ffd700',
    strokeWidth: 3.5,
    glowColor: '#f87171',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#450a0a',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #200508, #100204)'
  },
  {
    id: 'sacred-emerald-gem',
    name: '6. ត្បូងមរកតទិព្វ 3D (Sacred Emerald)',
    category: 'gem',
    icon: '💚',
    badge: 'ត្បូងមរកត',
    fill: '#10b981',
    fillColor2: '#047857',
    gradientFill: true,
    stroke: '#fef08a',
    strokeWidth: 3.5,
    glowColor: '#34d399',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#064e3b',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #022c22, #011611)'
  },
  {
    id: 'sapphire-royal-blue',
    name: '7. មុជទឹកខៀវជ្រៅ 3D (Sapphire Royal Blue)',
    category: 'gem',
    icon: '🔷',
    badge: 'ត្បូងកណ្ដៀង',
    fill: '#38bdf8',
    fillColor2: '#1d4ed8',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#60a5fa',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#0c2340',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #081e3a, #030d1a)'
  },
  {
    id: 'royal-amethyst-gem',
    name: '8. ស្វាយរាជវង្ស 3D (Royal Amethyst Violet)',
    category: 'gem',
    icon: '🔮',
    badge: 'ត្បូងកណ្ដៀងស្វាយ',
    fill: '#c084fc',
    fillColor2: '#6b21a8',
    gradientFill: true,
    stroke: '#f5d0fe',
    strokeWidth: 3,
    glowColor: '#d8b4fe',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#3b0764',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #2e1065, #170832)'
  },

  // 3. Khmer Heritage & Culture
  {
    id: 'cambodian-flag-3d',
    name: '9. ទង់ជាតិកម្ពុជា 3D (Cambodian Pride)',
    category: 'heritage',
    icon: '🇰🇭',
    badge: 'មោទនភាពជាតិ',
    fill: '#38bdf8',
    fillColor2: '#e11d48',
    gradientFill: true,
    stroke: '#ffd700',
    strokeWidth: 4,
    glowColor: '#ffd700',
    glowBlur: 6,
    depth: 5,
    extrusionColor: '#1e3a8a',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #002b7f, #ce1126)'
  },
  {
    id: 'angkor-stone-chisel',
    name: '10. ចម្លាក់ថ្មអង្គរ 3D (Angkor Stone Chisel)',
    category: 'heritage',
    icon: '🗿',
    badge: 'បេតិកភណ្ឌ',
    fill: '#fde68a',
    fillColor2: '#b45309',
    gradientFill: true,
    stroke: '#fef3c7',
    strokeWidth: 3,
    glowColor: '#d97706',
    glowBlur: 3,
    depth: 6,
    extrusionColor: '#291e10',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #2b1f14, #140d08)'
  },
  {
    id: 'traditional-khmer-silk',
    name: '11. សូត្រខ្មែរប្រពៃណី 3D (Traditional Khmer Silk)',
    category: 'heritage',
    icon: '🧣',
    badge: 'សូត្រខ្មែរ',
    fill: '#fda4af',
    fillColor2: '#991b1b',
    gradientFill: true,
    stroke: '#fde047',
    strokeWidth: 3.5,
    glowColor: '#f43f5e',
    glowBlur: 4,
    depth: 5,
    extrusionColor: '#4c0519',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #4c0519, #20020a)'
  },
  {
    id: 'flaming-fire-torch',
    name: '12. ភ្លើងគប់បញ្ញា 3D (Flaming Fire Torch)',
    category: 'heritage',
    icon: '🔥',
    badge: 'ភ្លើងបញ្ញា',
    fill: '#fef08a',
    fillColor2: '#ea580c',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3,
    glowColor: '#f97316',
    glowBlur: 6,
    depth: 5,
    extrusionColor: '#7c2d12',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #431407, #1f0802)'
  },

  // 4. Pop & Kids School Colors
  {
    id: 'candy-pink-3d',
    name: '13. ស្ករគ្រាប់កុមារ 3D (Sweet Candy Pink)',
    category: 'pop',
    icon: '🍬',
    badge: 'កុមារ',
    fill: '#f472b6',
    fillColor2: '#db2777',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 4,
    glowColor: '#f472b6',
    glowBlur: 4,
    depth: 5,
    extrusionColor: '#831843',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #500724, #270211)'
  },
  {
    id: 'ocean-turquoise-3d',
    name: '14. ពពុះសមុទ្រ 3D (Ocean Turquoise)',
    category: 'pop',
    icon: '🌊',
    badge: 'សមុទ្រ',
    fill: '#22d3ee',
    fillColor2: '#0891b2',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#67e8f9',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#164e63',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #083344, #041820)'
  },
  {
    id: 'sunset-orange-3d',
    name: '15. ទឹកក្រូចថ្ងៃលិច 3D (Sunset Orange Glow)',
    category: 'pop',
    icon: '🌅',
    badge: 'ថ្ងៃលិច',
    fill: '#fb923c',
    fillColor2: '#c2410c',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#fdba74',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#431407',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #2b0d04, #140501)'
  },
  {
    id: 'rainbow-pop-3d',
    name: '16. ឥន្ទធនូរីករាយ 3D (Rainbow Pop Candy)',
    category: 'pop',
    icon: '🌈',
    badge: 'ឥន្ទធនូ',
    fill: '#facc15',
    fillColor2: '#ec4899',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 4,
    glowColor: '#38bdf8',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#1e1b4b',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #1e1b4b, #0f0d26)'
  },
  {
    id: 'comic-pop-retro',
    name: '17. កំប្លែង Pop Comic 3D (Retro Comic)',
    category: 'pop',
    icon: '💥',
    badge: 'Comic',
    fill: '#fde047',
    fillColor2: '#eab308',
    gradientFill: false,
    stroke: '#000000',
    strokeWidth: 4.5,
    glowColor: '',
    glowBlur: 0,
    depth: 6,
    extrusionColor: '#000000',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #ef4444, #b91c1c)'
  },
  {
    id: 'spring-leaf-green',
    name: '18. ស្លឹកឈើស្រស់ 3D (Fresh Spring Leaf)',
    category: 'pop',
    icon: '🍃',
    badge: 'ធម្មជាតិ',
    fill: '#a3e635',
    fillColor2: '#4d7c0f',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#bef264',
    glowBlur: 4,
    depth: 5,
    extrusionColor: '#1a2e05',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #142004, #080d01)'
  },
  {
    id: 'sweet-honey-amber',
    name: '19. ទឹកឃ្មុំផ្អែម 3D (Sweet Golden Honey)',
    category: 'pop',
    icon: '🍯',
    badge: 'ទឹកឃ្មុំ',
    fill: '#fde047',
    fillColor2: '#d97706',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3,
    glowColor: '#fbbf24',
    glowBlur: 4,
    depth: 5,
    extrusionColor: '#78350f',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #351504, #1a0a01)'
  },
  {
    id: 'citrus-lemon-3d',
    name: '20. ក្រូចឆ្មាស្រស់ 3D (Citrus Neon Lemon)',
    category: 'pop',
    icon: '🍋',
    badge: 'ក្រូចឆ្មា',
    fill: '#facc15',
    fillColor2: '#84cc16',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#fde047',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#365314',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #1f2d0a, #0c1203)'
  },

  // 5. Cyber, High-Tech & Futuristic
  {
    id: 'cyber-neon-blue',
    name: '21. ស៊ីប័រនេអុង 3D (Cyber Neon Blue)',
    category: 'cyber',
    icon: '💻',
    badge: 'បច្ចេកវិទ្យា',
    fill: '#38bdf8',
    fillColor2: '#0284c7',
    gradientFill: true,
    stroke: '#00f0ff',
    strokeWidth: 3.5,
    glowColor: '#00f0ff',
    glowBlur: 8,
    depth: 5,
    extrusionColor: '#032541',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #051329, #020914)'
  },
  {
    id: 'cosmic-space-nebula',
    name: '22. កាឡាក់ស៊ីអវកាស 3D (Cosmic Nebula)',
    category: 'cyber',
    icon: '🌌',
    badge: 'អវកាស',
    fill: '#e879f9',
    fillColor2: '#6366f1',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#a855f7',
    glowBlur: 7,
    depth: 5,
    extrusionColor: '#1e1b4b',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #15092a, #080312)'
  },
  {
    id: 'titanium-gold-edge',
    name: '23. ដែកថែបមាស 3D (Titanium & Gold Edge)',
    category: 'cyber',
    icon: '🛡️',
    badge: 'ដែកថែប',
    fill: '#e2e8f0',
    fillColor2: '#64748b',
    gradientFill: true,
    stroke: '#ffd700',
    strokeWidth: 3.5,
    glowColor: '#ffd700',
    glowBlur: 5,
    depth: 5,
    extrusionColor: '#0f172a',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #1e293b, #0a0f1d)'
  },
  {
    id: 'volcanic-magma-3d',
    name: '24. ឡាវ៉ាភ្នំភ្លើង 3D (Volcanic Magma)',
    category: 'cyber',
    icon: '🌋',
    badge: 'ឡាវ៉ា',
    fill: '#fde047',
    fillColor2: '#dc2626',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3,
    glowColor: '#ef4444',
    glowBlur: 6,
    depth: 6,
    extrusionColor: '#18181b',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #18181b, #09090b)'
  },

  // 6. Natural & Elegant Themes
  {
    id: 'ice-glacier-frost',
    name: '25. ព្រិលទឹកកក 3D (Ice Glacier Frost)',
    category: 'elegant',
    icon: '❄️',
    badge: 'ទឹកកក',
    fill: '#ffffff',
    fillColor2: '#7dd3fc',
    gradientFill: true,
    stroke: '#e0f2fe',
    strokeWidth: 3,
    glowColor: '#38bdf8',
    glowBlur: 6,
    depth: 5,
    extrusionColor: '#0369a1',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #075985, #022c44)'
  },
  {
    id: 'moonlight-silver-3d',
    name: '26. ពន្លឺព្រះចន្ទ 3D (Moonlight Pearl Silver)',
    category: 'elegant',
    icon: '🌙',
    badge: 'ព្រះចន្ទ',
    fill: '#ffffff',
    fillColor2: '#cbd5e1',
    gradientFill: true,
    stroke: '#e2e8f0',
    strokeWidth: 3,
    glowColor: '#94a3b8',
    glowBlur: 4,
    depth: 5,
    extrusionColor: '#1e293b',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #090d16, #030508)'
  },
  {
    id: 'sakura-blossom-pink',
    name: '27. ផ្កាសាគូរ៉ា 3D (Cherry Blossom Sakura)',
    category: 'elegant',
    icon: '🌸',
    badge: 'សាគូរ៉ា',
    fill: '#fbcfe8',
    fillColor2: '#f472b6',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#f9a8d4',
    glowBlur: 4,
    depth: 5,
    extrusionColor: '#831843',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #3d091e, #1a020b)'
  },
  {
    id: 'dark-chocolate-mousse',
    name: '28. សូកូឡាក្តៅ 3D (Dark Chocolate Mousse)',
    category: 'elegant',
    icon: '🍫',
    badge: 'សូកូឡា',
    fill: '#fed7aa',
    fillColor2: '#78350f',
    gradientFill: true,
    stroke: '#fff7ed',
    strokeWidth: 3,
    glowColor: '#9a3412',
    glowBlur: 3,
    depth: 5,
    extrusionColor: '#270e04',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #1c0902, #0a0301)'
  },
  {
    id: 'military-olive-3d',
    name: '29. យោធាក្លាហាន 3D (Military Camo Green)',
    category: 'elegant',
    icon: '🎖️',
    badge: 'កិត្តិយស',
    fill: '#d9f99d',
    fillColor2: '#3f6212',
    gradientFill: true,
    stroke: '#fef08a',
    strokeWidth: 3,
    glowColor: '#65a30d',
    glowBlur: 3,
    depth: 5,
    extrusionColor: '#142004',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #142004, #080d01)'
  },
  {
    id: 'diamond-shimmer-3d',
    name: '30. ពេជ្រចែងចាំង 3D (Diamond Crystal Shimmer)',
    category: 'gem',
    icon: '💎',
    badge: 'ពេជ្រ',
    fill: '#ffffff',
    fillColor2: '#67e8f9',
    gradientFill: true,
    stroke: '#ffffff',
    strokeWidth: 3.5,
    glowColor: '#00f0ff',
    glowBlur: 8,
    depth: 5,
    extrusionColor: '#083344',
    direction: 'bottom-right',
    previewBg: 'linear-gradient(135deg, #0c2138, #040d18)'
  }
];

const Text3DManager = {
  getAllStyles() {
    return TEXT_3D_STYLES;
  },

  getStyleById(id) {
    return TEXT_3D_STYLES.find(s => s.id === id) || null;
  },

  /**
   * Apply 3D Style to a given text layer
   */
  applyStyleToLayer(layer, styleId) {
    if (!layer) return;
    if (styleId === 'none' || !styleId) {
      layer.style3D = null;
      layer.depth3D = 0;
      return;
    }

    const style = this.getStyleById(styleId);
    if (!style) return;

    layer.style3D = style.id;
    layer.fill = style.fill;
    layer.fillColor2 = style.fillColor2;
    layer.gradientFill = style.gradientFill;
    layer.stroke = style.stroke;
    layer.strokeWidth = style.strokeWidth;
    layer.glowColor = style.glowColor;
    layer.glowBlur = style.glowBlur;
    layer.depth3D = style.depth || 4;
    layer.extrusionColor = style.extrusionColor;
    layer.direction3D = style.direction || 'bottom-right';
  },

  /**
   * Compute directional step offsets for 3D extrusion
   */
  getDirectionOffsets(direction = 'bottom-right', step = 1) {
    switch (direction) {
      case 'bottom-left':
        return { dx: -step, dy: step };
      case 'down':
        return { dx: 0, dy: step * 1.2 };
      case 'top-right':
        return { dx: step, dy: -step };
      case 'bottom-right':
      default:
        return { dx: step, dy: step };
    }
  }
};

