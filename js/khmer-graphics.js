/**
 * Khmer Graphics & Authentic Ornament Vector Library
 * High-precision procedural SVG generators for traditional Cambodian art & school stationery
 */

const KhmerGraphics = {
  /**
   * 1. Traditional Royal Khmer Phni Tes Corner (ក្បាច់ភ្ញីទេសរាជវាំង)
   * Detailed multi-tiered traditional Cambodian ornamental corner flourish
   */
  createPhniTesCorner(x, y, scale = 1, rotation = 0, color = 'url(#khmer-gold-grad)') {
    return `
      <g transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})" filter="url(#kbach-glow)">
        <!-- Outer Flourish Curves -->
        <path d="M 0,0 
                 C 25,2 48,12 62,30 
                 C 70,40 74,55 72,70 
                 C 70,80 62,88 52,86 
                 C 42,84 38,72 44,62 
                 C 50,52 64,48 58,36 
                 C 52,24 35,16 15,14 
                 C 10,14 5,12 0,0 Z" 
              fill="${color}" opacity="0.95" />
        
        <!-- Symmetrical Counter Arch -->
        <path d="M 0,0 
                 C 2,25 12,48 30,62 
                 C 40,70 55,74 70,72 
                 C 80,70 88,62 86,52 
                 C 84,42 72,38 62,44 
                 C 52,50 48,64 36,58 
                 C 24,52 16,35 14,15 
                 C 14,10 12,5 0,0 Z" 
              fill="${color}" opacity="0.95" />
        
        <!-- Center Lotus Spire Finial -->
        <path d="M 0,0 
                 Q 30,30 52,52 
                 C 60,60 68,68 64,74 
                 C 60,80 50,76 46,68 
                 Q 26,40 0,0 Z" 
              fill="${color}" />
              
        <!-- Decorative Flame Spikes (ត្របកភ្ញី) -->
        <path d="M 18,6 Q 32,2 40,12 Q 28,16 18,6 Z" fill="#ffd700" />
        <path d="M 6,18 Q 2,32 12,40 Q 16,28 6,18 Z" fill="#ffd700" />
        <path d="M 32,18 Q 48,18 54,28 Q 42,32 32,18 Z" fill="#eab308" />
        <path d="M 18,32 Q 18,48 28,54 Q 32,42 18,32 Z" fill="#eab308" />
        
        <!-- Golden Jewel Bead at corner origin -->
        <circle cx="6" cy="6" r="4.5" fill="#ffd700" stroke="#b45309" stroke-width="1.2" />
        <circle cx="6" cy="6" r="2" fill="#fff" opacity="0.8" />
        <circle cx="28" cy="28" r="3" fill="#f59e0b" />
        <circle cx="48" cy="48" r="2.2" fill="#ffd700" />
      </g>
    `;
  },

  /**
   * 4 Symmetrical Royal Corners for frame borders
   */
  renderFourCorners(w, h, style = 'phni-tes', inset = 18, scale = 0.85) {
    if (style === 'phni-tes') {
      return `
        ${this.createPhniTesCorner(inset, inset, scale, 0)}
        ${this.createPhniTesCorner(w - inset, inset, scale, 90)}
        ${this.createPhniTesCorner(w - inset, h - inset, scale, 180)}
        ${this.createPhniTesCorner(inset, h - inset, scale, 270)}
      `;
    } else if (style === 'romdoul') {
      return `
        <g transform="translate(${inset + 12}, ${inset + 12}) scale(${scale})">${this.createRomdoulFlower()}</g>
        <g transform="translate(${w - inset - 12}, ${inset + 12}) scale(${scale})">${this.createRomdoulFlower()}</g>
        <g transform="translate(${inset + 12}, ${h - inset - 12}) scale(${scale})">${this.createRomdoulFlower()}</g>
        <g transform="translate(${w - inset - 12}, ${h - inset - 12}) scale(${scale})">${this.createRomdoulFlower()}</g>
      `;
    } else if (style === 'lotus') {
      return `
        <g transform="translate(${inset + 14}, ${inset + 14}) scale(${scale * 0.75})">${this.createGoldenLotus()}</g>
        <g transform="translate(${w - inset - 14}, ${inset + 14}) scale(${scale * 0.75})">${this.createGoldenLotus()}</g>
        <g transform="translate(${inset + 14}, ${h - inset - 14}) scale(${scale * 0.75})">${this.createGoldenLotus()}</g>
        <g transform="translate(${w - inset - 14}, ${h - inset - 14}) scale(${scale * 0.75})">${this.createGoldenLotus()}</g>
      `;
    }
    return '';
  },

  /**
   * 2. Authentic Angkor Wat Temple Silhouette (ប្រាសាទអង្គរវត្ត)
   * High-detail 5-tower silhouette with temple tiers and central sanctuary tower
   */
  createAngkorWat(width = 160, height = 75, fill = 'url(#khmer-gold-grad)') {
    const halfW = width / 2;
    return `
      <g filter="url(#soft-shadow)">
        <!-- Temple Base Gallery & Tier Platforms -->
        <rect x="${-halfW}" y="${height * 0.75}" width="${width}" height="${height * 0.18}" rx="2" fill="${fill}" />
        <rect x="${-halfW + width * 0.08}" y="${height * 0.62}" width="${width * 0.84}" height="${height * 0.14}" rx="2" fill="${fill}" />
        <rect x="${-halfW + width * 0.18}" y="${height * 0.48}" width="${width * 0.64}" height="${height * 0.15}" rx="2" fill="${fill}" />

        <!-- Base Pillars / Windows slit pattern -->
        <g opacity="0.35" fill="#000">
          ${[-0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4].map(ratio => `
            <rect x="${ratio * width - 2}" y="${height * 0.78}" width="4" height="${height * 0.1}" rx="1" />
          `).join('')}
        </g>

        <!-- Tower 1: Far Left -->
        <path d="M ${-halfW + width * 0.12},${height * 0.62}
                 C ${-halfW + width * 0.12},${height * 0.40} ${-halfW + width * 0.15},${height * 0.30} ${-halfW + width * 0.19},${height * 0.22}
                 C ${-halfW + width * 0.20},${height * 0.18} ${-halfW + width * 0.20},${height * 0.12} ${-halfW + width * 0.20},${height * 0.08}
                 C ${-halfW + width * 0.20},${height * 0.12} ${-halfW + width * 0.21},${height * 0.18} ${-halfW + width * 0.22},${height * 0.22}
                 C ${-halfW + width * 0.26},${height * 0.30} ${-halfW + width * 0.29},${height * 0.40} ${-halfW + width * 0.29},${height * 0.62} Z"
              fill="${fill}" />

        <!-- Tower 2: Mid Left -->
        <path d="M ${-halfW + width * 0.26},${height * 0.48}
                 C ${-halfW + width * 0.26},${height * 0.26} ${-halfW + width * 0.30},${height * 0.16} ${-halfW + width * 0.34},${height * 0.09}
                 C ${-halfW + width * 0.35},${height * 0.05} ${-halfW + width * 0.35},0 ${-halfW + width * 0.35},${-height * 0.04}
                 C ${-halfW + width * 0.35},0 ${-halfW + width * 0.36},${height * 0.05} ${-halfW + width * 0.37},${height * 0.09}
                 C ${-halfW + width * 0.41},${height * 0.16} ${-halfW + width * 0.45},${height * 0.26} ${-halfW + width * 0.45},${height * 0.48} Z"
              fill="${fill}" />

        <!-- Tower 3: Center Grand Sanctuary Tower (High Apex) -->
        <path d="M ${-width * 0.14},${height * 0.48}
                 C ${-width * 0.14},${height * 0.20} ${-width * 0.10},${height * 0.04} ${-width * 0.04},${-height * 0.12}
                 C ${-width * 0.02},${-height * 0.20} 0,${-height * 0.28} 0,${-height * 0.35}
                 C 0,${-height * 0.28} ${width * 0.02},${-height * 0.20} ${width * 0.04},${-height * 0.12}
                 C ${width * 0.10},${height * 0.04} ${width * 0.14},${height * 0.20} ${width * 0.14},${height * 0.48} Z"
              fill="${fill}" />
        <!-- Center Spire Finial -->
        <line x1="0" y1="${-height * 0.35}" x2="0" y2="${-height * 0.44}" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="0" cy="${-height * 0.45}" r="2.5" fill="#ffd700" />

        <!-- Tower 4: Mid Right -->
        <path d="M ${halfW - width * 0.45},${height * 0.48}
                 C ${halfW - width * 0.45},${height * 0.26} ${halfW - width * 0.41},${height * 0.16} ${halfW - width * 0.37},${height * 0.09}
                 C ${halfW - width * 0.36},${height * 0.05} ${halfW - width * 0.35},0 ${halfW - width * 0.35},${-height * 0.04}
                 C ${halfW - width * 0.35},0 ${halfW - width * 0.34},${height * 0.05} ${halfW - width * 0.33},${height * 0.09}
                 C ${halfW - width * 0.29},${height * 0.16} ${halfW - width * 0.25},${height * 0.26} ${halfW - width * 0.25},${height * 0.48} Z"
              fill="${fill}" />

        <!-- Tower 5: Far Right -->
        <path d="M ${halfW - width * 0.29},${height * 0.62}
                 C ${halfW - width * 0.29},${height * 0.40} ${halfW - width * 0.26},${height * 0.30} ${halfW - width * 0.22},${height * 0.22}
                 C ${halfW - width * 0.21},${height * 0.18} ${halfW - width * 0.20},${height * 0.12} ${halfW - width * 0.20},${height * 0.08}
                 C ${halfW - width * 0.20},${height * 0.12} ${halfW - width * 0.19},${height * 0.18} ${halfW - width * 0.18},${height * 0.22}
                 C ${halfW - width * 0.14},${height * 0.30} ${halfW - width * 0.11},${height * 0.40} ${halfW - width * 0.11},${height * 0.62} Z"
              fill="${fill}" />
      </g>
    `;
  },

  /**
   * 3. National Romdoul Blossom (ផ្ការំដួលជាតិខ្មែរ)
   * The national flower of Cambodia: 3 broad rounded outer petals + 3 inner fragrant petals
   */
  createRomdoulFlower(size = 38) {
    const r = size / 2;
    return `
      <g filter="url(#soft-shadow)">
        <!-- 3 Outer Broad Petals (at 90°, 210°, 330°) -->
        <g>
          <!-- Top Petal -->
          <path d="M 0,-4 C -${r * 0.7},-${r * 0.5} -${r * 0.8},-${r * 1.1} 0,-${r * 1.25} C ${r * 0.8},-${r * 1.1} ${r * 0.7},-${r * 0.5} 0,-4 Z" 
                fill="#fef08a" stroke="#ca8a04" stroke-width="1.2" />
          <!-- Bottom-Left Petal -->
          <path d="M -3,2 C -${r * 0.8},${r * 0.2} -${r * 1.15},${r * 0.8} -${r * 0.85},${r * 1.1} C -${r * 0.4},${r * 1.15} -${r * 0.1},${r * 0.6} -3,2 Z" 
                fill="#fef08a" stroke="#ca8a04" stroke-width="1.2" />
          <!-- Bottom-Right Petal -->
          <path d="M 3,2 C ${r * 0.8},${r * 0.2} ${r * 1.15},${r * 0.8} ${r * 0.85},${r * 1.1} C ${r * 0.4},${r * 1.15} ${r * 0.1},${r * 0.6} 3,2 Z" 
                fill="#fef08a" stroke="#ca8a04" stroke-width="1.2" />
        </g>

        <!-- 3 Inner Petals (alternating angles: 30°, 150°, 270°) -->
        <g>
          <path d="M 0,0 C ${r * 0.4},-${r * 0.2} ${r * 0.6},-${r * 0.6} ${r * 0.2},-${r * 0.7} C 0,-${r * 0.6} 0,-${r * 0.2} 0,0 Z" 
                fill="#fde047" stroke="#b45309" stroke-width="1" />
          <path d="M 0,0 C -${r * 0.4},-${r * 0.2} -${r * 0.6},-${r * 0.6} -${r * 0.2},-${r * 0.7} C 0,-${r * 0.6} 0,-${r * 0.2} 0,0 Z" 
                fill="#fde047" stroke="#b45309" stroke-width="1" />
          <path d="M 0,0 C -${r * 0.3},${r * 0.4} 0,${r * 0.7} 0,${r * 0.7} C 0,${r * 0.7} ${r * 0.3},${r * 0.4} 0,0 Z" 
                fill="#fde047" stroke="#b45309" stroke-width="1" />
        </g>

        <!-- Center Golden Pistil Core -->
        <circle cx="0" cy="0" r="${r * 0.25}" fill="#b45309" stroke="#78350f" stroke-width="0.8" />
        <circle cx="0" cy="0" r="${r * 0.15}" fill="#facc15" />
        <circle cx="-1" cy="-1" r="${r * 0.08}" fill="#ffffff" />
      </g>
    `;
  },

  /**
   * 4. Golden Lotus Blossom (ផ្កាឈូកមាសទិព្វ)
   * Multi-tiered sacred lotus bud and blooming petals
   */
  createGoldenLotus(scale = 1) {
    return `
      <g transform="scale(${scale})" filter="url(#soft-shadow)">
        <!-- Lotus Base Leaves / Water Pad -->
        <path d="M -30,12 C -20,18 20,18 30,12 C 20,8 -20,8 -30,12 Z" fill="#15803d" opacity="0.8" />
        
        <!-- Outer Golden Petals -->
        <path d="M 0,10 C -22,8 -32,-4 -24,-18 C -18,-14 -10,0 0,10 Z" fill="#eab308" stroke="#ca8a04" stroke-width="1" />
        <path d="M 0,10 C 22,8 32,-4 24,-18 C 18,-14 10,0 0,10 Z" fill="#eab308" stroke="#ca8a04" stroke-width="1" />
        
        <!-- Mid Petals -->
        <path d="M 0,10 C -16,4 -22,-12 -12,-24 C -6,-16 -2,-2 0,10 Z" fill="#facc15" stroke="#b45309" stroke-width="1" />
        <path d="M 0,10 C 16,4 22,-12 12,-24 C 6,-16 2,-2 0,10 Z" fill="#facc15" stroke="#b45309" stroke-width="1" />
        
        <!-- Central Lotus Bud Heart -->
        <path d="M 0,10 C -8,0 -8,-24 0,-30 C 8,-24 8,0 0,10 Z" fill="url(#khmer-gold-grad)" stroke="#b45309" stroke-width="1.2" />
        <circle cx="0" cy="-6" r="3" fill="#fff" opacity="0.9" />
      </g>
    `;
  },

  /**
   * 5. Cambodian Ministry of Education (MoEYS) Style Honor Seal
   * Official badge with open book, torch, laurel wreath, and 5-point star
   */
  createMoEYSSeal(x = 0, y = 0, scale = 1) {
    return `
      <g transform="translate(${x}, ${y}) scale(${scale})" filter="url(#card-shadow)">
        <!-- Outer Golden Laurel Ring -->
        <circle cx="0" cy="0" r="38" fill="#1e3a8a" stroke="url(#khmer-gold-grad)" stroke-width="3" />
        <circle cx="0" cy="0" r="33" fill="none" stroke="#ffd700" stroke-width="1" stroke-dasharray="3,2" />
        
        <!-- Circular Laurel Leaves Left & Right -->
        <path d="M -26,16 C -34,4 -32,-16 -20,-26" fill="none" stroke="#facc15" stroke-width="2.2" stroke-linecap="round" />
        <path d="M 26,16 C 34,4 32,-16 20,-26" fill="none" stroke="#facc15" stroke-width="2.2" stroke-linecap="round" />

        <!-- Open Book Symbol (សៀវភៅចំណេះដឹង) -->
        <path d="M -16,10 C -8,7 0,9 0,9 C 0,9 8,7 16,10 L 16,2 C 8,0 0,2 0,2 C 0,2 -8,0 -16,2 Z" 
              fill="#ffffff" stroke="#0f172a" stroke-width="1" />
        <line x1="0" y1="2" x2="0" y2="10" stroke="#0f172a" stroke-width="1.2" />

        <!-- Torch of Wisdom (ភ្លើងគប់បញ្ញា) -->
        <path d="M -3,2 L 3,2 L 1.5,12 L -1.5,12 Z" fill="#d97706" />
        <!-- Flame -->
        <path d="M 0,-14 C -6,-6 -4,0 0,2 C 4,0 6,-6 0,-14 Z" fill="#ef4444" />
        <path d="M 0,-10 C -3,-5 -2,0 0,1 C 2,0 3,-5 0,-10 Z" fill="#fbbf24" />

        <!-- 5-Point Star at Top -->
        <polygon points="0,-27 2,-21 8,-21 3,-17 5,-11 0,-14 -5,-11 -3,-17 -8,-21 -2,-21" fill="#ffd700" />
      </g>
    `;
  },

  /**
   * 6. Student Honor Medal Ribbon Badge (មេដាយកិត្តិយសសិស្សពូកែ)
   */
  createHonorMedal(x = 0, y = 0, scale = 1, text = '១០/១០') {
    return `
      <g transform="translate(${x}, ${y}) scale(${scale})" filter="url(#soft-shadow)">
        <!-- National Ribbon Tails -->
        <path d="M -14,10 L -22,42 L -12,36 L -2,42 L -6,10 Z" fill="#ce1126" stroke="#002b7f" stroke-width="1" />
        <path d="M 14,10 L 22,42 L 12,36 L 2,42 L 6,10 Z" fill="#002b7f" stroke="#ce1126" stroke-width="1" />

        <!-- Golden Medal Coin -->
        <circle cx="0" cy="0" r="22" fill="url(#khmer-gold-grad)" stroke="#b45309" stroke-width="2" />
        <circle cx="0" cy="0" r="18" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="2,2" />

        <!-- Text or Star in Center -->
        <text x="0" y="5" font-family="'Koulen', 'Moul', sans-serif" font-size="11" font-weight="bold" fill="#78350f" text-anchor="middle">
          ${text}
        </text>
      </g>
    `;
  },

  /**
   * 7. Procedural Ruled Student Notebook Garo Grid (ក្រឡាហ្គារ៉ូសៀវភៅ)
   */
  createNotebookGaroDefs(id = 'khmer-garo-pattern', gridColor = '#93c5fd', opacity = 0.45) {
    return `
      <pattern id="${id}" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#ffffff" />
        <!-- Horizontal ruled lines -->
        <line x1="0" y1="20" x2="20" y2="20" stroke="${gridColor}" stroke-width="0.8" opacity="${opacity}" />
        <!-- Vertical ruled lines (garo squares) -->
        <line x1="20" y1="0" x2="20" y2="20" stroke="${gridColor}" stroke-width="0.8" opacity="${opacity}" />
        <!-- Subtle subgrid dots -->
        <circle cx="10" cy="10" r="0.6" fill="${gridColor}" opacity="${opacity * 0.8}" />
      </pattern>
    `;
  },

  /**
   * 8. Washi Tape Sticker (ស្ទីគ័រម៉ូតស្កុតបិទក្បូរក្បាច់)
   */
  createWashiTape(x, y, w, h, fill = '#f59e0b', angle = -3) {
    return `
      <g transform="translate(${x}, ${y}) rotate(${angle})">
        <!-- Jagged Cut Ends -->
        <polygon points="0,0 ${w},0 ${w - 5},${h * 0.3} ${w},${h * 0.7} ${w - 4},${h} 0,${h} 4,${h * 0.7} 0,${h * 0.3}" 
                 fill="${fill}" opacity="0.9" filter="url(#soft-shadow)" />
        <line x1="4" y1="2" x2="${w - 4}" y2="2" stroke="#ffffff" stroke-width="1" opacity="0.4" stroke-dasharray="4,3" />
      </g>
    `;
  },

  /**
   * 9. Decorative Ribbon Banner for Titles (បូពុម្ពអក្សរ)
   */
  createRibbonBanner(cx, cy, width = 360, height = 48, fill = '#1e40af', foldColor = '#0f172a') {
    const halfW = width / 2;
    const bannerH = height;
    const tailW = 32;
    return `
      <g transform="translate(${cx}, ${cy})" filter="url(#card-shadow)">
        <!-- Left Banner Tail Fold -->
        <polygon points="${-halfW},${bannerH * 0.5} ${-halfW - tailW},${bannerH * 0.1} ${-halfW - tailW + 12},${bannerH * 0.6} ${-halfW - tailW},${bannerH * 1.1} ${-halfW},${bannerH * 0.7}" 
                 fill="${fill}" opacity="0.9" />
        <polygon points="${-halfW},${bannerH * 0.5} ${-halfW},${bannerH * 0.7} ${-halfW + 10},${bannerH * 0.7}" 
                 fill="${foldColor}" />

        <!-- Right Banner Tail Fold -->
        <polygon points="${halfW},${bannerH * 0.5} ${halfW + tailW},${bannerH * 0.1} ${halfW + tailW - 12},${bannerH * 0.6} ${halfW + tailW},${bannerH * 1.1} ${halfW},${bannerH * 0.7}" 
                 fill="${fill}" opacity="0.9" />
        <polygon points="${halfW},${bannerH * 0.5} ${halfW},${bannerH * 0.7} ${halfW - 10},${bannerH * 0.7}" 
                 fill="${foldColor}" />

        <!-- Main Banner Center Box -->
        <rect x="${-halfW}" y="0" width="${width}" height="${bannerH}" rx="6" 
              fill="${fill}" stroke="#ffd700" stroke-width="1.8" />
        <rect x="${-halfW + 4}" y="3" width="${width - 8}" height="${bannerH - 6}" rx="4" 
              fill="none" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="6,4" opacity="0.6" />
      </g>
    `;
  }
};

