/**
 * Modern High-Precision SVG & Canvas Engine for Khmer Book Cover Studio
 * Supports Front Cover, Back Cover, Full Wraparound Book Cover, Interactive Drag & Drop,
 * Curved Text with SVG textPath, 3D Typography, and 300 DPI Ultra-HD Export.
 */

class BookCoverCanvasEngine {
  constructor(containerOrId) {
    this.container = typeof containerOrId === 'string'
      ? document.getElementById(containerOrId)
      : (containerOrId || document.createElement('div'));
    this.width = 600;
    this.height = 850;
    this.scale = 1;
    this.zoom = 1;

    // View mode: 'front', 'back', 'wraparound'
    this.viewMode = 'front';

    // Interactive State
    this.selectedLayerId = 'schoolName';
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.layerStart = { x: 0, y: 0 };

    // Undo / Redo History Stacks
    this.history = [];
    this.redoStack = [];
    this.isHistoryLocked = false;

    // Master Engine State
    this.state = {
      presetId: 'khmer',
      frameStyle: 'cartoon-kids',
      bgColor: '#ffffff',
      bgGradient: 'linear-gradient(135deg, #f0f7ff 0%, #e1effe 100%)',
      showInnerCard: true,
      innerCardBg: '#ffffea',
      innerCardBorderColor: '#c5a059',
      innerCardRadius: 18,
      innerCardShadow: true,

      // Official National Khmer Header
      nationalHeader: {
        visible: true,
        title: 'ព្រះរាជាណាចក្រកម្ពុជា',
        motto: 'ជាតិ  សាសនា  ព្រះមហាក្សត្រ',
        fontFamily: 'Moul',
        color: '#1a365d',
        accentColor: '#b45309',
        fontSize: 16,
        y: 85
      },

      // Custom Frame Upload
      customFrame: {
        src: null,
        opacity: 1,
        visible: false
      },

      // Student Photo / Avatar
      studentPhoto: {
        visible: false,
        src: null,
        shape: 'circle', // 'circle', 'square', 'lotus', 'shield'
        x: 300,
        y: 690,
        size: 80,
        borderColor: '#ffd700',
        borderWidth: 3
      },

      // Badges & Emblems
      badgeSticker: {
        visible: true,
        type: 'moeys', // 'moeys', 'medal-10', 'lotus', 'angkor'
        x: 520,
        y: 110,
        scale: 0.85
      },

      // QR Code
      qrCode: {
        visible: false,
        data: 'https://moeys.gov.kh',
        x: 85,
        y: 720,
        size: 70
      },

      // Text Layers
      layers: {
        schoolName: {
          id: 'schoolName',
          label: 'ឈ្មោះសាលារៀន (School Name)',
          text: 'សាលាបឋមសិក្សាកោះថ្ម',
          x: 300,
          y: 195,
          fontSize: 37,
          fontFamily: 'Moul',
          fill: '#0d47a1',
          gradientFill: true,
          fillColor2: '#1976d2',
          stroke: '#ffffff',
          strokeWidth: 4,
          glowColor: '#ffeb3b',
          glowBlur: 6,
          isCurved: true,
          curvature: 13,
          letterSpacing: 0,
          hasRibbon: false,
          visible: true
        },
        grade: {
          id: 'grade',
          label: 'ថ្នាក់ទី / បន្ទប់ (Grade / Class)',
          text: 'ថ្នាក់ទី ៖ ២(ក)',
          x: 300,
          y: 285,
          fontSize: 30,
          fontFamily: 'Koulen',
          fill: '#d84315',
          gradientFill: true,
          fillColor2: '#f4511e',
          stroke: '#ffffff',
          strokeWidth: 4,
          glowColor: '#ffccbc',
          glowBlur: 4,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          hasRibbon: false,
          visible: true
        },
        subject: {
          id: 'subject',
          label: 'មុខវិជ្ជា (Subject / Book)',
          text: 'សៀវភៅ ៖ ភាសាខ្មែរ',
          x: 300,
          y: 390,
          fontSize: 36,
          fontFamily: 'Moul',
          fill: '#ffd700',
          gradientFill: true,
          fillColor2: '#b45309',
          stroke: '#ffffff',
          strokeWidth: 4,
          glowColor: '#ca8a04',
          glowBlur: 5,
          style3D: 'royal-gold-3d',
          depth3D: 5,
          extrusionColor: '#78350f',
          direction3D: 'bottom-right',
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          hasRibbon: false,
          visible: true
        },
        studentName: {
          id: 'studentName',
          label: 'ឈ្មោះសិស្ស (Student Name)',
          text: 'ឈ្មោះ ៖ រស់ សុវណ្ណរចនា',
          x: 300,
          y: 505,
          fontSize: 32,
          fontFamily: 'Koulen',
          fill: '#2e7d32',
          gradientFill: true,
          fillColor2: '#43a047',
          stroke: '#ffffff',
          strokeWidth: 4,
          glowColor: '#c8e6c9',
          glowBlur: 4,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          hasRibbon: false,
          visible: true
        },
        studentInfoExtra: {
          id: 'studentInfoExtra',
          label: 'ភេទ / អត្តលេខ (Gender / ID)',
          text: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០២៤',
          x: 300,
          y: 560,
          fontSize: 22,
          fontFamily: 'Koulen',
          fill: '#00838f',
          gradientFill: false,
          fillColor2: '#00acc1',
          stroke: '#ffffff',
          strokeWidth: 3,
          glowColor: '',
          glowBlur: 0,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          hasRibbon: false,
          visible: true
        },
        teacherName: {
          id: 'teacherName',
          label: 'ឈ្មោះគ្រូបង្រៀន (Teacher Name)',
          text: 'បង្រៀនដោយ ៖ អ្នកគ្រូ កែវ ស៊ីណាត',
          x: 300,
          y: 615,
          fontSize: 24,
          fontFamily: 'Koulen',
          fill: '#6a1b9a',
          gradientFill: false,
          fillColor2: '#8e24aa',
          stroke: '#ffffff',
          strokeWidth: 3,
          glowColor: '',
          glowBlur: 0,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          hasRibbon: false,
          visible: true
        },
        academicYear: {
          id: 'academicYear',
          label: 'ឆ្នាំសិក្សា (Academic Year)',
          text: 'ឆ្នាំសិក្សា ៖ ២០២៦ - ២០២៧',
          x: 300,
          y: 715,
          fontSize: 24,
          fontFamily: 'Koulen',
          fill: '#283593',
          gradientFill: false,
          fillColor2: '#3949ab',
          stroke: '#ffffff',
          strokeWidth: 3,
          glowColor: '',
          glowBlur: 0,
          isCurved: false,
          curvature: 0,
          letterSpacing: 0,
          hasRibbon: false,
          visible: true
        }
      },

      // Back Cover Settings
      backCover: {
        presetId: 'multiplication-table',
        bgColor: '#ffffff',
        showFrame: true
      },

      // Wraparound Book Spine Settings
      spine: {
        width: 40,
        text: 'សៀវភៅសិស្សបឋមសិក្សា',
        color: '#1565c0',
        textColor: '#ffffff'
      }
    };

    this.init();
  }

  init() {
    this.createDomStructure();
    this.setupInteractions();
    this.recordHistory();
    this.render();
  }

