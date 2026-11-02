/**
 * Master Application Orchestrator for Khmer Student Book Cover Studio Pro Max
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Canvas Engine
  const engine = new BookCoverCanvasEngine('canvas-container');
  window.appEngine = engine;

  // 2. Initialize Font Manager asynchronously in background
  FontManager.init().then(() => {
    populateFontSelect();
  }).catch(err => console.warn('FontManager init background note:', err));

  // 3. Check for Shared Template from URL Hash or Auto-Save
  const sharedTemplate = TemplateStorage.loadFromUrlHash();
  if (sharedTemplate) {
    engine.state = { ...engine.state, ...sharedTemplate };
    engine.render();
  } else {
    const saved = TemplateStorage.loadAutoSave();
    if (saved) {
      engine.state = { ...engine.state, ...saved };
      engine.render();
    }
  }

  // =========================================================================
  // UI Element References
  // =========================================================================
  // Theme Toggle
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // View Mode Tabs
  const btnViewFront = document.getElementById('btn-view-front');
  const btnViewBack = document.getElementById('btn-view-back');
  const btnViewWraparound = document.getElementById('btn-view-wraparound');

  // Navigation Tabs
  const navTabBtns = document.querySelectorAll('.nav-tab-btn');
  const panelTabs = document.querySelectorAll('.panel-tab-content');

  // Text Layer Controls
  const selectActiveLayer = document.getElementById('select-active-layer');
  const inputLayerText = document.getElementById('input-layer-text');
  const selectLayerFont = document.getElementById('select-layer-font');
  const sliderFontSize = document.getElementById('slider-font-size');
  const valFontSize = document.getElementById('val-font-size');
  const inputLayerColor = document.getElementById('input-layer-color');
  const textColorHex = document.getElementById('text-color-hex');
  const inputLayerColor2 = document.getElementById('input-layer-color2');
  const checkGradientFill = document.getElementById('check-gradient-fill');
  const sliderStrokeWidth = document.getElementById('slider-stroke-width');
  const valStrokeWidth = document.getElementById('val-stroke-width');
  const inputStrokeColor = document.getElementById('input-stroke-color');
  const checkIsCurved = document.getElementById('check-is-curved');
  const sliderCurvature = document.getElementById('slider-curvature');
  const valCurvature = document.getElementById('val-curvature');
  const checkHasRibbon = document.getElementById('check-has-ribbon');
  const btnApplyFontAll = document.getElementById('btn-apply-font-all');

  // 3D Text Controls Elements
  const select3dStyle = document.getElementById('select-3d-style');
  const slider3dDepth = document.getElementById('slider-3d-depth');
  const val3dDepth = document.getElementById('val-3d-depth');
  const input3dExtrusionColor = document.getElementById('input-3d-extrusion-color');
  const btnApply3dAll = document.getElementById('btn-apply-3d-all');
  const btnOpen3dModal = document.getElementById('btn-open-3d-modal');
  const modal3dStyles = document.getElementById('modal-3d-styles');
  const container3dCards = document.getElementById('container-3d-cards');

  // Undo / Redo & Zoom
  const btnUndo = document.getElementById('btn-undo');
  const btnRedo = document.getElementById('btn-redo');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomFit = document.getElementById('btn-zoom-fit');
  const zoomText = document.getElementById('zoom-text');

  // Modals
  const btnOpenFontModal = document.getElementById('btn-open-font-modal');
  const linkOpenFontPicker = document.getElementById('link-open-font-picker');
  const modalFonts = document.getElementById('modal-fonts');
  const btnOpenBatchModal = document.getElementById('btn-open-batch-modal');
  const modalBatch = document.getElementById('modal-batch');
  const btnOpenExportModal = document.getElementById('btn-open-export-modal');
  const modalExport = document.getElementById('modal-export');

  // Subject Modal Elements
  const modalSubject = document.getElementById('modal-subject');
  const btnAddSubject = document.getElementById('btn-add-subject');
  const btnResetSubjects = document.getElementById('btn-reset-subjects');
  const subjectModalTitle = document.getElementById('subject-modal-title');
  const inputSubjectId = document.getElementById('input-subject-id');
  const inputSubjectName = document.getElementById('input-subject-name');
  const inputSubjectSubtitle = document.getElementById('input-subject-subtitle');
  const inputSubjectIcon = document.getElementById('input-subject-icon');
  const inputSubjectColor = document.getElementById('input-subject-color');
  const subjectColorHex = document.getElementById('subject-color-hex');
  const selectSubjectFrame = document.getElementById('select-subject-frame');
  const selectSubjectFont = document.getElementById('select-subject-font');
  const btnSaveSubject = document.getElementById('btn-save-subject');
  const btnDeleteSubject = document.getElementById('btn-delete-subject');

  // =========================================================================
  // Theme Switching
  // =========================================================================
  let currentTheme = localStorage.getItem('khmer_cover_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeIcon.textContent = currentTheme === 'light' ? '☀️' : '🌙';

  btnThemeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('khmer_cover_theme', currentTheme);
    themeIcon.textContent = currentTheme === 'light' ? '☀️' : '🌙';
  });

  // =========================================================================
  // View Mode Switching (Front, Back, Wraparound)
  // =========================================================================
  function setViewMode(mode) {
    document.querySelectorAll('.view-tab-btn').forEach(b => b.classList.remove('active'));
    if (mode === 'front') btnViewFront.classList.add('active');
    else if (mode === 'back') btnViewBack.classList.add('active');
    else if (mode === 'wraparound') btnViewWraparound.classList.add('active');

    engine.setViewMode(mode);
  }

  btnViewFront.addEventListener('click', () => setViewMode('front'));
  btnViewBack.addEventListener('click', () => setViewMode('back'));
  btnViewWraparound.addEventListener('click', () => setViewMode('wraparound'));

  // =========================================================================
  // Left Nav Tab Switching
  // =========================================================================
  navTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navTabBtns.forEach(b => b.classList.remove('active'));
      panelTabs.forEach(p => {
        p.classList.remove('active');
        p.style.display = ''; // Clear inline styles
      });

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.display = 'flex';
        targetPanel.style.flexDirection = 'column';

        // Auto-switch canvas view when clicking Back Cover tab
        if (targetId === 'tab-backcover') {
          setViewMode('back');
        } else if (engine.viewMode === 'back') {
          setViewMode('front');
        }
      }
    });
  });

  // =========================================================================
  // Sync Active Text Layer Controls
  // =========================================================================
  function populateFontSelect() {
    const allFonts = FontManager.getAllFontsList();
    selectLayerFont.innerHTML = allFonts.map(f => `
      <option value="${f.id}">${f.name}</option>
    `).join('');
  }
  populateFontSelect();

  function syncLayerControls(layerId) {
    const layer = engine.state.layers[layerId];
    if (!layer) return;

    selectActiveLayer.value = layerId;
    inputLayerText.value = layer.text || '';
    selectLayerFont.value = layer.fontFamily || 'Moul';
    sliderFontSize.value = layer.fontSize || 32;
    valFontSize.textContent = `${layer.fontSize}px`;
    inputLayerColor.value = layer.fill || '#0d47a1';
    textColorHex.textContent = layer.fill || '#0d47a1';
    inputLayerColor2.value = layer.fillColor2 || layer.fill || '#1976d2';
    checkGradientFill.checked = !!layer.gradientFill;
    sliderStrokeWidth.value = layer.strokeWidth || 0;
    valStrokeWidth.textContent = `${layer.strokeWidth || 0}px`;
    inputStrokeColor.value = layer.stroke || '#ffffff';
    checkIsCurved.checked = !!layer.isCurved;
    sliderCurvature.value = layer.curvature || 0;
    valCurvature.textContent = layer.curvature || 0;
    checkHasRibbon.checked = !!layer.hasRibbon;

    // Sync 3D Controls
    if (select3dStyle) {
      select3dStyle.value = layer.style3D || 'none';
    }
    if (slider3dDepth) {
      slider3dDepth.value = layer.depth3D || 0;
      if (val3dDepth) val3dDepth.textContent = `${layer.depth3D || 0}px`;
    }
    if (input3dExtrusionColor) {
      input3dExtrusionColor.value = layer.extrusionColor || '#78350f';
    }
    document.querySelectorAll('.btn-direction-pick').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-dir') === (layer.direction3D || 'bottom-right'));
    });
  }

  selectActiveLayer.addEventListener('change', () => {
    engine.selectedLayerId = selectActiveLayer.value;
    engine.render();
    syncLayerControls(selectActiveLayer.value);
  });

  engine.onLayerSelect = (layerId) => {
    if (layerId && engine.state.layers[layerId]) {
      syncLayerControls(layerId);
    }
  };

  // Input changes
  inputLayerText.addEventListener('input', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.text = inputLayerText.value;
      engine.render();
    }
  });

  selectLayerFont.addEventListener('change', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.fontFamily = selectLayerFont.value;
      engine.recordHistory();
      engine.render();
    }
  });

  sliderFontSize.addEventListener('input', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.fontSize = parseInt(sliderFontSize.value);
      valFontSize.textContent = `${sliderFontSize.value}px`;
      engine.render();
    }
  });

  inputLayerColor.addEventListener('input', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.fill = inputLayerColor.value;
      textColorHex.textContent = inputLayerColor.value;
      engine.render();
    }
  });

  inputLayerColor2.addEventListener('input', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.fillColor2 = inputLayerColor2.value;
      engine.render();
    }
  });

  checkGradientFill.addEventListener('change', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.gradientFill = checkGradientFill.checked;
      engine.render();
    }
  });

  sliderStrokeWidth.addEventListener('input', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.strokeWidth = parseFloat(sliderStrokeWidth.value);
      valStrokeWidth.textContent = `${sliderStrokeWidth.value}px`;
      engine.render();
    }
  });

  inputStrokeColor.addEventListener('input', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.stroke = inputStrokeColor.value;
      engine.render();
    }
  });

  checkIsCurved.addEventListener('change', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.isCurved = checkIsCurved.checked;
      engine.render();
    }
  });

  sliderCurvature.addEventListener('input', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.curvature = parseInt(sliderCurvature.value);
      valCurvature.textContent = sliderCurvature.value;
      engine.render();
    }
  });

  checkHasRibbon.addEventListener('change', () => {
    const layer = engine.state.layers[selectActiveLayer.value];
    if (layer) {
      layer.hasRibbon = checkHasRibbon.checked;
      engine.render();
    }
  });

  // Apply Font to All Layers
  btnApplyFontAll.addEventListener('click', () => {
    const chosenFont = selectLayerFont.value;
    for (const [k, layer] of Object.entries(engine.state.layers)) {
      layer.fontFamily = chosenFont;
    }
    engine.recordHistory();
    engine.render();
  });

  // =========================================================================
  // 3D Text Controls Wiring (30 Authentic Styles)
  // =========================================================================
  function populate3dStyleSelect() {
    if (typeof Text3DManager === 'undefined' || !select3dStyle) return;
    const styles = Text3DManager.getAllStyles();
    let html = '<option value="none">-- គ្មាន (ធម្មតា / 2D) --</option>';
    styles.forEach(s => {
      html += `<option value="${s.id}">${s.icon || '✨'} ${s.name}</option>`;
    });
    select3dStyle.innerHTML = html;
  }
  populate3dStyleSelect();

  if (select3dStyle) {
    select3dStyle.addEventListener('change', () => {
      const layer = engine.state.layers[selectActiveLayer.value];
      if (layer) {
        Text3DManager.applyStyleToLayer(layer, select3dStyle.value);
        syncLayerControls(selectActiveLayer.value);
        engine.recordHistory();
        engine.render();
      }
    });
  }

  if (slider3dDepth) {
    slider3dDepth.addEventListener('input', () => {
      const layer = engine.state.layers[selectActiveLayer.value];
      if (layer) {
        layer.depth3D = parseInt(slider3dDepth.value);
        if (val3dDepth) val3dDepth.textContent = `${layer.depth3D}px`;
        engine.render();
      }
    });
    slider3dDepth.addEventListener('change', () => {
      engine.recordHistory();
    });
  }

  if (input3dExtrusionColor) {
    input3dExtrusionColor.addEventListener('input', () => {
      const layer = engine.state.layers[selectActiveLayer.value];
      if (layer) {
        layer.extrusionColor = input3dExtrusionColor.value;
        engine.render();
      }
    });
    input3dExtrusionColor.addEventListener('change', () => {
      engine.recordHistory();
    });
  }

  document.querySelectorAll('.btn-direction-pick').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-direction-pick').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const dir = btn.getAttribute('data-dir');
      const layer = engine.state.layers[selectActiveLayer.value];
      if (layer) {
        layer.direction3D = dir;
        engine.recordHistory();
        engine.render();
      }
    });
  });

  if (btnApply3dAll) {
    btnApply3dAll.addEventListener('click', () => {
      const curLayer = engine.state.layers[selectActiveLayer.value];
      const styleId = curLayer?.style3D || select3dStyle?.value;
      if (!styleId || styleId === 'none') {
        alert('សូមជ្រើសរើសម៉ូត 3D មួយជាមុនសិន!');
        return;
      }
      for (const [k, l] of Object.entries(engine.state.layers)) {
        Text3DManager.applyStyleToLayer(l, styleId);
      }
      syncLayerControls(selectActiveLayer.value);
      engine.recordHistory();
      engine.render();
    });
  }

  // =========================================================================
  // 3D Text Styles Gallery Modal (30 Styles)
  // =========================================================================
  if (btnOpen3dModal) {
    btnOpen3dModal.addEventListener('click', () => {
      openModal(modal3dStyles);
      render3dModalCards('all');
    });
  }

  function render3dModalCards(category = 'all') {
    if (!container3dCards || typeof Text3DManager === 'undefined') return;

    const allStyles = Text3DManager.getAllStyles();
    const filtered = category === 'all'
      ? allStyles
      : allStyles.filter(s => s.category === category);

    const activeLayer = engine.state.layers[selectActiveLayer.value];
    const currentStyleId = activeLayer?.style3D || '';

    container3dCards.innerHTML = filtered.map(style => {
      const isActive = currentStyleId === style.id;
      const depth = style.depth || 4;
      const dir = style.direction || 'bottom-right';
      const extColor = style.extrusionColor || '#451a03';
      const sampleWord = 'ភាសាខ្មែរ 3D';
      
      let extrusionSvg = '';
      for (let s = depth; s >= 1; s--) {
        const off = Text3DManager.getDirectionOffsets(dir, s * 0.9);
        extrusionSvg += `
          <text x="${120 + off.dx}" y="${28 + off.dy}" font-family="'Moul', 'Koulen', sans-serif" font-size="20" font-weight="bold"
                text-anchor="middle" fill="${extColor}" stroke="${extColor}" stroke-width="2" stroke-linejoin="round">
            ${sampleWord}
          </text>
        `;
      }

      return `
        <div class="card-3d-preview ${isActive ? 'active' : ''}" data-style-id="${style.id}">
          <div class="card-3d-header">
            <span style="font-size: 11px; font-weight: 700; color: var(--accent-gold); display: flex; align-items: center; gap: 4px;">
              <span>${style.icon || '✨'}</span> ${style.badge || '3D PRO'}
            </span>
            <span style="font-size: 10px; color: var(--text-muted); background: rgba(255,255,255,0.06); padding: 1px 6px; border-radius: 4px;">
              ជម្រៅ ${style.depth}px
            </span>
          </div>

          <div class="card-3d-display-box" style="background: ${style.previewBg || '#0f172a'};">
            <svg viewBox="0 0 240 48" width="100%" height="100%" style="overflow: visible;">
              <defs>
                ${style.gradientFill ? `
                  <linearGradient id="card-grad-${style.id}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="${style.fill}" />
                    <stop offset="100%" stop-color="${style.fillColor2 || style.fill}" />
                  </linearGradient>
                ` : ''}
              </defs>
              <!-- Extrusions -->
              ${extrusionSvg}
              <!-- Stroke -->
              ${style.strokeWidth > 0 ? `
                <text x="120" y="28" font-family="'Moul', 'Koulen', sans-serif" font-size="20" font-weight="bold"
                      text-anchor="middle" fill="none" stroke="${style.stroke}" stroke-width="${style.strokeWidth * 1.5}"
                      stroke-linejoin="round">
                  ${sampleWord}
                </text>
              ` : ''}
              <!-- Fill -->
              <text x="120" y="28" font-family="'Moul', 'Koulen', sans-serif" font-size="20" font-weight="bold"
                    text-anchor="middle" fill="${style.gradientFill ? `url(#card-grad-${style.id})` : style.fill}">
                ${sampleWord}
              </text>
            </svg>
          </div>

          <div class="card-3d-title" title="${style.name}">${style.name}</div>

          <div style="display: flex; gap: 6px; margin-top: 4px;">
            <button type="button" class="btn btn-sm btn-gold btn-apply-card-3d" data-id="${style.id}" style="flex: 1; padding: 4px 6px; font-size: 11px;">
              <span>✓</span> ជ្រើសរើស
            </button>
            <button type="button" class="btn btn-sm btn-outline btn-apply-card-all-3d" data-id="${style.id}" title="ដាក់លើគ្រប់អក្សរ" style="padding: 4px 8px; font-size: 11px;">
              <span>✨</span> ទាំងអស់
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind card clicks
    container3dCards.querySelectorAll('.btn-apply-card-3d').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const styleId = btn.getAttribute('data-id');
        const layer = engine.state.layers[selectActiveLayer.value];
        if (layer) {
          Text3DManager.applyStyleToLayer(layer, styleId);
          syncLayerControls(selectActiveLayer.value);
          engine.recordHistory();
          engine.render();
          closeModal(modal3dStyles);
        }
      });
    });

    container3dCards.querySelectorAll('.card-3d-preview').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const styleId = card.getAttribute('data-style-id');
        const layer = engine.state.layers[selectActiveLayer.value];
        if (layer) {
          Text3DManager.applyStyleToLayer(layer, styleId);
          syncLayerControls(selectActiveLayer.value);
          engine.recordHistory();
          engine.render();
          closeModal(modal3dStyles);
        }
      });
    });

    container3dCards.querySelectorAll('.btn-apply-card-all-3d').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const styleId = btn.getAttribute('data-id');
        for (const [k, l] of Object.entries(engine.state.layers)) {
          Text3DManager.applyStyleToLayer(l, styleId);
        }
        syncLayerControls(selectActiveLayer.value);
        engine.recordHistory();
        engine.render();
        closeModal(modal3dStyles);
      });
    });
  }

  document.querySelectorAll('.tab-3d-cat').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-3d-cat').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-cat');
      render3dModalCards(cat);
    });
  });

  // =========================================================================
  // Frames Grid Rendering
  // =========================================================================
  const framesGrid = document.getElementById('frames-cards-grid');
  function renderFramesGrid() {
    framesGrid.innerHTML = FRAME_STYLES.map(frame => `
      <div class="preset-card ${engine.state.frameStyle === frame.id ? 'active' : ''}" data-frame="${frame.id}">
        <div style="width: 36px; height: 36px; border-radius: 8px; background: ${frame.previewColor}; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 18px;">
          ${frame.isKhmerSpecial ? '🏛️' : (frame.isCustom ? '📁' : '🖼️')}
        </div>
        <div class="preset-card-name">${frame.name.split('(')[0].trim()}</div>
        ${frame.badge ? `<span style="font-size: 9.5px; font-weight: 700; background: rgba(245, 158, 11, 0.2); color: var(--accent-gold); padding: 2px 8px; border-radius: 10px;">${frame.badge}</span>` : ''}
      </div>
    `).join('');

    framesGrid.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', () => {
        const frameId = card.getAttribute('data-frame');
        engine.setFrameStyle(frameId);
        renderFramesGrid();
      });
    });
  }
  renderFramesGrid();

  // Custom Frame Upload
  const btnUploadFrame = document.getElementById('btn-upload-frame');
  const inputFrameFile = document.getElementById('input-frame-file');
  btnUploadFrame.addEventListener('click', () => inputFrameFile.click());
  inputFrameFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        engine.state.customFrame.src = ev.target.result;
        engine.state.customFrame.visible = true;
        engine.setFrameStyle('custom');
        renderFramesGrid();
      };
      reader.readAsDataURL(file);
    }
  });

  // =========================================================================
  // Subjects Presets Grid & Subject Editor (Add / Edit / Delete)
  // =========================================================================
  const subjectsGrid = document.getElementById('subjects-cards-grid');

  function populateSubjectModalDropdowns() {
    // Populate Frame dropdown
    selectSubjectFrame.innerHTML = FRAME_STYLES.map(f => `
      <option value="${f.id}">${f.name.split('(')[0].trim()}</option>
    `).join('');

    // Populate Font dropdown
    const fonts = FontManager.getAllFontsList();
    selectSubjectFont.innerHTML = fonts.map(f => `
      <option value="${f.id}">${f.name}</option>
    `).join('');
  }
  populateSubjectModalDropdowns();

  function renderSubjectsGrid() {
    const list = SubjectPresetsManager.getAll();
    subjectsGrid.innerHTML = list.map(sub => `
      <div class="preset-card ${engine.state.presetId === sub.id ? 'active' : ''}" data-subject="${sub.id}">
        <button type="button" class="btn-edit-subject" data-edit="${sub.id}" title="កែប្រែមុខវិជ្ជា (${sub.name})">✏️</button>
        <div class="preset-card-icon">${sub.icon}</div>
        <div class="preset-card-name">${sub.name}</div>
        <div class="preset-card-sub">${sub.subtitle || ''}</div>
      </div>
    `).join('');

    // Bind card click (Apply preset)
    subjectsGrid.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Ignore if clicking the edit button
        if (e.target.closest('.btn-edit-subject')) return;
        const subId = card.getAttribute('data-subject');
        engine.setSubjectPreset(subId);
        renderSubjectsGrid();
        syncLayerControls(selectActiveLayer.value);
      });
    });

    // Bind edit button click
    subjectsGrid.querySelectorAll('.btn-edit-subject').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const subId = btn.getAttribute('data-edit');
        const sub = list.find(s => s.id === subId);
        if (sub) openSubjectModal(sub);
      });
    });
  }
  renderSubjectsGrid();

  function openSubjectModal(sub = null) {
    populateSubjectModalDropdowns();

    if (sub) {
      // Edit existing subject
      subjectModalTitle.innerHTML = `<span>✏️</span> កែសម្រួល ៖ ${sub.name}`;
      inputSubjectId.value = sub.id;
      inputSubjectName.value = sub.name;
      inputSubjectSubtitle.value = sub.subtitle || '';
      inputSubjectIcon.value = sub.icon || '📚';
      inputSubjectColor.value = sub.themeColor || '#1565c0';
      subjectColorHex.textContent = sub.themeColor || '#1565c0';
      selectSubjectFrame.value = sub.frameStyle || 'royal-kbach';
      selectSubjectFont.value = sub.defaultFonts?.subject || 'Moul';
      btnDeleteSubject.style.display = 'inline-flex';
    } else {
      // Add new subject
      subjectModalTitle.innerHTML = `<span>➕</span> បង្កើតមុខវិជ្ជាថ្មី`;
      inputSubjectId.value = '';
      inputSubjectName.value = '';
      inputSubjectSubtitle.value = '';
      inputSubjectIcon.value = '📚';
      inputSubjectColor.value = '#2563eb';
      subjectColorHex.textContent = '#2563eb';
      selectSubjectFrame.value = 'royal-kbach';
      selectSubjectFont.value = 'Moul';
      btnDeleteSubject.style.display = 'none';
    }

    openModal(modalSubject);
  }

  // Open Add Subject Modal
  if (btnAddSubject) {
    btnAddSubject.addEventListener('click', () => openSubjectModal(null));
  }

  // Color picker hex preview
  inputSubjectColor.addEventListener('input', () => {
    subjectColorHex.textContent = inputSubjectColor.value;
  });

  // Emoji picker click
  document.querySelectorAll('.btn-emoji-pick').forEach(btn => {
    btn.addEventListener('click', () => {
      inputSubjectIcon.value = btn.textContent.trim();
    });
  });

  // Save Subject (Add or Update)
  btnSaveSubject.addEventListener('click', () => {
    const name = inputSubjectName.value.trim();
    if (!name) {
      alert('សូមបញ្ចូលឈ្មោះមុខវិជ្ជាជាភាសាខ្មែរ!');
      inputSubjectName.focus();
      return;
    }

    const id = inputSubjectId.value || ('sub_' + Date.now());
    const subtitle = inputSubjectSubtitle.value.trim();
    const icon = inputSubjectIcon.value.trim() || '📚';
    const color = inputSubjectColor.value;
    const frame = selectSubjectFrame.value;
    const font = selectSubjectFont.value;

    const subjectData = {
      id: id,
      name: name,
      subtitle: subtitle,
      icon: icon,
      themeColor: color,
      accentColor: '#ffd54f',
      bgGradient: `linear-gradient(135deg, ${color}15 0%, ${color}35 100%)`,
      frameStyle: frame,
      defaultColors: {
        schoolName: '#0d47a1',
        schoolStroke: '#ffffff',
        grade: '#d84315',
        subject: color,
        name: '#2e7d32',
        year: '#6a1b9a'
      },
      defaultFonts: {
        schoolName: 'Moul',
        grade: 'Koulen',
        subject: font,
        name: 'Koulen',
        year: 'Koulen'
      }
    };

    if (inputSubjectId.value) {
      SubjectPresetsManager.update(id, subjectData);
    } else {
      SubjectPresetsManager.add(subjectData);
    }

    renderSubjectsGrid();
    engine.setSubjectPreset(id);
    syncLayerControls(selectActiveLayer.value);
    closeModal(modalSubject);
  });

  // Delete Subject
  btnDeleteSubject.addEventListener('click', () => {
    const id = inputSubjectId.value;
    const name = inputSubjectName.value;
    if (!confirm(`តើអ្នកពិតជាចង់លុបមុខវិជ្ជា "${name}" មែនទេ?`)) return;

    SubjectPresetsManager.delete(id);
    renderSubjectsGrid();

    const remaining = SubjectPresetsManager.getAll();
    if (remaining.length > 0) {
      engine.setSubjectPreset(remaining[0].id);
      syncLayerControls(selectActiveLayer.value);
    }
    closeModal(modalSubject);
  });

  // Reset All Subjects to Default
  if (btnResetSubjects) {
    btnResetSubjects.addEventListener('click', () => {
      if (!confirm('តើអ្នកពិតជាចង់កំណត់មុខវិជ្ជាទាំងអស់ឡើងវិញដូចដើមឬ?')) return;
      SubjectPresetsManager.reset();
      renderSubjectsGrid();
      engine.setSubjectPreset('khmer');
      syncLayerControls(selectActiveLayer.value);
    });
  }

  // =========================================================================
  // Back Cover Presets Grid
  // =========================================================================
  const backCoverGrid = document.getElementById('backcover-presets-grid');
  function renderBackCoverGrid() {
    if (!backCoverGrid || typeof BACK_COVER_PRESETS === 'undefined') return;
    backCoverGrid.innerHTML = BACK_COVER_PRESETS.map(preset => `
      <div class="backcover-card ${engine.state.backCover.presetId === preset.id ? 'active' : ''}" data-bc="${preset.id}">
        <div class="backcover-card-icon">${preset.icon}</div>
        <div class="backcover-card-title">${preset.name.replace(' (', '\n(')}</div>
      </div>
    `).join('');

    backCoverGrid.querySelectorAll('.backcover-card').forEach(card => {
      card.addEventListener('click', () => {
        engine.state.backCover.presetId = card.getAttribute('data-bc');
        engine.recordHistory();
        renderBackCoverGrid();
        if (engine.viewMode !== 'back' && engine.viewMode !== 'wraparound') {
          setViewMode('back');
        } else {
          engine.render();
        }
      });
    });
    return;
  }
  if (false) {
    backCoverGrid.innerHTML = BACK_COVER_PRESETS.map(preset => `
      <div class="feature-list-card ${engine.state.backCover.presetId === preset.id ? 'active' : ''}" data-bc="${preset.id}">
        <div class="feature-card-icon-box">${preset.icon}</div>
        <div class="feature-card-info">
          <div class="feature-card-title">${preset.name}</div>
          <div class="feature-card-desc">${preset.desc || preset.subtitle}</div>
        </div>
        <div class="feature-card-check">✓</div>
      </div>
    `).join('');

    backCoverGrid.querySelectorAll('.feature-list-card').forEach(card => {
      card.addEventListener('click', () => {
        engine.state.backCover.presetId = card.getAttribute('data-bc');
        engine.recordHistory();
        renderBackCoverGrid();
        if (engine.viewMode !== 'back' && engine.viewMode !== 'wraparound') {
          setViewMode('back');
        } else {
          engine.render();
        }
      });
    });
  }
  renderBackCoverGrid();

  // =========================================================================
  // Photo & Badges Controls
  // =========================================================================
  const checkEnablePhoto = document.getElementById('check-enable-photo');
  const photoControlsBox = document.getElementById('photo-controls-box');
  const btnUploadPhoto = document.getElementById('btn-upload-photo');
  const inputPhotoFile = document.getElementById('input-photo-file');
  const selectPhotoShape = document.getElementById('select-photo-shape');
  const sliderPhotoSize = document.getElementById('slider-photo-size');
  const valPhotoSize = document.getElementById('val-photo-size');

  checkEnablePhoto.addEventListener('change', () => {
    engine.state.studentPhoto.visible = checkEnablePhoto.checked;
    photoControlsBox.style.display = checkEnablePhoto.checked ? 'flex' : 'none';
    engine.render();
  });

  btnUploadPhoto.addEventListener('click', () => inputPhotoFile.click());
  inputPhotoFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        engine.state.studentPhoto.src = ev.target.result;
        engine.state.studentPhoto.visible = true;
        checkEnablePhoto.checked = true;
        photoControlsBox.style.display = 'flex';
        engine.render();
      };
      reader.readAsDataURL(file);
    }
  });

  selectPhotoShape.addEventListener('change', () => {
    engine.state.studentPhoto.shape = selectPhotoShape.value;
    engine.render();
  });

  sliderPhotoSize.addEventListener('input', () => {
    engine.state.studentPhoto.size = parseInt(sliderPhotoSize.value);
    valPhotoSize.textContent = `${sliderPhotoSize.value}px`;
    engine.render();
  });

  // Badges
  const checkEnableBadge = document.getElementById('check-enable-badge');
  const selectBadgeType = document.getElementById('select-badge-type');
  checkEnableBadge.addEventListener('change', () => {
    engine.state.badgeSticker.visible = checkEnableBadge.checked;
    engine.render();
  });
  selectBadgeType.addEventListener('change', () => {
    engine.state.badgeSticker.type = selectBadgeType.value;
    engine.render();
  });

  // National Header
  const checkNationalHeader = document.getElementById('check-national-header');
  checkNationalHeader.addEventListener('change', () => {
    engine.state.nationalHeader.visible = checkNationalHeader.checked;
    engine.render();
  });

  // =========================================================================
  // Undo / Redo & Zoom
  // =========================================================================
  engine.onHistoryChange = (canUndo, canRedo) => {
    btnUndo.disabled = !canUndo;
    btnRedo.disabled = !canRedo;
  };

  btnUndo.addEventListener('click', () => engine.undo());
  btnRedo.addEventListener('click', () => engine.redo());

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      if (e.shiftKey) engine.redo();
      else engine.undo();
      e.preventDefault();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      engine.redo();
      e.preventDefault();
    }
  });

  let currentZoom = 1;
  function applyZoom(z) {
    currentZoom = Math.min(2.0, Math.max(0.4, z));
    engine.setZoom(currentZoom);
    zoomText.textContent = `${Math.round(currentZoom * 100)}%`;
  }

  btnZoomIn.addEventListener('click', () => applyZoom(currentZoom + 0.15));
  btnZoomOut.addEventListener('click', () => applyZoom(currentZoom - 0.15));
  btnZoomFit.addEventListener('click', () => {
    const container = document.getElementById('canvas-container');
    const scaleX = (container.clientWidth - 80) / engine.width;
    const scaleY = (container.clientHeight - 80) / engine.height;
    applyZoom(Math.min(scaleX, scaleY, 1.2));
  });

  // =========================================================================
  // Modal Handlers
  // =========================================================================
  function openModal(modal) {
    modal.classList.add('open');
  }
  function closeModal(modal) {
    modal.classList.remove('open');
  }

  document.querySelectorAll('.modal-close-btn, [data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close') || btn.closest('.modal-overlay').id;
      const modal = document.getElementById(targetId);
      if (modal) closeModal(modal);
    });
  });

  btnOpenFontModal.addEventListener('click', () => {
    openModal(modalFonts);
    renderFontModalCards();
  });
  if (linkOpenFontPicker) {
    linkOpenFontPicker.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalFonts);
      renderFontModalCards();
    });
  }

  btnOpenBatchModal.addEventListener('click', () => openModal(modalBatch));
  btnOpenExportModal.addEventListener('click', () => openModal(modalExport));

  // =========================================================================
  // Font Modal Cards
  // =========================================================================
  const modalFontCardsContainer = document.getElementById('modal-font-cards-container');
  const inputFontSearch = document.getElementById('input-font-search');
  const inputFontSampleText = document.getElementById('input-font-sample-text');
  const btnScanPcFonts = document.getElementById('btn-scan-pc-fonts');
  const btnUploadFontFile = document.getElementById('btn-upload-font-file');
  const inputFontUploadHidden = document.getElementById('input-font-upload-hidden');

  function renderFontModalCards() {
    const query = (inputFontSearch.value || '').toLowerCase().trim();
    const sample = inputFontSampleText.value || 'សាលាបឋមសិក្សាកោះថ្កូវ';
    const allFonts = FontManager.getAllFontsList();

    const filtered = allFonts.filter(f => f.name.toLowerCase().includes(query) || f.id.toLowerCase().includes(query));

    modalFontCardsContainer.innerHTML = filtered.map(f => `
      <div class="font-card ${engine.state.layers[selectActiveLayer.value]?.fontFamily === f.id ? 'active' : ''}" data-font="${f.id}">
        <div class="font-card-title">${f.name}</div>
        <div class="font-card-sample" style="font-family: ${FontManager.getFontFamilyString(f.id)};">${sample}</div>
        <button type="button" class="btn btn-outline btn-sm font-apply-btn" style="margin-top: 4px;">
          ជ្រើសរើស Font
        </button>
      </div>
    `).join('');

    modalFontCardsContainer.querySelectorAll('.font-card').forEach(card => {
      card.addEventListener('click', () => {
        const fontId = card.getAttribute('data-font');
        const layer = engine.state.layers[selectActiveLayer.value];
        if (layer) {
          layer.fontFamily = fontId;
          engine.recordHistory();
          engine.render();
          selectLayerFont.value = fontId;
          renderFontModalCards();
        }
      });
    });
  }

  inputFontSearch.addEventListener('input', renderFontModalCards);
  inputFontSampleText.addEventListener('input', renderFontModalCards);

  btnScanPcFonts.addEventListener('click', async () => {
    try {
      btnScanPcFonts.innerHTML = '<span>⏳</span> កំពុងស្កេន...';
      const scanned = await FontManager.scanLocalPCFonts();
      alert(`ស្កេនជោគជ័យ! បានរកឃើញ ${scanned.length} Fonts ខ្មែរក្នុងកុំព្យូទ័ររបស់អ្នក។`);
      populateFontSelect();
      renderFontModalCards();
    } catch (e) {
      alert(e.message);
    } finally {
      btnScanPcFonts.innerHTML = '<span>🔍</span> ស្កេន Font ក្នុង PC';
    }
  });

  btnUploadFontFile.addEventListener('click', () => inputFontUploadHidden.click());
  inputFontUploadHidden.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    for (const f of files) {
      await FontManager.registerFontFile(f);
    }
    populateFontSelect();
    renderFontModalCards();
    alert(`បានបញ្ចូល ${files.length} Font ដោយជោគជ័យ!`);
  });

  // =========================================================================
  // Batch Printing Execution
  // =========================================================================
  const textareaBatchNames = document.getElementById('textarea-batch-names');
  const btnLoadSampleRoster = document.getElementById('btn-load-sample-roster');
  const batchCountDisplay = document.getElementById('batch-count-display');
  const btnExecuteClassPrint = document.getElementById('btn-execute-class-print');

  function updateBatchDisplay() {
    const list = BatchGenerator.parseCSV(textareaBatchNames.value);
    const count = list.length;
    const pages = Math.ceil(count / 2);
    batchCountDisplay.textContent = `ចំនួនសិស្ស ៖ ${count} នាក់ (${pages} សន្លឹក A4)`;
  }

  btnLoadSampleRoster.addEventListener('click', () => {
    textareaBatchNames.value = DEFAULT_KHMER_CLASS_ROSTER.map(s => `${s.studentName}, ${s.studentInfoExtra}`).join('\n');
    updateBatchDisplay();
  });

  textareaBatchNames.addEventListener('input', updateBatchDisplay);
  btnLoadSampleRoster.click(); // Load sample initially

  btnExecuteClassPrint.addEventListener('click', async () => {
    const list = BatchGenerator.parseCSV(textareaBatchNames.value);
    if (list.length === 0) {
      alert('សូមបញ្ចូលបញ្ជីឈ្មោះសិស្សយ៉ាងហោច ១ នាក់!');
      return;
    }

    btnExecuteClassPrint.innerHTML = '<span>⏳</span> កំពុងរៀបចំ...';
    btnExecuteClassPrint.disabled = true;

    try {
      const html = await BatchGenerator.generatePrintHtml(engine, list);
      const printRoot = document.getElementById('print-sandbox-root');
      printRoot.innerHTML = html;
      closeModal(modalBatch);
      setTimeout(() => {
        window.print();
        btnExecuteClassPrint.innerHTML = '<span>🖨️</span> បោះពុម្ពឥឡូវនេះ (Print A4)';
        btnExecuteClassPrint.disabled = false;
      }, 500);
    } catch (e) {
      alert('កំហុសបោះពុម្ព៖ ' + e.message);
      btnExecuteClassPrint.innerHTML = '<span>🖨️</span> បោះពុម្ពឥឡូវនេះ (Print A4)';
      btnExecuteClassPrint.disabled = false;
    }
  });

  // =========================================================================
  // Export & Share Handlers
  // =========================================================================
  const btnExportPng = document.getElementById('btn-export-png-2x');
  const btnExportSvg = document.getElementById('btn-export-svg');
  const btnExportJson = document.getElementById('btn-export-json');
  const btnCopyShareUrl = document.getElementById('btn-copy-share-url');
  const btnImportJson = document.getElementById('btn-import-json');
  const inputImportJsonHidden = document.getElementById('input-import-json-hidden');

  btnExportPng.addEventListener('click', async () => {
    btnExportPng.style.opacity = '0.5';
    try {
      const blob = await engine.exportPNG(2.5); // 300 DPI high resolution
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Khmer-Book-Cover-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('កំហុសទាញយក PNG: ' + e.message);
    } finally {
      btnExportPng.style.opacity = '1';
    }
  });

  btnExportSvg.addEventListener('click', () => {
    const blob = engine.exportSVG();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Khmer-Book-Cover-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  });

  btnExportJson.addEventListener('click', () => {
    TemplateStorage.exportToFile(engine.state, engine.state.layers.subject.text);
  });

  btnCopyShareUrl.addEventListener('click', async () => {
    const url = TemplateStorage.generateShareUrl(engine.state);
    if (url) {
      await navigator.clipboard.writeText(url);
      alert('បានចម្លង Link ចូលក្នុង Clipboard រួចរាល់! អ្នកអាចផ្ញើ Link នេះទៅកាន់កុំព្យូទ័រ ឬទូរសព្ទផ្សេងទៀតបាន។');
    }
  });

  btnImportJson.addEventListener('click', () => inputImportJsonHidden.click());
  inputImportJsonHidden.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const loadedState = await TemplateStorage.importFromFile(file);
        engine.state = { ...engine.state, ...loadedState };
        engine.render();
        syncLayerControls(selectActiveLayer.value);
        closeModal(modalExport);
        alert('បានបើកឯកសារគំរូដោយជោគជ័យ!');
      } catch (err) {
        alert(err.message);
      }
    }
  });

  // =========================================================================
  // Khmer A4 Print Studio Orchestration (Matching User's Studio UI)
  // =========================================================================
  const btnOpen2SubjectsModal = document.getElementById('btn-open-2subjects-modal');
  const modalTwoSubjectsA4 = document.getElementById('modal-two-subjects-a4');
  const btnExport2SubjectsA4Card = document.getElementById('btn-export-2subjects-a4-card');
  const selectPrintMode = document.getElementById('select-print-mode');
  const selectPrintMargin = document.getElementById('select-print-margin');
  const checkPrintCutline = document.getElementById('check-print-cutline');
  const boxCustom2SubControls = document.getElementById('box-custom-2sub-controls');
  const selectA4Sub1 = document.getElementById('select-a4-sub1');
  const selectA4Sub2 = document.getElementById('select-a4-sub2');
  const containerA4QuickPairs = document.getElementById('container-a4-quick-pairs');
  const btnA4PrevPage = document.getElementById('btn-a4-prev-page');
  const btnA4NextPage = document.getElementById('btn-a4-next-page');
  const txtA4SheetIndicator = document.getElementById('txt-a4-sheet-indicator');
  const containerA4LivePreview = document.getElementById('container-a4-live-preview');
  const txtPrintFooterNote = document.getElementById('txt-print-footer-note');
  const btnDownloadA4Hd = document.getElementById('btn-download-a4-hd');
  const btnPrintNowPrimary = document.getElementById('btn-print-now-primary');

  const printStudioState = {
    mode: 'all-12', // 'all-12', 'custom-2', 'students-batch', 'current-single'
    currentSheetIndex: 0,
    margin: 8,
    showCutLine: true,
    sub1Id: 'khmer',
    sub2Id: 'dictation',
    sub1Text: null,
    sub2Text: null
  };

  function getTotalSheets() {
    if (printStudioState.mode === 'all-12') {
      return TwoSubjectsA4Manager.SHEETS_12_SUBJECTS.length; // 6 sheets
    }
    if (printStudioState.mode === 'students-batch') {
      const roster = typeof DEFAULT_KHMER_CLASS_ROSTER !== 'undefined' ? DEFAULT_KHMER_CLASS_ROSTER : [];
      return Math.max(1, Math.ceil(roster.length / 2));
    }
    return 1;
  }

  function getCurrentSheetOptions() {
    const marginMm = printStudioState.margin;
    const showCutLine = printStudioState.showCutLine;

    if (printStudioState.mode === 'all-12') {
      const sheets = TwoSubjectsA4Manager.SHEETS_12_SUBJECTS;
      const curSheet = sheets[printStudioState.currentSheetIndex] || sheets[0];
      return {
        sub1Id: curSheet.sub1,
        sub2Id: curSheet.sub2,
        margin: marginMm,
        showCutLine: showCutLine,
        title: `Sheet-${curSheet.sheetNum}-${curSheet.sub1}-${curSheet.sub2}`
      };
    }

    if (printStudioState.mode === 'custom-2') {
      return {
        sub1Id: printStudioState.sub1Id,
        sub2Id: printStudioState.sub2Id,
        sub1Text: printStudioState.sub1Text,
        sub2Text: printStudioState.sub2Text,
        margin: marginMm,
        showCutLine: showCutLine,
        title: `Custom-${printStudioState.sub1Id}-${printStudioState.sub2Id}`
      };
    }

    if (printStudioState.mode === 'current-single') {
      const stateClone = JSON.parse(JSON.stringify(engine.state));
      return {
        customState1: stateClone,
        customState2: stateClone,
        margin: marginMm,
        showCutLine: showCutLine,
        title: 'Current-Cover-Pair'
      };
    }

    if (printStudioState.mode === 'students-batch') {
      const roster = typeof DEFAULT_KHMER_CLASS_ROSTER !== 'undefined' ? DEFAULT_KHMER_CLASS_ROSTER : [];
      const idx = printStudioState.currentSheetIndex * 2;
      const st1 = roster[idx] || { studentName: 'សិស្សទី ១' };
      const st2 = roster[idx + 1] || null;

      const baseState = JSON.parse(JSON.stringify(engine.state));
      const s1State = JSON.parse(JSON.stringify(baseState));
      s1State.layers.studentName.text = st1.studentName;
      if (st1.studentInfoExtra) s1State.layers.studentInfoExtra.text = st1.studentInfoExtra;

      let s2State = JSON.parse(JSON.stringify(baseState));
      if (st2) {
        s2State.layers.studentName.text = st2.studentName;
        if (st2.studentInfoExtra) s2State.layers.studentInfoExtra.text = st2.studentInfoExtra;
      }

      return {
        customState1: s1State,
        customState2: s2State,
        margin: marginMm,
        showCutLine: showCutLine,
        title: `Students-Sheet-${printStudioState.currentSheetIndex + 1}`
      };
    }

    return {
      sub1Id: 'khmer',
      sub2Id: 'dictation',
      margin: marginMm,
      showCutLine: showCutLine
    };
  }

  function updatePrintStudioUI() {
    const total = getTotalSheets();
    if (printStudioState.currentSheetIndex >= total) {
      printStudioState.currentSheetIndex = total - 1;
    }
    if (printStudioState.currentSheetIndex < 0) {
      printStudioState.currentSheetIndex = 0;
    }

    // Sheet Indicator Text
    if (txtA4SheetIndicator) {
      txtA4SheetIndicator.textContent = `សន្លឹក A4 ទី ${printStudioState.currentSheetIndex + 1} / ${total}`;
    }

    // Prev / Next button states
    if (btnA4PrevPage) btnA4PrevPage.disabled = printStudioState.currentSheetIndex <= 0;
    if (btnA4NextPage) btnA4NextPage.disabled = printStudioState.currentSheetIndex >= total - 1;

    // Footer note text
    if (txtPrintFooterNote) {
      if (printStudioState.mode === 'all-12') {
        txtPrintFooterNote.textContent = 'បោះពុម្ពទាំង 12 មុខវិជ្ជា (ស្មើ 6 សន្លឹក A4)';
      } else if (printStudioState.mode === 'custom-2') {
        txtPrintFooterNote.textContent = 'បោះពុម្ព ២ មុខវិជ្ជាផ្ទាល់ខ្លួន (១ សន្លឹក A4)';
      } else if (printStudioState.mode === 'students-batch') {
        txtPrintFooterNote.textContent = `បោះពុម្ពតាមបញ្ជីឈ្មោះសិស្ស (ស្មើ ${total} សន្លឹក A4)`;
      } else {
        txtPrintFooterNote.textContent = 'បោះពុម្ពមុខវិជ្ជាបច្ចុប្បន្ន (១ សន្លឹក A4 - ២ ក្របដូចគ្នា)';
      }
    }

    // Render Preview
    if (containerA4LivePreview && typeof TwoSubjectsA4Manager !== 'undefined') {
      try {
        const opts = getCurrentSheetOptions();
        const svgString = TwoSubjectsA4Manager.generateA4SvgString(engine, opts);
        containerA4LivePreview.innerHTML = svgString;
      } catch (err) {
        console.error('Failed to render A4 print preview:', err);
      }
    }
  }

  function populateTwoSubjectsModal() {
    if (typeof SubjectPresetsManager === 'undefined') return;
    const subjects = SubjectPresetsManager.getAll();

    if (selectA4Sub1) {
      selectA4Sub1.innerHTML = subjects.map(s => `
        <option value="${s.id}">${s.icon || '📚'} ${s.name}</option>
      `).join('');
      selectA4Sub1.value = printStudioState.sub1Id;
    }

    if (selectA4Sub2) {
      selectA4Sub2.innerHTML = subjects.map(s => `
        <option value="${s.id}">${s.icon || '📚'} ${s.name}</option>
      `).join('');
      selectA4Sub2.value = printStudioState.sub2Id;
    }

    if (containerA4QuickPairs && typeof TwoSubjectsA4Manager !== 'undefined') {
      containerA4QuickPairs.innerHTML = TwoSubjectsA4Manager.COMMON_PAIRS.map((pair, idx) => `
        <button type="button" class="btn btn-sm btn-outline quick-pair-pill ${idx === 0 ? 'active' : ''}"
                data-sub1="${pair.sub1}" data-sub2="${pair.sub2}" style="font-size: 11px; padding: 3px 8px;">
          ${pair.name}
        </button>
      `).join('');

      containerA4QuickPairs.querySelectorAll('.quick-pair-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          containerA4QuickPairs.querySelectorAll('.quick-pair-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');

          const s1 = pill.getAttribute('data-sub1');
          const s2 = pill.getAttribute('data-sub2');
          printStudioState.sub1Id = s1;
          printStudioState.sub2Id = s2;
          if (selectA4Sub1) selectA4Sub1.value = s1;
          if (selectA4Sub2) selectA4Sub2.value = s2;
          printStudioState.sub1Text = null;
          printStudioState.sub2Text = null;
          updatePrintStudioUI();
        });
      });
    }

    // Set initial form control values
    if (selectPrintMode) selectPrintMode.value = printStudioState.mode;
    if (selectPrintMargin) selectPrintMargin.value = String(printStudioState.margin);
    if (checkPrintCutline) checkPrintCutline.checked = printStudioState.showCutLine;
    if (boxCustom2SubControls) boxCustom2SubControls.style.display = printStudioState.mode === 'custom-2' ? 'block' : 'none';

    updatePrintStudioUI();
  }

  // Event Listeners for Print Studio Controls
  if (selectPrintMode) {
    selectPrintMode.addEventListener('change', () => {
      printStudioState.mode = selectPrintMode.value;
      printStudioState.currentSheetIndex = 0;
      if (boxCustom2SubControls) {
        boxCustom2SubControls.style.display = printStudioState.mode === 'custom-2' ? 'block' : 'none';
      }
      updatePrintStudioUI();
    });
  }

  if (selectPrintMargin) {
    selectPrintMargin.addEventListener('change', () => {
      printStudioState.margin = parseInt(selectPrintMargin.value) || 8;
      updatePrintStudioUI();
    });
  }

  if (checkPrintCutline) {
    checkPrintCutline.addEventListener('change', () => {
      printStudioState.showCutLine = checkPrintCutline.checked;
      updatePrintStudioUI();
    });
  }

  if (btnA4PrevPage) {
    btnA4PrevPage.addEventListener('click', () => {
      if (printStudioState.currentSheetIndex > 0) {
        printStudioState.currentSheetIndex--;
        updatePrintStudioUI();
      }
    });
  }

  if (btnA4NextPage) {
    btnA4NextPage.addEventListener('click', () => {
      const total = getTotalSheets();
      if (printStudioState.currentSheetIndex < total - 1) {
        printStudioState.currentSheetIndex++;
        updatePrintStudioUI();
      }
    });
  }

  if (selectA4Sub1) {
    selectA4Sub1.addEventListener('change', () => {
      printStudioState.sub1Id = selectA4Sub1.value;
      printStudioState.sub1Text = null;
      updatePrintStudioUI();
    });
  }

  if (selectA4Sub2) {
    selectA4Sub2.addEventListener('change', () => {
      printStudioState.sub2Id = selectA4Sub2.value;
      printStudioState.sub2Text = null;
      updatePrintStudioUI();
    });
  }

  // Open Modal triggers
  if (btnOpen2SubjectsModal) {
    btnOpen2SubjectsModal.addEventListener('click', () => {
      openModal(modalTwoSubjectsA4);
      populateTwoSubjectsModal();
    });
  }

  if (btnExport2SubjectsA4Card) {
    btnExport2SubjectsA4Card.addEventListener('click', () => {
      closeModal(modalExport);
      openModal(modalTwoSubjectsA4);
      populateTwoSubjectsModal();
    });
  }

  // Download HD Image (300 DPI)
  if (btnDownloadA4Hd) {
    btnDownloadA4Hd.addEventListener('click', async () => {
      const originalText = btnDownloadA4Hd.innerHTML;
      btnDownloadA4Hd.innerHTML = '<span>⏳</span> កំពុងបង្កើតរូបភាព HD...';
      btnDownloadA4Hd.disabled = true;
      try {
        const opts = getCurrentSheetOptions();
        await TwoSubjectsA4Manager.downloadA4Image(engine, opts, 'png');
      } catch (err) {
        alert('កំហុសទាញយករូបភាព A4 HD: ' + err.message);
      } finally {
        btnDownloadA4Hd.innerHTML = originalText;
        btnDownloadA4Hd.disabled = false;
      }
    });
  }

  // Print Now Primary Action
  if (btnPrintNowPrimary) {
    btnPrintNowPrimary.addEventListener('click', () => {
      const originalText = btnPrintNowPrimary.innerHTML;
      btnPrintNowPrimary.innerHTML = '<span>⏳</span> កំពុងរៀបចំ...';
      btnPrintNowPrimary.disabled = true;
      try {
        TwoSubjectsA4Manager.executePrint(engine, {
          mode: printStudioState.mode,
          margin: printStudioState.margin,
          showCutLine: printStudioState.showCutLine,
          sub1Id: printStudioState.sub1Id,
          sub2Id: printStudioState.sub2Id,
          sub1Text: printStudioState.sub1Text,
          sub2Text: printStudioState.sub2Text
        });
      } catch (err) {
        alert('កំហុសពេលបោះពុម្ព៖ ' + err.message);
      } finally {
        setTimeout(() => {
          btnPrintNowPrimary.innerHTML = originalText;
          btnPrintNowPrimary.disabled = false;
        }, 1200);
      }
    });
  }

  // =========================================================================
  // Background Auto-Save (Every 3 seconds)
  // =========================================================================
  setInterval(() => {
    TemplateStorage.autoSave(engine.state);
  }, 3000);

  // Sync controls initially
  syncLayerControls('schoolName');

  // Auto-fit zoom on initial load to ensure canvas fits perfectly on screen
  setTimeout(() => {
    btnZoomFit.click();
  }, 150);
});

