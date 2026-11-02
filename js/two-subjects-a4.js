/**
 * Khmer A4 Print Studio Engine (ប្លង់បោះពុម្ពលើក្រដាស A4)
 * Supports:
 * 1. ☀️ បោះពុម្ពទាំង ១២ មុខវិជ្ជា (៦ សន្លឹក A4 - ២ ក្របក្នុង ១ សន្លឹក Landscape)
 * 2. 📄 ជ្រើសរើស ២ មុខវិជ្ជាផ្ទាល់ខ្លួន (១ សន្លឹក A4 - ២ ក្រប)
 * 3. 👨‍🏫 បោះពុម្ពតាមបញ្ជីឈ្មោះសិស្ស (២ ក្របក្នុង ១ សន្លឹក)
 * 4. 📘 បោះពុម្ពមុខវិជ្ជាបច្ចុប្បន្ន (១ សន្លឹក A4 - ២ ក្របដូចគ្នា)
 * Features:
 * - 300 DPI Ultra-HD Image Export (PNG/JPG)
 * - Pure Vector Browser Printing (Landscape A4 with center cut guide ✂️)
 * - Configurable Margins (Standard 8mm, Borderless 0mm, Narrow 4mm, Wide 15mm)
 */

const TwoSubjectsA4Manager = {
  // 6 standard sheets pairing all 12 primary subjects
  SHEETS_12_SUBJECTS: [
    { sheetNum: 1, sub1: 'khmer', sub2: 'dictation', title: 'ភាសាខ្មែរ + សរសេរតាមអាន' },
    { sheetNum: 2, sub1: 'math', sub2: 'composition', title: 'គណិតវិទ្យា + តែងសេចក្ដី' },
    { sheetNum: 3, sub1: 'science', sub2: 'social', title: 'វិទ្យាសាស្ត្រ + សិក្សាសង្គម' },
    { sheetNum: 4, sub1: 'english', sub2: 'art', title: 'ភាសាអង់គ្លេស + គំនូរ & សិល្បៈ' },
    { sheetNum: 5, sub1: 'civics', sub2: 'homework', title: 'សីលធម៌ & ពលរដ្ឋ + កិច្ចការផ្ទះ' },
    { sheetNum: 6, sub1: 'ict', sub2: 'sport', title: 'ព័ត៌មានវិទ្យា + អប់រំកាយ & កីឡា' }
  ],

  COMMON_PAIRS: [
    { id: 'khmer-dict', name: 'ភាសាខ្មែរ + សរសេរតាមអាន', sub1: 'khmer', sub2: 'dictation' },
    { id: 'math-comp', name: 'គណិតវិទ្យា + តែងសេចក្ដី', sub1: 'math', sub2: 'composition' },
    { id: 'sci-soc', name: 'វិទ្យាសាស្ត្រ + សិក្សាសង្គម', sub1: 'science', sub2: 'social' },
    { id: 'eng-art', name: 'ភាសាអង់គ្លេស + គំនូរ & សិល្បៈ', sub1: 'english', sub2: 'art' },
    { id: 'civ-hw', name: 'សីលធម៌ + កិច្ចការផ្ទះ', sub1: 'civics', sub2: 'homework' },
    { id: 'it-sport', name: 'ព័ត៌មានវិទ្យា + កីឡា', sub1: 'ict', sub2: 'sport' }
  ],

  createSubjectState(baseState, subjectId, customSubjectText = null) {
    const state = JSON.parse(JSON.stringify(baseState));
    const allSubjects = typeof SubjectPresetsManager !== 'undefined' ? SubjectPresetsManager.getAll() : [];
    const preset = allSubjects.find(s => s.id === subjectId) || allSubjects[0];

    if (!preset) return state;

    state.presetId = preset.id;
    if (preset.frameStyle) state.frameStyle = preset.frameStyle;
    if (preset.bgGradient) state.bgGradient = preset.bgGradient;

    if (preset.defaultColors) {
      if (preset.defaultColors.schoolName && state.layers.schoolName) {
        state.layers.schoolName.fill = preset.defaultColors.schoolName;
      }
      if (preset.defaultColors.grade && state.layers.grade) {
        state.layers.grade.fill = preset.defaultColors.grade;
      }
      if (preset.defaultColors.subject && state.layers.subject) {
        state.layers.subject.fill = preset.defaultColors.subject;
        state.layers.subject.fillColor2 = preset.themeColor || preset.defaultColors.subject;
      }
      if (preset.defaultColors.name && state.layers.studentName) {
        state.layers.studentName.fill = preset.defaultColors.name;
      }
      if (preset.defaultColors.year && state.layers.academicYear) {
        state.layers.academicYear.fill = preset.defaultColors.year;
      }
    }

    if (preset.defaultFonts) {
      if (preset.defaultFonts.schoolName && state.layers.schoolName) {
        state.layers.schoolName.fontFamily = preset.defaultFonts.schoolName;
      }
      if (preset.defaultFonts.grade && state.layers.grade) {
        state.layers.grade.fontFamily = preset.defaultFonts.grade;
      }
      if (preset.defaultFonts.subject && state.layers.subject) {
        state.layers.subject.fontFamily = preset.defaultFonts.subject;
      }
      if (preset.defaultFonts.name && state.layers.studentName) {
        state.layers.studentName.fontFamily = preset.defaultFonts.name;
      }
      if (preset.defaultFonts.year && state.layers.academicYear) {
        state.layers.academicYear.fontFamily = preset.defaultFonts.year;
      }
    }

    if (state.layers.subject) {
      state.layers.subject.text = customSubjectText || `សៀវភៅ ៖ ${preset.name}`;
      if (state.layers.subject.depth3D > 0 && preset.themeColor) {
        state.layers.subject.extrusionColor = this.shadeColor(preset.themeColor, -40);
      }
    }

    return state;
  },

  renderCoverWithPrefix(state, prefix = 'c1') {
    const dummy = document.createElement('div');
    const tempEngine = new BookCoverCanvasEngine(dummy);
    tempEngine.state = state;
    tempEngine.selectedLayerId = null;
    tempEngine.render();

    let defsHtml = tempEngine.defsG.innerHTML;
    let bgHtml = tempEngine.bgG.innerHTML;
    let frameHtml = tempEngine.frameG.innerHTML;
    let headerHtml = tempEngine.headerG.innerHTML;
    let decorsHtml = tempEngine.decorsG.innerHTML;
    let photoHtml = tempEngine.photoG.innerHTML;
    let badgesHtml = tempEngine.badgesG.innerHTML;
    let textHtml = tempEngine.textLayersG.innerHTML;

    let combined = `
      <g id="cover-bg-${prefix}">${bgHtml}</g>
      <g id="cover-frame-${prefix}">${frameHtml}</g>
      <g id="cover-header-${prefix}">${headerHtml}</g>
      <g id="cover-decors-${prefix}">${decorsHtml}</g>
      <g id="cover-photo-${prefix}">${photoHtml}</g>
      <g id="cover-badges-${prefix}">${badgesHtml}</g>
      <g id="cover-text-${prefix}">${textHtml}</g>
    `;

    defsHtml = defsHtml.replace(/id="([a-zA-Z0-9_\-]+)"/g, `id="$1_${prefix}"`);
    defsHtml = defsHtml.replace(/url\(#([a-zA-Z0-9_\-]+)\)/g, `url(#$1_${prefix})`);
    defsHtml = defsHtml.replace(/href="#([a-zA-Z0-9_\-]+)"/g, `href="#$1_${prefix}"`);

    combined = combined.replace(/id="([a-zA-Z0-9_\-]+)"/g, `id="$1_${prefix}"`);
    combined = combined.replace(/url\(#([a-zA-Z0-9_\-]+)\)/g, `url(#$1_${prefix})`);
    combined = combined.replace(/href="#([a-zA-Z0-9_\-]+)"/g, `href="#$1_${prefix}"`);

    return {
      defs: defsHtml,
      body: combined,
      width: 600,
      height: 850
    };
  },

  /**
   * Generate A4 SVG String in exact Landscape 2-in-1 layout (matching user's studio screenshot)
   */
  generateA4SvgString(engine, options = {}) {
    const sub1Id = options.sub1Id || 'khmer';
    const sub2Id = options.sub2Id || 'dictation';
    const sub1Text = options.sub1Text || null;
    const sub2Text = options.sub2Text || null;
    const marginMm = typeof options.margin === 'number' ? options.margin : (parseInt(options.margin) || 8);
    const showCutLine = options.showCutLine !== false;

    // ISO A4 Landscape dimensions: 1754 x 1240 (proportional to 297mm x 210mm)
    const a4W = 1754;
    const a4H = 1240;

    // Margin factor in SVG pixels (approx 1mm ~ 5.9px at 1754/297)
    const pxPerMm = a4W / 297.0; // ~ 5.905
    const marginPx = Math.round(marginMm * pxPerMm);

    // Each half sheet width: 1754 / 2 = 877
    const halfW = a4W / 2; // 877
    const halfH = a4H;     // 1240

    // Available size for cover inside each half
    const availW = halfW - marginPx * 2;
    const availH = halfH - marginPx * 2;

    // Fit cover (600x850) inside availW x availH
    // Safe scaling ensures nothing gets clipped at top, bottom, or edges
    const scale = Math.min(availW / 600, availH / 850) * 0.92;
    const coverW = 600 * scale;
    const coverH = 850 * scale;

    // Center cover 1 in left half
    const x1 = Math.round((halfW - coverW) / 2);
    const y1 = Math.round((halfH - coverH) / 2);

    // Center cover 2 in right half
    const x2 = Math.round(halfW + (halfW - coverW) / 2);
    const y2 = y1;

    // Prepare states
    let state1, state2;
    if (options.customState1 && options.customState2) {
      state1 = options.customState1;
      state2 = options.customState2;
    } else {
      state1 = this.createSubjectState(engine.state, sub1Id, sub1Text);
      state2 = this.createSubjectState(engine.state, sub2Id, sub2Text);
    }

    if (options.studentName) {
      if (state1.layers.studentName) state1.layers.studentName.text = options.studentName;
      if (state2.layers.studentName) state2.layers.studentName.text = options.studentName;
    }
    if (options.grade) {
      if (state1.layers.grade) state1.layers.grade.text = options.grade;
      if (state2.layers.grade) state2.layers.grade.text = options.grade;
    }

    const c1 = this.renderCoverWithPrefix(state1, 'c1');
    const c2 = this.renderCoverWithPrefix(state2, 'c2');

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${a4W} ${a4H}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
           style="background: #ffffff; display: block; width: 100%; height: 100%; font-feature-settings: 'kern' 1, 'liga' 1;">
        <defs>
          <style>
            text, textPath {
              font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "clig" 1;
              text-rendering: geometricPrecision;
              -webkit-font-smoothing: antialiased;
            }
          </style>
          ${c1.defs}
          ${c2.defs}
        </defs>

        <!-- Pure White A4 Canvas Sheet -->
        <rect width="${a4W}" height="${a4H}" fill="#ffffff" />

        <!-- Left Slot Cover -->
        <g id="a4-slot-left" transform="translate(${x1}, ${y1}) scale(${scale})">
          ${c1.body}
        </g>

        <!-- Middle Vertical Scissor Cut Guide Line (Red Dashed) -->
        ${showCutLine ? `
          <g id="a4-cut-guide-vertical" transform="translate(${halfW}, 0)">
            <line x1="0" y1="20" x2="0" y2="${a4H - 20}" stroke="#ef4444" stroke-width="2" stroke-dasharray="10,8" opacity="0.85" />
            <g transform="translate(0, ${a4H / 2}) rotate(-90)">
              <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
              <text x="0" y="5" font-size="14" text-anchor="middle">✂️</text>
            </g>
          </g>
        ` : ''}

        <!-- Right Slot Cover -->
        <g id="a4-slot-right" transform="translate(${x2}, ${y2}) scale(${scale})">
          ${c2.body}
        </g>
      </svg>
    `;
  },

  /**
   * Export Master A4 sheet as High-Resolution Image (300 DPI PNG / JPG)
   */
  async exportA4ImageBlob(engine, options = {}, format = 'png', scale = 2) {
    const svgXml = this.generateA4SvgString(engine, options);
    const canvasW = Math.round(1754 * scale); // 3508px (Exact A4 Landscape 300DPI)
    const canvasH = Math.round(1240 * scale); // 2480px

    const canvas = document.createElement('canvas');
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasW, canvasH);

    const svgBlob = new Blob([svgXml], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(svgBlob);
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasW, canvasH);
        URL.revokeObjectURL(blobUrl);

        const mime = format === 'jpeg' || format === 'jpg' ? 'image/jpeg' : 'image/png';
        const quality = mime === 'image/jpeg' ? 0.96 : 1.0;

        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to generate image blob'));
        }, mime, quality);
      };
      img.onerror = (e) => {
        URL.revokeObjectURL(blobUrl);
        reject(new Error('Failed to render SVG onto canvas: ' + e.message));
      };
      img.src = blobUrl;
    });
  },

  async downloadA4Image(engine, options = {}, format = 'png') {
    const blob = await this.exportA4ImageBlob(engine, options, format, 2);
    const url = URL.createObjectURL(blob);
    const title = (options.title || 'A4-Sheet').replace(/[^a-zA-Z0-9_ក-៿\-]/g, '_');
    const ext = format === 'jpeg' || format === 'jpg' ? 'jpg' : 'png';

    const a = document.createElement('a');
    a.href = url;
    a.download = `Khmer-Book-Cover-A4-${title}-${Date.now()}.${ext}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  /**
   * Execute physical printing across all sheets or single sheet
   */
  executePrint(engine, options = {}) {
    const printRoot = document.getElementById('print-sandbox-root');
    if (!printRoot) return;

    const mode = options.mode || 'all-12';
    const marginMm = options.margin || 8;
    const showCutLine = options.showCutLine !== false;

    let sheetsHtml = '';

    if (mode === 'all-12') {
      // Generate all 6 Landscape sheets
      this.SHEETS_12_SUBJECTS.forEach((sh) => {
        const svgStr = this.generateA4SvgString(engine, {
          sub1Id: sh.sub1,
          sub2Id: sh.sub2,
          margin: marginMm,
          showCutLine: showCutLine
        });
        sheetsHtml += `
          <div class="print-page-sheet-landscape">
            ${svgStr}
          </div>
        `;
      });
    } else if (mode === 'custom-2') {
      // 1 sheet with 2 custom subjects
      const svgStr = this.generateA4SvgString(engine, {
        sub1Id: options.sub1Id || 'khmer',
        sub2Id: options.sub2Id || 'math',
        sub1Text: options.sub1Text,
        sub2Text: options.sub2Text,
        margin: marginMm,
        showCutLine: showCutLine
      });
      sheetsHtml = `
        <div class="print-page-sheet-landscape">
          ${svgStr}
        </div>
      `;
    } else if (mode === 'current-single') {
      // Duplicate current cover
      const stateClone = JSON.parse(JSON.stringify(engine.state));
      const svgStr = this.generateA4SvgString(engine, {
        customState1: stateClone,
        customState2: stateClone,
        margin: marginMm,
        showCutLine: showCutLine
      });
      sheetsHtml = `
        <div class="print-page-sheet-landscape">
          ${svgStr}
        </div>
      `;
    } else if (mode === 'students-batch') {
      // Students batch: 2 students per sheet
      const list = options.studentsList && options.studentsList.length > 0
        ? options.studentsList
        : (typeof DEFAULT_KHMER_CLASS_ROSTER !== 'undefined' ? DEFAULT_KHMER_CLASS_ROSTER : []);
      
      const baseState = JSON.parse(JSON.stringify(engine.state));

      for (let i = 0; i < list.length; i += 2) {
        const st1 = list[i];
        const st2 = list[i + 1] || null;

        const s1State = JSON.parse(JSON.stringify(baseState));
        s1State.layers.studentName.text = st1.studentName;
        if (st1.studentInfoExtra) s1State.layers.studentInfoExtra.text = st1.studentInfoExtra;

        let s2State = JSON.parse(JSON.stringify(baseState));
        if (st2) {
          s2State.layers.studentName.text = st2.studentName;
          if (st2.studentInfoExtra) s2State.layers.studentInfoExtra.text = st2.studentInfoExtra;
        }

        const svgStr = this.generateA4SvgString(engine, {
          customState1: s1State,
          customState2: s2State,
          margin: marginMm,
          showCutLine: showCutLine
        });

        sheetsHtml += `
          <div class="print-page-sheet-landscape">
            ${svgStr}
          </div>
        `;
      }
    }

    printRoot.innerHTML = sheetsHtml;

    setTimeout(() => {
      window.print();
    }, 400);
  },

  shadeColor(color, percent) {
    if (!color || !color.startsWith('#')) return '#1e293b';
    let num = parseInt(color.slice(1), 16);
    if (isNaN(num)) return '#1e293b';
    let r = (num >> 16) + percent;
    let b = ((num >> 8) & 0x00FF) + percent;
    let g = (num & 0x0000FF) + percent;
    return '#' + (0x1000000 +
      (r < 255 ? (r < 1 ? 0 : r) : 255) * 0x10000 +
      (b < 255 ? (b < 1 ? 0 : b) : 255) * 0x100 +
      (g < 255 ? (g < 1 ? 0 : g) : 255)
    ).toString(16).slice(1);
  }
};