  createDomStructure() {
    this.container.innerHTML = `
      <div class="canvas-workspace-viewport" id="canvas-viewport">
        <div class="canvas-scaler-wrapper" id="canvas-scaler" style="transform-origin: center center; transition: transform 0.15s ease-out;">
          <svg id="bookcover-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
               viewBox="0 0 ${this.width} ${this.height}" 
               width="${this.width}" height="${this.height}"
               style="background: #ffffff; box-shadow: 0 16px 48px rgba(0,0,0,0.22); border-radius: 8px; user-select: none; display: block;">
            <defs id="svg-defs"></defs>
            <g id="svg-background"></g>
            <g id="svg-frame"></g>
            <g id="svg-national-header"></g>
            <g id="svg-decorations"></g>
            <g id="svg-photo"></g>
            <g id="svg-badges"></g>
            <g id="svg-text-layers"></g>
            <g id="svg-back-cover" style="display: none;"></g>
            <g id="svg-spine" style="display: none;"></g>
            <g id="svg-selection-overlay"></g>
          </svg>
        </div>
      </div>
    `;

    this.svgElement = this.container.querySelector('#bookcover-svg');
    this.scalerElement = this.container.querySelector('#canvas-scaler');
    this.defsG = this.container.querySelector('#svg-defs');
    this.bgG = this.container.querySelector('#svg-background');
    this.frameG = this.container.querySelector('#svg-frame');
    this.headerG = this.container.querySelector('#svg-national-header');
    this.decorsG = this.container.querySelector('#svg-decorations');
    this.photoG = this.container.querySelector('#svg-photo');
    this.badgesG = this.container.querySelector('#svg-badges');
    this.textLayersG = this.container.querySelector('#svg-text-layers');
    this.backCoverG = this.container.querySelector('#svg-back-cover');
    this.spineG = this.container.querySelector('#svg-spine');
    this.selectionG = this.container.querySelector('#svg-selection-overlay');
  }

  setupInteractions() {
    // Mouse down for layer dragging & selection on canvas
    this.svgElement.addEventListener('mousedown', (e) => this.handlePointerDown(e));
    window.addEventListener('mousemove', (e) => this.handlePointerMove(e));
    window.addEventListener('mouseup', () => this.handlePointerUp());

    // Touch support for tablets / phones
    this.svgElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.handlePointerDown(e.touches[0]);
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        this.handlePointerMove(e.touches[0]);
        e.preventDefault();
      }
    }, { passive: false });

    window.addEventListener('touchend', () => this.handlePointerUp());
  }

  getSVGCoordinates(e) {
    const rect = this.svgElement.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const x = ((clientX - rect.left) / rect.width) * this.width;
    const y = ((clientY - rect.top) / rect.height) * this.height;
    return { x, y };
  }

  handlePointerDown(e) {
    const coords = this.getSVGCoordinates(e);

    // Check hit on photo
    if (this.state.studentPhoto.visible) {
      const p = this.state.studentPhoto;
      const dist = Math.hypot(coords.x - p.x, coords.y - p.y);
      if (dist <= p.size) {
        this.selectedLayerId = 'studentPhoto';
        this.isDragging = true;
        this.dragStart = { x: coords.x, y: coords.y };
        this.layerStart = { x: p.x, y: p.y };
        this.render();
        if (this.onLayerSelect) this.onLayerSelect('studentPhoto');
        return;
      }
    }

    // Check hit on badge
    if (this.state.badgeSticker.visible) {
      const b = this.state.badgeSticker;
      const dist = Math.hypot(coords.x - b.x, coords.y - b.y);
      if (dist <= 45) {
        this.selectedLayerId = 'badgeSticker';
        this.isDragging = true;
        this.dragStart = { x: coords.x, y: coords.y };
        this.layerStart = { x: b.x, y: b.y };
        this.render();
        if (this.onLayerSelect) this.onLayerSelect('badgeSticker');
        return;
      }
    }

    // Check hit on text layers
    let hitLayer = null;
    let minDist = Infinity;

    for (const [key, layer] of Object.entries(this.state.layers)) {
      if (!layer.visible) continue;
      const dy = Math.abs(coords.y - layer.y);
      const dx = Math.abs(coords.x - layer.x);
      const estWidth = (layer.text.length * layer.fontSize * 0.6) / 2 + 30;

      if (dy < layer.fontSize * 1.2 && dx < estWidth) {
        if (dy < minDist) {
          minDist = dy;
          hitLayer = layer;
        }
      }
    }

    if (hitLayer) {
      this.selectedLayerId = hitLayer.id;
      this.isDragging = true;
      this.dragStart = { x: coords.x, y: coords.y };
      this.layerStart = { x: hitLayer.x, y: hitLayer.y };
      this.render();
      if (this.onLayerSelect) this.onLayerSelect(hitLayer.id);
    } else {
      this.selectedLayerId = null;
      this.render();
      if (this.onLayerSelect) this.onLayerSelect(null);
    }
  }

  handlePointerMove(e) {
    if (!this.isDragging || !this.selectedLayerId) return;
    const coords = this.getSVGCoordinates(e);
    const dx = coords.x - this.dragStart.x;
    const dy = coords.y - this.dragStart.y;

    if (this.selectedLayerId === 'studentPhoto') {
      this.state.studentPhoto.x = Math.round(this.layerStart.x + dx);
      this.state.studentPhoto.y = Math.round(this.layerStart.y + dy);
      this.render();
      return;
    }

    if (this.selectedLayerId === 'badgeSticker') {
      this.state.badgeSticker.x = Math.round(this.layerStart.x + dx);
      this.state.badgeSticker.y = Math.round(this.layerStart.y + dy);
      this.render();
      return;
    }

    const layer = this.state.layers[this.selectedLayerId];
    if (layer) {
      let targetX = Math.round(this.layerStart.x + dx);
      let targetY = Math.round(this.layerStart.y + dy);

      // Snapping to Center X (300)
      if (Math.abs(targetX - this.width / 2) < 8) {
        targetX = this.width / 2;
      }

      layer.x = targetX;
      layer.y = targetY;
      this.render();
    }
  }

  handlePointerUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.recordHistory();
      if (this.onLayerChange) this.onLayerChange(this.selectedLayerId);
    }
  }

  // Set View Mode ('front', 'back', 'wraparound')
  setViewMode(mode) {
    this.viewMode = mode;
    if (mode === 'wraparound') {
      this.width = 1240;
      this.height = 850;
    } else {
      this.width = 600;
      this.height = 850;
    }
    this.svgElement.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svgElement.setAttribute('width', this.width);
    this.svgElement.setAttribute('height', this.height);
    this.render();
  }

  // Set Zoom Level
  setZoom(val) {
    this.zoom = val;
    this.scalerElement.style.transform = `scale(${val})`;
  }

  // Subject Preset Change
  setSubjectPreset(presetId) {
    const list = SubjectPresetsManager.getAll();
    const preset = list.find(p => p.id === presetId);
    if (!preset) return;

    this.state.presetId = preset.id;
    this.state.frameStyle = preset.frameStyle || 'royal-kbach';
    this.state.bgGradient = preset.bgGradient || 'linear-gradient(135deg, #f0f7ff 0%, #e1effe 100%)';

    // Apply colors
    if (preset.defaultColors) {
      if (preset.defaultColors.schoolName) this.state.layers.schoolName.fill = preset.defaultColors.schoolName;
      if (preset.defaultColors.grade) this.state.layers.grade.fill = preset.defaultColors.grade;
      if (preset.defaultColors.subject) this.state.layers.subject.fill = preset.defaultColors.subject;
      if (preset.defaultColors.name) this.state.layers.studentName.fill = preset.defaultColors.name;
      if (preset.defaultColors.year) this.state.layers.academicYear.fill = preset.defaultColors.year;
    }

    // Set Subject Layer Text
    this.state.layers.subject.text = `សៀវភៅ ៖ ${preset.name}`;

    this.recordHistory();
    this.render();
  }

  // Frame Style Change
  setFrameStyle(frameId) {
    this.state.frameStyle = frameId;
    this.recordHistory();
    this.render();
  }

  // History Undo / Redo
  recordHistory() {
    if (this.isHistoryLocked) return;
    const snap = JSON.stringify(this.state);
    if (this.history.length > 0 && this.history[this.history.length - 1] === snap) return;
    this.history.push(snap);
    if (this.history.length > 40) this.history.shift();
    this.redoStack = [];
    if (this.onHistoryChange) this.onHistoryChange(this.canUndo(), this.canRedo());
  }

  undo() {
    if (this.history.length <= 1) return;
    this.isHistoryLocked = true;
    const current = this.history.pop();
    this.redoStack.push(current);
    const prev = this.history[this.history.length - 1];
    this.state = JSON.parse(prev);
    this.isHistoryLocked = false;
    this.render();
    if (this.onHistoryChange) this.onHistoryChange(this.canUndo(), this.canRedo());
  }

  redo() {
    if (this.redoStack.length === 0) return;
    this.isHistoryLocked = true;
    const next = this.redoStack.pop();
    this.history.push(next);
    this.state = JSON.parse(next);
    this.isHistoryLocked = false;
    this.render();
    if (this.onHistoryChange) this.onHistoryChange(this.canUndo(), this.canRedo());
  }

  canUndo() { return this.history.length > 1; }
  canRedo() { return this.redoStack.length > 0; }

  // Master Render Loop
  render() {
    this.renderDefs();
    this.renderBackground();

    if (this.viewMode === 'back') {
      this.frameG.innerHTML = '';
      this.headerG.innerHTML = '';
      this.decorsG.innerHTML = '';
      this.photoG.innerHTML = '';
      this.badgesG.innerHTML = '';
      this.textLayersG.innerHTML = '';
      this.spineG.style.display = 'none';
      this.backCoverG.style.display = 'block';
      this.renderBackCover(0, 0, this.width, this.height);
      this.selectionG.innerHTML = '';
      return;
    }

    if (this.viewMode === 'wraparound') {
      // Wraparound mode: Back Cover on left (0 to 600), Spine in center (600 to 640), Front Cover on right (640 to 1240)
      this.backCoverG.style.display = 'block';
      this.spineG.style.display = 'block';
      this.renderBackCover(0, 0, 600, 850);
      this.renderSpine(600, 0, 40, 850);
      this.renderFrontCover(640, 0, 600, 850);
      this.renderSelectionOverlay(640, 0);
      return;
    }

    // Default: 'front' mode
    this.backCoverG.style.display = 'none';
    this.spineG.style.display = 'none';
    this.renderFrontCover(0, 0, this.width, this.height);
    this.renderSelectionOverlay(0, 0);

    if (this.onRender) this.onRender();
  }

  renderDefs() {
    let html = `
      <style>
        text, textPath {
          font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "clig" 1;
          text-rendering: geometricPrecision;
          -webkit-font-smoothing: antialiased;
        }
      </style>
      <!-- Shadow and Glow Filters -->
      <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.25" />
      </filter>
      <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.28" />
      </filter>
      <filter id="kbach-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="#ca8a04" flood-opacity="0.6" />
      </filter>

      <!-- Khmer Gold Foil Gradient -->
      <linearGradient id="khmer-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#b8860b" />
        <stop offset="25%" stop-color="#ffd700" />
        <stop offset="50%" stop-color="#fff8dc" />
        <stop offset="75%" stop-color="#daa520" />
        <stop offset="100%" stop-color="#996515" />
      </linearGradient>

      <!-- Cambodian National Flag Ribbon Gradients -->
      <linearGradient id="cambodia-flag-blue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#002b7f" />
        <stop offset="100%" stop-color="#032ea1" />
      </linearGradient>
      <linearGradient id="cambodia-flag-red" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ce1126" />
        <stop offset="100%" stop-color="#e11b22" />
      </linearGradient>

      <!-- Pastel Scallop Pattern -->
      <pattern id="pastel-stripes" width="48" height="60" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="12" height="60" fill="#fce4ec" />
        <rect x="12" y="0" width="12" height="60" fill="#fff9c4" />
        <rect x="24" y="0" width="12" height="60" fill="#e0f2f1" />
        <rect x="36" y="0" width="12" height="60" fill="#f3e5f5" />
      </pattern>

      <!-- Ruled Garo Grid Pattern -->
      ${KhmerGraphics.createNotebookGaroDefs('khmer-garo-pattern')}
    `;

    // Layer-specific gradient & glow filter defs
    for (const [key, layer] of Object.entries(this.state.layers)) {
      if (layer.gradientFill) {
        html += `
          <linearGradient id="grad-${layer.id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${layer.fill}" />
            <stop offset="50%" stop-color="${layer.fillColor2 || layer.fill}" />
            <stop offset="100%" stop-color="${layer.fill}" />
          </linearGradient>
        `;
      }
      if (layer.glowColor && layer.glowBlur > 0) {
        html += `
          <filter id="glow-${layer.id}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="${layer.glowBlur}" flood-color="${layer.glowColor}" flood-opacity="0.9" />
          </filter>
        `;
      }
    }

    this.defsG.innerHTML = html;
  }

  renderBackground() {
    this.bgG.innerHTML = `
      <rect width="${this.width}" height="${this.height}" fill="${this.state.bgColor}" />
    `;
  }

  renderFrontCover(offsetX = 0, offsetY = 0, w = 600, h = 850) {
    this.renderFrame(offsetX, offsetY, w, h);
    if (this.state.frameStyle !== 'cartoon-kids' && this.state.frameStyle !== 'custom') {
      this.renderNationalHeader(offsetX, offsetY, w, h);
    }
    this.renderDecorations(offsetX, offsetY, w, h);
    this.renderPhoto(offsetX, offsetY);
    if (this.state.frameStyle !== 'cartoon-kids' && this.state.frameStyle !== 'custom') {
      this.renderBadges(offsetX, offsetY);
    }
    this.renderTextLayers(offsetX, offsetY);
  }

  renderFrame(ox, oy, w, h) {
    let html = `<g transform="translate(${ox}, ${oy})">`;
    const style = this.state.frameStyle;

    if (style === 'cartoon-kids') {
      // Primary School Cartoon Kids & Rainbow Sun
      html += `
        <!-- Sky & Canvas Sheet -->
        <rect x="14" y="14" width="${w - 28}" height="${h - 28}" rx="24" ry="24"
              fill="#e0f2fe" stroke="#38bdf8" stroke-width="6" filter="url(#card-shadow)" />
        
        <!-- Rainbow Arcs at Top Left and Top Right -->
        <g opacity="0.65">
          <path d="M 14,140 Q 60,60 140,24" fill="none" stroke="#f43f5e" stroke-width="6" />
          <path d="M 14,148 Q 65,70 148,24" fill="none" stroke="#fb923c" stroke-width="5" />
          <path d="M 14,156 Q 70,80 156,24" fill="none" stroke="#facc15" stroke-width="5" />
          <path d="M 14,164 Q 75,90 164,24" fill="none" stroke="#4ade80" stroke-width="5" />
          <path d="M 14,172 Q 80,100 172,24" fill="none" stroke="#38bdf8" stroke-width="5" />
        </g>
        <g opacity="0.65">
          <path d="M ${w - 14},140 Q ${w - 60},60 ${w - 140},24" fill="none" stroke="#f43f5e" stroke-width="6" />
          <path d="M ${w - 14},148 Q ${w - 65},70 ${w - 148},24" fill="none" stroke="#fb923c" stroke-width="5" />
          <path d="M ${w - 14},156 Q ${w - 70},80 ${w - 156},24" fill="none" stroke="#facc15" stroke-width="5" />
          <path d="M ${w - 14},164 Q ${w - 75},90 ${w - 164},24" fill="none" stroke="#4ade80" stroke-width="5" />
          <path d="M ${w - 14},172 Q ${w - 80},100 ${w - 172},24" fill="none" stroke="#38bdf8" stroke-width="5" />
        </g>

        <!-- White Fluffy Clouds Behind Kids & Sun -->
        <g fill="#ffffff" opacity="0.95">
          <path d="M 160,82 Q 175,60 200,65 Q 225,50 250,70 Q 280,60 300,75 Q 320,60 350,70 Q 375,50 400,65 Q 425,60 440,82 Z" />
        </g>

        <!-- Smiling Cheerful Sun (Top Center) -->
        <g transform="translate(${w / 2}, 66)">
          ${[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map(deg => `
            <polygon points="0,-36 -6,-24 6,-24" fill="#f59e0b" transform="rotate(${deg})" />
          `).join('')}
          <circle cx="0" cy="0" r="24" fill="#fde047" stroke="#f59e0b" stroke-width="2.5" />
          <path d="M -9,-4 Q -6,-9 -3,-4" fill="none" stroke="#78350f" stroke-width="2" stroke-linecap="round" />
          <path d="M 3,-4 Q 6,-9 9,-4" fill="none" stroke="#78350f" stroke-width="2" stroke-linecap="round" />
          <circle cx="-11" cy="2" r="4" fill="#f472b6" opacity="0.75" />
          <circle cx="11" cy="2" r="4" fill="#f472b6" opacity="0.75" />
          <path d="M -7,4 Q 0,14 7,4" fill="none" stroke="#b45309" stroke-width="2.5" stroke-linecap="round" />
        </g>

        <!-- Cartoon Boy (Top Left) -->
        <g transform="translate(108, 68)">
          <circle cx="0" cy="-6" r="26" fill="#fde68a" />
          <path d="M -26,-10 Q -20,-34 0,-34 Q 20,-34 26,-10 Q 20,-16 10,-12 Q 0,-24 -12,-14 Q -20,-18 -26,-10 Z" fill="#1e293b" />
          <ellipse cx="-8" cy="-6" rx="4" ry="5.5" fill="#0f172a" />
          <circle cx="-6" cy="-8" r="1.5" fill="#ffffff" />
          <ellipse cx="8" cy="-6" rx="4" ry="5.5" fill="#0f172a" />
          <circle cx="10" cy="-8" r="1.5" fill="#ffffff" />
          <ellipse cx="-13" cy="1" rx="4" ry="2.5" fill="#fb7185" opacity="0.8" />
          <ellipse cx="13" cy="1" rx="4" ry="2.5" fill="#fb7185" opacity="0.8" />
          <path d="M -7,3 Q 0,12 7,3" fill="#be123c" stroke="#9f1239" stroke-width="1.2" />
          <path d="M -18,18 L -14,38 L 14,38 L 18,18 Q 0,22 -18,18 Z" fill="#0284c7" />
          <path d="M -18,18 L -6,26 L 0,20 L 6,26 L 18,18 Z" fill="#ffffff" />
          <g transform="translate(-24, 8) rotate(-20)">
            <rect x="-6" y="-4" width="12" height="18" rx="6" fill="#fde68a" />
            <circle cx="0" cy="-8" r="7" fill="#fde68a" />
            <text x="-4" y="-3" font-size="14">👍</text>
          </g>
        </g>

        <!-- Cartoon Girl (Top Right) -->
        <g transform="translate(${w - 108}, 68)">
          <g transform="translate(-28, -6)">
            <ellipse cx="0" cy="0" rx="9" ry="14" fill="#3b2d22" />
            <circle cx="2" cy="-4" r="5" fill="#ec4899" />
          </g>
          <g transform="translate(28, -6)">
            <ellipse cx="0" cy="0" rx="9" ry="14" fill="#3b2d22" />
            <circle cx="-2" cy="-4" r="5" fill="#ec4899" />
          </g>
          <circle cx="0" cy="-6" r="26" fill="#fef08a" />
          <path d="M -26,-8 Q -20,-34 0,-34 Q 20,-34 26,-8 Q 18,-18 6,-14 Q 0,-24 -10,-15 Q -18,-18 -26,-8 Z" fill="#3b2d22" />
          <ellipse cx="-8" cy="-6" rx="4.5" ry="6" fill="#1e1b4b" />
          <circle cx="-6" cy="-8" r="1.8" fill="#ffffff" />
          <circle cx="-9" cy="-4" r="0.9" fill="#ffffff" />
          <ellipse cx="8" cy="-6" rx="4.5" ry="6" fill="#1e1b4b" />
          <circle cx="10" cy="-8" r="1.8" fill="#ffffff" />
          <circle cx="7" cy="-4" r="0.9" fill="#ffffff" />
          <ellipse cx="-14" cy="1" rx="4.5" ry="3" fill="#fb7185" opacity="0.85" />
          <ellipse cx="14" cy="1" rx="4.5" ry="3" fill="#fb7185" opacity="0.85" />
          <path d="M -7,4 Q 0,13 7,4" fill="#be123c" stroke="#9f1239" stroke-width="1.2" />
          <path d="M -18,18 L -14,38 L 14,38 L 18,18 Q 0,22 -18,18 Z" fill="#ec4899" />
          <path d="M -18,18 L -6,26 L 0,20 L 6,26 L 18,18 Z" fill="#ffffff" />
          <g transform="translate(24, 4) rotate(25)">
            <circle cx="0" cy="-6" r="6" fill="#fef08a" />
            <text x="-5" y="-1" font-size="13">👋</text>
          </g>
        </g>

        <!-- Big Pencils on Borders -->
        <g transform="translate(26, 175) rotate(14)">
          <polygon points="0,0 16,0 8,-24" fill="#fde68a" stroke="#d97706" stroke-width="1" />
          <polygon points="5,-15 11,-15 8,-24" fill="#ec4899" />
          <rect x="0" y="0" width="16" height="110" fill="#f43f5e" rx="2" />
          <line x1="5" y1="0" x2="5" y2="110" stroke="#fb7185" stroke-width="1.5" />
          <line x1="11" y1="0" x2="11" y2="110" stroke="#be123c" stroke-width="1.5" />
          <rect x="0" y="110" width="16" height="18" rx="3" fill="#38bdf8" />
          <rect x="0" y="107" width="16" height="6" fill="#cbd5e1" />
        </g>

        <g transform="translate(${w - 38}, 175) rotate(-14)">
          <polygon points="0,0 16,0 8,-24" fill="#fde68a" stroke="#d97706" stroke-width="1" />
          <polygon points="5,-15 11,-15 8,-24" fill="#059669" />
          <rect x="0" y="0" width="16" height="110" fill="#22c55e" rx="2" />
          <line x1="5" y1="0" x2="5" y2="110" stroke="#86efac" stroke-width="1.5" />
          <line x1="11" y1="0" x2="11" y2="110" stroke="#15803d" stroke-width="1.5" />
          <rect x="0" y="110" width="16" height="18" rx="3" fill="#facc15" />
          <rect x="0" y="107" width="16" height="6" fill="#cbd5e1" />
        </g>

        <!-- Floating Yellow Stars & Sparkles -->
        <g fill="#fbbf24">
          <text x="50" y="360" font-size="20">⭐</text>
          <text x="35" y="580" font-size="22">⭐</text>
          <text x="${w - 65}" y="360" font-size="20">⭐</text>
          <text x="${w - 55}" y="580" font-size="22">⭐</text>
          <text x="60" y="720" font-size="18">✨</text>
          <text x="${w - 75}" y="720" font-size="18">✨</text>
        </g>

        <!-- Central Inner Scalloped Card for Clean Text Display -->
        ${this.state.showInnerCard ? `
          <g filter="url(#card-shadow)">
            <rect x="52" y="105" width="${w - 104}" height="${h - 150}" rx="28" ry="28"
                  fill="#ffffff" stroke="#38bdf8" stroke-width="5" />
            <rect x="60" y="113" width="${w - 120}" height="${h - 166}" rx="22" ry="22"
                  fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="10,6" />
          </g>
        ` : ''}
      `;
    }
    else if (style === 'royal-kbach') {
      // 1. Royal Golden Phni Tes
      html += `
        <rect x="16" y="16" width="${w - 32}" height="${h - 32}" rx="18" ry="18"
              fill="#fffdf8" stroke="url(#khmer-gold-grad)" stroke-width="8" filter="url(#card-shadow)" />
        <rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="12" ry="12"
              fill="none" stroke="#b45309" stroke-width="1.8" />
        <rect x="32" y="32" width="${w - 64}" height="${h - 64}" rx="10" ry="10"
              fill="none" stroke="#d4af37" stroke-width="1.2" stroke-dasharray="5,4" />
        ${this.state.showInnerCard ? `
          <rect x="42" y="42" width="${w - 84}" height="${h - 84}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.85" />
        ` : ''}
        ${KhmerGraphics.renderFourCorners(w, h, 'phni-tes', 20, 0.85)}
      `;
    }
    else if (style === 'angkor-wat') {
      // 2. Angkor Wat Heritage
      html += `
        <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="16" ry="16"
              fill="#fffef9" stroke="#b45309" stroke-width="7" filter="url(#card-shadow)" />
        <rect x="28" y="28" width="${w - 56}" height="${h - 56}" rx="10" ry="10"
              fill="none" stroke="#d97706" stroke-width="2" />
        <g transform="translate(${w / 2}, 32) scale(0.75)" filter="url(#kbach-glow)">
          ${KhmerGraphics.createAngkorWat(180, 75, 'url(#khmer-gold-grad)')}
        </g>
        ${this.state.showInnerCard ? `
          <rect x="38" y="60" width="${w - 76}" height="${h - 88}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.88" stroke="#fcd34d" stroke-width="1.5" stroke-dasharray="6,4" />
        ` : ''}
        <g transform="translate(${w / 2}, ${h - 36}) scale(0.9)">${KhmerGraphics.createGoldenLotus()}</g>
        <g transform="translate(60, ${h - 40}) scale(0.65)">${KhmerGraphics.createGoldenLotus()}</g>
        <g transform="translate(${w - 60}, ${h - 40}) scale(0.65)">${KhmerGraphics.createGoldenLotus()}</g>
      `;
    }
    else if (style === 'romdoul-khmer') {
      // 3. National Romdoul Blossom
      html += `
        <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="22" ry="22"
              fill="#fffbf5" stroke="#d97706" stroke-width="6" filter="url(#card-shadow)" />
        <rect x="28" y="28" width="${w - 56}" height="${h - 56}" rx="14" ry="14"
              fill="none" stroke="#65a30d" stroke-width="1.8" stroke-dasharray="6,4" />
        ${this.state.showInnerCard ? `
          <rect x="38" y="38" width="${w - 76}" height="${h - 76}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.9" />
        ` : ''}
        ${KhmerGraphics.renderFourCorners(w, h, 'romdoul', 32, 0.95)}
      `;
    }
    else if (style === 'notebook-grid') {
      // 4. Authentic Cambodian Student Notebook Grid
      html += `
        <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="16" ry="16"
              fill="#ffffff" stroke="#0284c7" stroke-width="6" filter="url(#card-shadow)" />
        <rect x="24" y="24" width="${w - 48}" height="${h - 48}" rx="10" ry="10"
              fill="url(#khmer-garo-pattern)" />
        <line x1="85" y1="24" x2="85" y2="${h - 24}" stroke="#ef4444" stroke-width="2" />
        ${KhmerGraphics.createWashiTape(40, 10, 110, 26, '#f59e0b', -3)}
        ${KhmerGraphics.createWashiTape(w - 150, h - 36, 110, 26, '#10b981', 3)}
      `;
    }
    else if (style === 'cambodian-flag') {
      // 5. Cambodian Flag Ribbon
      html += `
        <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="16" ry="16"
              fill="#fffdf8" stroke="#d4af37" stroke-width="6" filter="url(#card-shadow)" />
        <g transform="translate(18, 18)">
          <rect x="0" y="0" width="${w - 36}" height="8" fill="url(#cambodia-flag-blue)" />
          <rect x="0" y="8" width="${w - 36}" height="18" fill="url(#cambodia-flag-red)" />
          <rect x="0" y="26" width="${w - 36}" height="8" fill="url(#cambodia-flag-blue)" />
        </g>
        <g transform="translate(18, ${h - 52})">
          <rect x="0" y="0" width="${w - 36}" height="8" fill="url(#cambodia-flag-blue)" />
          <rect x="0" y="8" width="${w - 36}" height="18" fill="url(#cambodia-flag-red)" />
          <rect x="0" y="26" width="${w - 36}" height="8" fill="url(#cambodia-flag-blue)" />
        </g>
        ${this.state.showInnerCard ? `
          <rect x="36" y="62" width="${w - 72}" height="${h - 124}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.9" stroke="#d4af37" stroke-width="1.5" />
        ` : ''}
        <g transform="translate(${w / 2}, 36) scale(0.65)">
          <circle cx="0" cy="0" r="22" fill="#d4af37" stroke="#ffffff" stroke-width="2" filter="url(#soft-shadow)" />
          <g transform="translate(0, -6) scale(0.4)">
            ${KhmerGraphics.createAngkorWat(100, 45, '#ffffff')}
          </g>
        </g>
      `;
    }
    else if (style === 'luxury-gold-double') {
      // 6. Luxury Gold Double Line
      html += `
        <rect x="14" y="14" width="${w - 28}" height="${h - 28}" rx="12" ry="12"
              fill="#fefefe" stroke="url(#khmer-gold-grad)" stroke-width="5" filter="url(#card-shadow)" />
        <rect x="24" y="24" width="${w - 48}" height="${h - 48}" rx="8" ry="8"
              fill="none" stroke="#b45309" stroke-width="1.5" />
        <rect x="30" y="30" width="${w - 60}" height="${h - 60}" rx="6" ry="6"
              fill="none" stroke="#d4af37" stroke-width="3" />
        <rect x="38" y="38" width="${w - 76}" height="${h - 76}" rx="4" ry="4"
              fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="6,4" />
        ${this.state.showInnerCard ? `
          <rect x="46" y="46" width="${w - 92}" height="${h - 92}" rx="8" ry="8"
                fill="${this.state.innerCardBg}" opacity="0.85" />
        ` : ''}
        <circle cx="24" cy="24" r="5" fill="#d4af37" stroke="#fff" stroke-width="1.5" />
        <circle cx="${w - 24}" cy="24" r="5" fill="#d4af37" stroke="#fff" stroke-width="1.5" />
        <circle cx="24" cy="${h - 24}" r="5" fill="#d4af37" stroke="#fff" stroke-width="1.5" />
        <circle cx="${w - 24}" cy="${h - 24}" r="5" fill="#d4af37" stroke="#fff" stroke-width="1.5" />
      `;
    }
    else if (style === 'sample-floral-stripes') {
      // 7. Pastel Scallop Floral Stripes
      const stripeHeight = 65;
      const scallopR = 10;
      let topScallops = '';
      for (let x = 0; x < w; x += scallopR * 2) {
        topScallops += `M ${x},${stripeHeight} Q ${x + scallopR},${stripeHeight + scallopR} ${x + scallopR * 2},${stripeHeight} `;
      }
      let bottomScallops = '';
      const bottomY = h - stripeHeight;
      for (let x = 0; x < w; x += scallopR * 2) {
        bottomScallops += `M ${x},${bottomY} Q ${x + scallopR},${bottomY - scallopR} ${x + scallopR * 2},${bottomY} `;
      }

      html += `
        <rect x="0" y="0" width="${w}" height="${stripeHeight}" fill="url(#pastel-stripes)" />
        <path d="${topScallops} L ${w},${stripeHeight - 4} L 0,${stripeHeight - 4} Z" fill="#f06292" />
        <path d="${topScallops}" fill="none" stroke="#d81b60" stroke-width="1.5" />
        <rect x="0" y="${bottomY}" width="${w}" height="${stripeHeight}" fill="url(#pastel-stripes)" />
        <path d="${bottomScallops} L ${w},${bottomY + 4} L 0,${bottomY + 4} Z" fill="#f06292" />
        <path d="${bottomScallops}" fill="none" stroke="#d81b60" stroke-width="1.5" />
        ${this.state.showInnerCard ? `
          <rect x="32" y="48" width="${w - 64}" height="${h - 96}" rx="14" ry="14"
                fill="${this.state.innerCardBg}" stroke="${this.state.innerCardBorderColor}" stroke-width="3" filter="url(#card-shadow)" />
          <rect x="38" y="54" width="${w - 76}" height="${h - 108}" rx="10" ry="10"
                fill="none" stroke="#e6c875" stroke-width="1" stroke-dasharray="6,3" opacity="0.7" />
        ` : ''}
      `;
    }
    else if (style === 'sweet-floral') {
      // 8. Sweet Floral
      html += `
        <rect x="22" y="22" width="${w - 44}" height="${h - 44}" rx="24" ry="24"
              fill="#fffaf5" stroke="#f472b6" stroke-width="6" filter="url(#card-shadow)" />
        <rect x="32" y="32" width="${w - 64}" height="${h - 64}" rx="16" ry="16"
              fill="none" stroke="#ec4899" stroke-width="1.8" stroke-dasharray="6,4" />
        ${this.state.showInnerCard ? `
          <rect x="42" y="42" width="${w - 84}" height="${h - 84}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.9" />
        ` : ''}
      `;
    }
    else if (style === 'cosmic-galaxy') {
      // 9. Cosmic Galaxy
      html += `
        <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="20" ry="20"
              fill="#0f172a" stroke="#8b5cf6" stroke-width="6" filter="url(#card-shadow)" />
        <rect x="28" y="28" width="${w - 56}" height="${h - 56}" rx="14" ry="14"
              fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8,6" />
        <circle cx="80" cy="80" r="3" fill="#38bdf8" />
        <circle cx="140" cy="110" r="2" fill="#ffd700" />
        <circle cx="${w - 90}" cy="90" r="3.5" fill="#f43f5e" />
        <circle cx="${w - 120}" cy="${h - 100}" r="2.5" fill="#38bdf8" />
        ${this.state.showInnerCard ? `
          <rect x="38" y="38" width="${w - 76}" height="${h - 76}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.88" />
        ` : ''}
      `;
    }
    else if (style === 'rainbow-fun') {
      // 10. Rainbow Fun
      html += `
        <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="28" ry="28"
              fill="#fffde7" stroke="#f97316" stroke-width="6" filter="url(#card-shadow)" />
        <rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="20" ry="20"
              fill="none" stroke="#fbbf24" stroke-width="4" />
        ${this.state.showInnerCard ? `
          <rect x="36" y="36" width="${w - 72}" height="${h - 72}" rx="16" ry="16"
                fill="${this.state.innerCardBg}" opacity="0.9" />
        ` : ''}
      `;
    }
    else if (style === 'cyber-stem') {
      // 11. Cyber STEM
      html += `
        <rect x="16" y="16" width="${w - 32}" height="${h - 32}" rx="10" ry="10"
              fill="#0b132b" stroke="#00f0ff" stroke-width="4" filter="url(#card-shadow)" />
        <rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="6" ry="6"
              fill="none" stroke="#3a86ff" stroke-width="1.5" stroke-dasharray="8,5" />
        <polyline points="16,60 40,60 60,40 60,16" fill="none" stroke="#00f0ff" stroke-width="3" />
        <polyline points="${w - 16},60 ${w - 40},60 ${w - 60},40 ${w - 60},16" fill="none" stroke="#00f0ff" stroke-width="3" />
        <circle cx="60" cy="60" r="4" fill="#00f0ff" />
        <circle cx="${w - 60}" cy="60" r="4" fill="#00f0ff" />
        ${this.state.showInnerCard ? `
          <rect x="40" y="70" width="${w - 80}" height="${h - 110}" rx="8" ry="8"
                fill="#1c2541" opacity="0.85" stroke="#3a86ff" stroke-width="1" />
        ` : ''}
      `;
    }
    else if (style === 'custom' && this.state.customFrame.visible && this.state.customFrame.src) {
      // 12. Custom Uploaded Frame Image
      html += `
        <image href="${this.state.customFrame.src}" xlink:href="${this.state.customFrame.src}" x="0" y="0" width="${w}" height="${h}" 
               preserveAspectRatio="none" opacity="${this.state.customFrame.opacity}" />
      `;
    } else {
      // Default Fallback Frame
      html += `
        <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="18" ry="18"
              fill="#ffffff" stroke="#1e40af" stroke-width="5" filter="url(#card-shadow)" />
        ${this.state.showInnerCard ? `
          <rect x="36" y="36" width="${w - 72}" height="${h - 72}" rx="12" ry="12"
                fill="${this.state.innerCardBg}" opacity="0.88" />
        ` : ''}
      `;
    }

    html += `</g>`;
    this.frameG.innerHTML = html;
  }

  renderNationalHeader(ox, oy, w, h) {
    if (!this.state.nationalHeader.visible) {
      this.headerG.innerHTML = '';
      return;
    }

    const nh = this.state.nationalHeader;
    const fontStr = FontManager.getFontFamilyString(nh.fontFamily);

    this.headerG.innerHTML = `
      <g transform="translate(${ox + w / 2}, ${oy + nh.y})" text-anchor="middle">
        <!-- Kingdom Title -->
        <text y="0" font-family="${fontStr}" font-size="${nh.fontSize + 2}" font-weight="bold" fill="${nh.color}" filter="url(#soft-shadow)">
          ${nh.title}
        </text>
        <!-- Motto -->
        <text y="24" font-family="${fontStr}" font-size="${nh.fontSize - 1}" font-weight="bold" fill="${nh.accentColor}">
          ${nh.motto}
        </text>
        <!-- Center Lotus / Royal Accent Line -->
        <line x1="-90" y1="36" x2="90" y2="36" stroke="${nh.accentColor}" stroke-width="1.2" opacity="0.75" />
        <circle cx="0" cy="36" r="3" fill="${nh.accentColor}" />
      </g>
    `;
  }

  renderDecorations(ox, oy, w, h) {
    // Top decorative Angkor or Lotus if suitable
    this.decorsG.innerHTML = ``;
  }

  renderPhoto(ox, oy) {
    const sp = this.state.studentPhoto;
    if (!sp.visible) {
      this.photoG.innerHTML = '';
      return;
    }

    const cx = ox + sp.x;
    const cy = oy + sp.y;
    const r = sp.size / 2;

    let html = `<g transform="translate(${cx}, ${cy})" filter="url(#soft-shadow)">`;

    if (sp.shape === 'circle') {
      html += `
        <clipPath id="photo-clip-circle">
          <circle cx="0" cy="0" r="${r}" />
        </clipPath>
        <circle cx="0" cy="0" r="${r + sp.borderWidth}" fill="${sp.borderColor}" />
        <circle cx="0" cy="0" r="${r}" fill="#f1f5f9" />
        ${sp.src ? `
          <image href="${sp.src}" x="${-r}" y="${-r}" width="${sp.size}" height="${sp.size}" 
                 preserveAspectRatio="xMidYMid slice" clip-path="url(#photo-clip-circle)" />
        ` : `
          <!-- Default Student Silhouette Avatar -->
          <text x="0" y="10" font-size="${sp.size * 0.55}" text-anchor="middle">🎓</text>
        `}
      `;
    } else {
      // Rounded Rectangle / ID badge shape
      const w2 = sp.size * 0.85;
      const h2 = sp.size * 1.1;
      html += `
        <clipPath id="photo-clip-rect">
          <rect x="${-w2 / 2}" y="${-h2 / 2}" width="${w2}" height="${h2}" rx="8" />
        </clipPath>
        <rect x="${-w2 / 2 - sp.borderWidth}" y="${-h2 / 2 - sp.borderWidth}" 
              width="${w2 + sp.borderWidth * 2}" height="${h2 + sp.borderWidth * 2}" rx="10" fill="${sp.borderColor}" />
        <rect x="${-w2 / 2}" y="${-h2 / 2}" width="${w2}" height="${h2}" rx="8" fill="#f1f5f9" />
        ${sp.src ? `
          <image href="${sp.src}" x="${-w2 / 2}" y="${-h2 / 2}" width="${w2}" height="${h2}" 
                 preserveAspectRatio="xMidYMid slice" clip-path="url(#photo-clip-rect)" />
        ` : `
          <text x="0" y="12" font-size="${sp.size * 0.55}" text-anchor="middle">👦</text>
        `}
      `;
    }

    html += `</g>`;
    this.photoG.innerHTML = html;
  }

  renderBadges(ox, oy) {
    const b = this.state.badgeSticker;
    if (!b.visible) {
      this.badgesG.innerHTML = '';
      return;
    }

    let badgeSvg = '';
    if (b.type === 'moeys') {
      badgeSvg = KhmerGraphics.createMoEYSSeal(ox + b.x, oy + b.y, b.scale);
    } else if (b.type === 'medal-10') {
      badgeSvg = KhmerGraphics.createHonorMedal(ox + b.x, oy + b.y, b.scale, '១០/១០');
    } else if (b.type === 'star') {
      badgeSvg = KhmerGraphics.createHonorMedal(ox + b.x, oy + b.y, b.scale, '★ សិស្សពូកែ ★');
    }

    this.badgesG.innerHTML = badgeSvg;
  }

  renderTextLayers(ox, oy) {
    let html = '';

    for (const [key, layer] of Object.entries(this.state.layers)) {
      if (!layer.visible) continue;

      const lx = ox + layer.x;
      const ly = oy + layer.y;
      const fontStr = FontManager.getFontFamilyString(layer.fontFamily);
      const textEscaped = this.escapeXml(layer.text);

      if (layer.hasRibbon) {
        html += KhmerGraphics.createRibbonBanner(lx, ly - 32, 420, 48, layer.fill, '#0f172a');
      }

      // Check 3D Extrusion
      const depth = (layer.depth3D && layer.depth3D > 0) ? Math.min(Math.round(layer.depth3D), 15) : 0;
      const extColor = layer.extrusionColor || '#1e293b';
      const dir = layer.direction3D || 'bottom-right';
      const strokeW = (layer.strokeWidth !== undefined && layer.strokeWidth !== null) ? Number(layer.strokeWidth) : 3;
      const strokeColor = layer.stroke || '#ffffff';
      const solidFill = layer.fill || '#000000';

      if (layer.isCurved && Math.abs(layer.curvature) > 2) {
        // Curved text via SVG textPath
        const pathId = `curved-path-${layer.id}`;
        const spanW = 460;
        const arcH = (layer.curvature / 100) * (spanW * 0.45);
        const x1 = lx - spanW / 2;
        const x2 = lx + spanW / 2;
        const cpY = ly - arcH * 2;
        const pathD = `M ${x1},${ly + arcH * 0.5} Q ${lx},${cpY} ${x2},${ly + arcH * 0.5}`;

        let extrusionHtml = '';
        if (depth > 0) {
          const maxOff = typeof Text3DManager !== 'undefined'
            ? Text3DManager.getDirectionOffsets(dir, depth + 1.5)
            : { dx: depth + 1.5, dy: depth + 1.5 };
          extrusionHtml += `
            <g transform="translate(${maxOff.dx}, ${maxOff.dy})" opacity="0.35">
              <text font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                    fill="#000000" stroke="#000000" stroke-width="2"
                    stroke-linejoin="round" stroke-linecap="round">
                <textPath href="#${pathId}" xlink:href="#${pathId}" startOffset="50%" text-anchor="middle">${textEscaped}</textPath>
              </text>
            </g>
          `;

          for (let s = depth; s >= 1; s--) {
            const off = typeof Text3DManager !== 'undefined'
              ? Text3DManager.getDirectionOffsets(dir, s)
              : { dx: s, dy: s };
            extrusionHtml += `
              <g transform="translate(${off.dx}, ${off.dy})">
                <text font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                      fill="${extColor}" stroke="${extColor}" stroke-width="1.5"
                      stroke-linejoin="round" stroke-linecap="round">
                  <textPath href="#${pathId}" xlink:href="#${pathId}" startOffset="50%" text-anchor="middle">${textEscaped}</textPath>
                </text>
              </g>
            `;
          }
        }

        html += `
          <g id="layer-group-${layer.id}">
            <path id="${pathId}" d="${pathD}" fill="none" stroke="none" />
            <!-- 3D Extrusion Behind Text -->
            ${extrusionHtml}
            <!-- Subtle Glow Halo -->
            ${layer.glowColor && layer.glowBlur > 0 ? `
              <text font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                    fill="none" stroke="${layer.glowColor}" stroke-width="${strokeW * 1.5 + 3}"
                    stroke-linejoin="round" stroke-linecap="round" opacity="0.45">
                <textPath href="#${pathId}" xlink:href="#${pathId}" startOffset="50%" text-anchor="middle">
                  ${textEscaped}
                </textPath>
              </text>
            ` : ''}
            <!-- Crisp White Stroke Layer (Underneath fill) -->
            ${strokeW > 0 ? `
              <text font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                    fill="none" stroke="${strokeColor}" stroke-width="${strokeW * 1.5}"
                    stroke-linejoin="round" stroke-linecap="round">
                <textPath href="#${pathId}" xlink:href="#${pathId}" startOffset="50%" text-anchor="middle">
                  ${textEscaped}
                </textPath>
              </text>
            ` : ''}
            <!-- Pure Solid Vibrant Text Fill (On top - NEVER hollow, NEVER white inside) -->
            <text font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                  fill="${solidFill}" stroke="none">
              <textPath href="#${pathId}" xlink:href="#${pathId}" startOffset="50%" text-anchor="middle">
                ${textEscaped}
              </textPath>
            </text>
          </g>
        `;
      } else {
        // Standard Straight Line Text
        let extrusionHtml = '';
        if (depth > 0) {
          const maxOff = typeof Text3DManager !== 'undefined'
            ? Text3DManager.getDirectionOffsets(dir, depth + 1.5)
            : { dx: depth + 1.5, dy: depth + 1.5 };
          extrusionHtml += `
            <g transform="translate(${maxOff.dx}, ${maxOff.dy})" opacity="0.35">
              <text x="${lx}" y="${ly}" font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                    fill="#000000" stroke="#000000" stroke-width="2"
                    stroke-linejoin="round" stroke-linecap="round">
                ${textEscaped}
              </text>
            </g>
          `;

          for (let s = depth; s >= 1; s--) {
            const off = typeof Text3DManager !== 'undefined'
              ? Text3DManager.getDirectionOffsets(dir, s)
              : { dx: s, dy: s };
            extrusionHtml += `
              <g transform="translate(${off.dx}, ${off.dy})">
                <text x="${lx}" y="${ly}" font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                      fill="${extColor}" stroke="${extColor}" stroke-width="1.5"
                      stroke-linejoin="round" stroke-linecap="round">
                  ${textEscaped}
                </text>
              </g>
            `;
          }
        }

        html += `
          <g id="layer-group-${layer.id}" text-anchor="middle">
            <!-- 3D Extrusion Behind Text -->
            ${extrusionHtml}
            <!-- Subtle Glow Halo -->
            ${layer.glowColor && layer.glowBlur > 0 ? `
              <text x="${lx}" y="${ly}" font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                    fill="none" stroke="${layer.glowColor}" stroke-width="${strokeW * 1.5 + 3}"
                    stroke-linejoin="round" stroke-linecap="round" opacity="0.45">
                ${textEscaped}
              </text>
            ` : ''}
            <!-- Crisp White Stroke Layer (Underneath fill) -->
            ${strokeW > 0 ? `
              <text x="${lx}" y="${ly}" font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                    fill="none" stroke="${strokeColor}" stroke-width="${strokeW * 1.5}"
                    stroke-linejoin="round" stroke-linecap="round">
                ${textEscaped}
              </text>
            ` : ''}
            <!-- Pure Solid Vibrant Text Fill (On top - NEVER hollow, NEVER white inside) -->
            <text x="${lx}" y="${ly}" font-family="${fontStr}" font-size="${layer.fontSize}" font-weight="bold"
                  fill="${solidFill}" stroke="none">
              ${textEscaped}
            </text>
          </g>
        `;
      }
    }

    this.textLayersG.innerHTML = html;
  }

  renderBackCover(ox, oy, w, h) {
    const preset = BACK_COVER_PRESETS.find(p => p.id === this.state.backCover.presetId) || BACK_COVER_PRESETS[0];
    const themeColor = this.state.layers?.subject?.fill || '#1e40af';

    this.backCoverG.innerHTML = `
      <g transform="translate(${ox}, ${oy})">
        <!-- Back Cover Background Card -->
        <rect x="0" y="0" width="${w}" height="${h}" fill="${this.state.backCover.bgColor}" />
        <rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="16" ry="16"
              fill="#ffffff" stroke="${themeColor}" stroke-width="5" filter="url(#card-shadow)" />
        <rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="12" ry="12"
              fill="none" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="6,4" />
        ${preset.renderSvg(w, h)}
      </g>
    `;
  }

  renderSpine(ox, oy, w, h) {
    this.spineG.innerHTML = `
      <g transform="translate(${ox}, ${oy})">
        <rect x="0" y="0" width="${w}" height="${h}" fill="${this.state.spine.color}" />
        <line x1="0" y1="0" x2="0" y2="${h}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="6,4" />
        <line x1="${w}" y1="0" x2="${w}" y2="${h}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="6,4" />
        <!-- Vertical Book Spine Title -->
        <g transform="translate(${w / 2}, ${h / 2}) rotate(90)">
          <text font-family="'Koulen', sans-serif" font-size="16" fill="${this.state.spine.textColor}" text-anchor="middle" letter-spacing="4">
            ${this.escapeXml(this.state.spine.text)}
          </text>
        </g>
      </g>
    `;
  }

  renderSelectionOverlay(ox = 0, oy = 0) {
    if (!this.selectedLayerId) {
      this.selectionG.innerHTML = '';
      return;
    }

    if (this.selectedLayerId === 'studentPhoto' && this.state.studentPhoto.visible) {
      const p = this.state.studentPhoto;
      this.selectionG.innerHTML = `
        <circle cx="${ox + p.x}" cy="${oy + p.y}" r="${p.size / 2 + 8}" 
                fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,4" />
      `;
      return;
    }

    if (this.selectedLayerId === 'badgeSticker' && this.state.badgeSticker.visible) {
      const b = this.state.badgeSticker;
      this.selectionG.innerHTML = `
        <circle cx="${ox + b.x}" cy="${oy + b.y}" r="45" 
                fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,4" />
      `;
      return;
    }

    const layer = this.state.layers[this.selectedLayerId];
    if (!layer || !layer.visible) {
      this.selectionG.innerHTML = '';
      return;
    }

    const lx = ox + layer.x;
    const ly = oy + layer.y;
    const estW = (layer.text.length * layer.fontSize * 0.55) + 36;
    const estH = layer.fontSize * 1.5;

    this.selectionG.innerHTML = `
      <g transform="translate(${lx - estW / 2}, ${ly - estH + 8})">
        <rect width="${estW}" height="${estH}" rx="6" 
              fill="rgba(59, 130, 246, 0.08)" stroke="#3b82f6" stroke-width="1.8" stroke-dasharray="6,4" />
        <!-- 4 Corner selection dots -->
        <circle cx="0" cy="0" r="4.5" fill="#3b82f6" stroke="#fff" stroke-width="1.5" />
        <circle cx="${estW}" cy="0" r="4.5" fill="#3b82f6" stroke="#fff" stroke-width="1.5" />
        <circle cx="0" cy="${estH}" r="4.5" fill="#3b82f6" stroke="#fff" stroke-width="1.5" />
        <circle cx="${estW}" cy="${estH}" r="4.5" fill="#3b82f6" stroke="#fff" stroke-width="1.5" />
      </g>
    `;
  }

  escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  }

  // Export as High-Resolution PNG (1x, 2x, 3x / 300DPI)
  async exportPNG(scale = 2) {
    // Hide selection overlay before export
    this.selectedLayerId = null;
    this.render();

    const svgString = new XMLSerializer().serializeToString(this.svgElement);
    const canvas = document.createElement('canvas');
    canvas.width = this.width * scale;
    canvas.height = this.height * scale;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png', 1.0);
      };
      img.onerror = (e) => reject(e);
      img.src = url;
    });
  }

  // Export as pure Vector SVG
  exportSVG() {
    this.selectedLayerId = null;
    this.render();
    const svgString = new XMLSerializer().serializeToString(this.svgElement);
    return new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  }
}

