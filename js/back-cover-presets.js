/**
 * Back Cover Contents & Educational Templates (ក្របក្រោយសៀវភៅសិស្ស)
 * Authentic Cambodian Notebook Back-Cover Layouts:
 * 1. Multiplication Table (តារាងមេគុណលេខ ២-៩)
 * 2. School Rules (បទបញ្ជាផ្ទៃក្នុងសាលារៀន)
 * 3. National Anthem "Nokoreach" (បទចម្រៀងជាតិ នគររាជ)
 * 4. Weekly Timetable (កាលវិភាគប្រចាំសប្ដាហ៍)
 */

const BACK_COVER_PRESETS = [
  {
    id: 'multiplication-table',
    name: 'តារាងមេគុណលេខ (២ ដល់ ៩)',
    subtitle: 'Multiplication Tables 2-9',
    desc: 'រូបមន្តមេលេខ ២ ដល់ ៩ សម្រាប់កុមារអនុវត្ត',
    icon: '✖️',
    title: 'តារាងមេគុណលេខ',
    renderSvg(w, h) {
      const cols = 4;
      const rows = 2;
      const padX = 36;
      const padY = 115;
      const gapX = 10;
      const gapY = 16;
      const tableW = (w - padX * 2 - (cols - 1) * gapX) / cols;
      const tableH = (h - padY - 80 - gapY) / rows;
      
      let html = `
        <!-- Title Banner -->
        <g transform="translate(${w / 2}, 68)">
          <rect x="-170" y="-22" width="340" height="44" rx="22" fill="#1e40af" stroke="#ffd700" stroke-width="2" filter="url(#card-shadow)" />
          <text x="0" y="8" font-family="'Moul', 'Khmer OS Muol', cursive" font-size="18" fill="#ffffff" text-anchor="middle">
            តារាងមេគុណលេខ
          </text>
        </g>
      `;

      const nums = [2, 3, 4, 5, 6, 7, 8, 9];
      const colors = ['#0284c7', '#059669', '#d97706', '#dc2626', '#7c3aed', '#db2777', '#0891b2', '#475569'];

      nums.forEach((n, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const tx = padX + col * (tableW + gapX);
        const ty = padY + row * (tableH + gapY);
        const color = colors[idx];

        html += `
          <g transform="translate(${tx}, ${ty})">
            <!-- Box Container -->
            <rect x="0" y="0" width="${tableW}" height="${tableH}" rx="8" fill="#ffffff" stroke="${color}" stroke-width="2" />
            <!-- Header Tab -->
            <rect x="0" y="0" width="${tableW}" height="28" rx="8" fill="${color}" />
            <rect x="0" y="18" width="${tableW}" height="10" fill="${color}" />
            <text x="${tableW / 2}" y="19" font-family="'Koulen', sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">
              មេ ${n}
            </text>

            <!-- Lines 1 to 10 -->
            <g font-family="'Battambang', sans-serif" font-size="11" font-weight="600" fill="#1e293b">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(multiplier => {
                const lineY = 46 + (multiplier - 1) * ((tableH - 52) / 9.5);
                const result = n * multiplier;
                return `
                  <text x="10" y="${lineY}" text-anchor="start">${n} × ${multiplier}</text>
                  <text x="${tableW * 0.52}" y="${lineY}" text-anchor="middle">=</text>
                  <text x="${tableW - 10}" y="${lineY}" text-anchor="end" font-weight="700" fill="${color}">${result}</text>
                `;
              }).join('')}
            </g>
          </g>
        `;
      });

      // Bottom Motto
      html += `
        <g transform="translate(${w / 2}, ${h - 32})">
          <text font-family="'Koulen', sans-serif" font-size="13" fill="#64748b" text-anchor="middle">
            📖 គណិតវិទ្យាជួយបណ្ដុះបញ្ញា និងការគិតប្រកបដោយហេតុផល
          </text>
        </g>
      `;

      return html;
    }
  },

  {
    id: 'school-rules',
    name: 'បទបញ្ជាផ្ទៃក្នុងសាលារៀន',
    subtitle: 'Primary School Discipline Code',
    desc: 'ក្រមសីលធម៌ និងវិន័យសិស្សបឋមសិក្សា',
    icon: '📜',
    title: 'បទបញ្ជាផ្ទៃក្នុងសាលាបឋមសិក្សា',
    renderSvg(w, h) {
      const rules = [
        { num: '១', text: 'គោរពទង់ជាតិ ភ្លេងជាតិ ថ្នាក់ដឹកនាំ លោកគ្រូ-អ្នកគ្រូ និងចាស់ទុំ' },
        { num: '២', text: 'មកសាលារៀនឱ្យបានទៀងទាត់ និងទាន់ពេលវេលា (យ៉ាងហោច ១៥ នាទីមុន)' },
        { num: '៣', text: 'ស្លៀកពាក់ឯកសណ្ឋានសិស្សឱ្យបានត្រឹមត្រូវ ស្អាតបាត និងសមរម្យ' },
        { num: '៤', text: 'ខិតខំត្រាប់ស្តាប់ការបង្រៀន ធ្វើកិច្ចការផ្ទះ និងមេរៀនឱ្យបានទៀងទាត់' },
        { num: '៥', text: 'ថែរក្សាអនាម័យផ្ទាល់ខ្លួន បន្ទប់រៀន និងបរិស្ថានជុំវិញសាលា' },
        { num: '៦', text: 'ថែរក្សាទ្រព្យសម្បត្តិរួមរបស់សាលា តុ កៅអី សៀវភៅ និងសម្ភារសិក្សា' },
        { num: '៧', text: 'មានសាមគ្គីភាពល្អជាមួយមិត្តភក្តិ មិនឈ្លោះប្រកែក ឬប្រើហិង្សា' },
        { num: '៨', text: 'មិនសេពគ្រឿងញៀន មិនជក់បារី និងមិនលេងល្បែងស៊ីសងគ្រប់ប្រភេទ' },
        { num: '៩', text: 'អនុវត្តពាក្យស្លោក ៖ កូនល្អ សិស្សល្អ មិត្តល្អ ពលរដ្ឋល្អ' }
      ];

      let html = `
        <!-- Title Box -->
        <g transform="translate(${w / 2}, 65)">
          <rect x="-190" y="-24" width="380" height="48" rx="24" fill="#065f46" stroke="#ffd700" stroke-width="2" filter="url(#card-shadow)" />
          <text x="0" y="8" font-family="'Moul', 'Khmer OS Muol', cursive" font-size="17" fill="#ffffff" text-anchor="middle">
            បទបញ្ជាផ្ទៃក្នុងសាលាបឋមសិក្សា
          </text>
        </g>

        <!-- Subtitle -->
        <text x="${w / 2}" y="115" font-family="'Koulen', sans-serif" font-size="13.5" fill="#047857" text-anchor="middle">
          ★ សេចក្ដីណែនាំអំពីវិន័យ និងការសិក្សារបស់សិស្សានុសិស្ស ★
        </text>

        <!-- Rules Cards -->
        <g transform="translate(44, 138)">
          ${rules.map((r, i) => {
            const cardY = i * 66;
            return `
              <g transform="translate(0, ${cardY})">
                <rect x="0" y="0" width="${w - 88}" height="54" rx="8" fill="#f0fdf4" stroke="#a7f3d0" stroke-width="1.2" />
                <!-- Number Badge -->
                <circle cx="28" cy="27" r="16" fill="#059669" />
                <text x="28" y="32" font-family="'Koulen', sans-serif" font-size="15" fill="#ffffff" text-anchor="middle">${r.num}</text>
                <!-- Rule Text -->
                <text x="56" y="32" font-family="'Battambang', sans-serif" font-size="12.5" font-weight="600" fill="#064e3b">
                  ${r.text}
                </text>
              </g>
            `;
          }).join('')}
        </g>

        <!-- Bottom Signature Zone -->
        <g transform="translate(${w / 2}, ${h - 40})">
          <text font-family="'Koulen', sans-serif" font-size="13" fill="#047857" text-anchor="middle">
            សិស្សល្អ នាំមកនូវមោទនភាពចំពោះគ្រួសារ សាលារៀន និងសង្គមជាតិ!
          </text>
        </g>
      `;

      return html;
    }
  },

  {
    id: 'national-anthem',
    name: 'បទចម្រៀងជាតិ "នគររាជ"',
    subtitle: 'National Anthem of Cambodia',
    desc: 'ទំនុកច្រៀងគោរពទង់ជាតិពេញលេញ ៣ វគ្គ',
    icon: '🎵',
    title: 'បទចម្រៀងគោរពទង់ជាតិ "នគររាជ"',
    renderSvg(w, h) {
      return `
        <!-- Title Box -->
        <g transform="translate(${w / 2}, 65)">
          <rect x="-170" y="-24" width="340" height="48" rx="24" fill="#1e3a8a" stroke="#ffd700" stroke-width="2" filter="url(#card-shadow)" />
          <text x="0" y="8" font-family="'Moul', 'Khmer OS Muol', cursive" font-size="18" fill="#ffffff" text-anchor="middle">
            បទចម្រៀងជាតិ នគររាជ
          </text>
        </g>

        <!-- Top Angkor Crest -->
        <g transform="translate(${w / 2}, 115) scale(0.65)">
          ${KhmerGraphics.createAngkorWat(140, 50, '#d97706')}
        </g>

        <!-- Verse 1 -->
        <g transform="translate(${w / 2}, 190)" text-anchor="middle" font-family="'Battambang', sans-serif">
          <rect x="-240" y="-12" width="480" height="155" rx="12" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.2" />
          <text y="16" font-family="'Koulen', sans-serif" font-size="15" fill="#1d4ed8">-- វគ្គទី ១ --</text>
          <text y="46" font-size="13" font-weight="600" fill="#1e293b">សូមពួកទេវតា រក្សាមហាក្សត្រយើង</text>
          <text y="72" font-size="13" font-weight="600" fill="#1e293b">ឱ្យបានរុងរឿង ដោយជ័យមង្គល សិរីសួស្តី</text>
          <text y="98" font-size="13" font-weight="600" fill="#1e293b">យើងខ្ញុំព្រះអង្គ សូមជ្រកក្រោមម្លប់ ព្រះបារមី</text>
          <text y="124" font-size="13" font-weight="600" fill="#1e293b">នៃព្រះធម្មរាជ សម្បត្តិមហាក្សត្រ ចារ្យចែងនគរ។</text>
        </g>

        <!-- Verse 2 -->
        <g transform="translate(${w / 2}, 375)" text-anchor="middle" font-family="'Battambang', sans-serif">
          <rect x="-240" y="-12" width="480" height="155" rx="12" fill="#fef2f2" stroke="#fecaca" stroke-width="1.2" />
          <text y="16" font-family="'Koulen', sans-serif" font-size="15" fill="#dc2626">-- វគ្គទី ២ --</text>
          <text y="46" font-size="13" font-weight="600" fill="#1e293b">ប្រាសាទសិលា កំបាំងកណ្ដាលព្រៃ</text>
          <text y="72" font-size="13" font-weight="600" fill="#1e293b">គួរឱ្យស្រមៃ នឹកដល់យសស័ក្តិ មហានគរ</text>
          <text y="98" font-size="13" font-weight="600" fill="#1e293b">ជាតិខ្មែរដូចថ្ម គង់វង្សនៅល្អ រឹងប៉ឹងជំហរ</text>
          <text y="124" font-size="13" font-weight="600" fill="#1e293b">យើងសង្ឃឹមពរ ភ័ព្វព្រេងសំណាង របស់កម្ពុជា។</text>
        </g>

        <!-- Verse 3 -->
        <g transform="translate(${w / 2}, 560)" text-anchor="middle" font-family="'Battambang', sans-serif">
          <rect x="-240" y="-12" width="480" height="155" rx="12" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.2" />
          <text y="16" font-family="'Koulen', sans-serif" font-size="15" fill="#16a34a">-- វគ្គទី ៣ --</text>
          <text y="46" font-size="13" font-weight="600" fill="#1e293b">គ្រប់វត្តអារាម ឮតែសូរស័ព្ទធម៌</text>
          <text y="72" font-size="13" font-weight="600" fill="#1e293b">ស្រេកដោយអំណរ រំឭកគុណពុទ្ធសាសនា</text>
          <text y="98" font-size="13" font-weight="600" fill="#1e293b">ចូរយើងជាអ្នក ជឿជាក់ស្មោះស្ម័គ្រ តាមបែបដូនតា</text>
          <text y="124" font-size="13" font-weight="600" fill="#1e293b">គង់តែទេវតា នឹងជួយជ្រោមជ្រែង ផ្គត់ផ្គង់ខ្មែរយើង។</text>
        </g>

        <!-- Bottom Tag -->
        <text x="${w / 2}" y="${h - 36}" font-family="'Koulen', sans-serif" font-size="14" fill="#1e3a8a" text-anchor="middle">
          🇰🇭 ជាតិ សាសនា ព្រះមហាក្សត្រ 🇰🇭
        </text>
      `;
    }
  },

  {
    id: 'weekly-timetable',
    name: 'កាលវិភាគប្រចាំសប្ដាហ៍',
    subtitle: 'Weekly Class Schedule',
    desc: 'តារាងម៉ោងសិក្សា ចន្ទ ដល់ សៅរ៍',
    icon: '📅',
    title: 'កាលវិភាគសិក្សាប្រចាំសប្ដាហ៍',
    renderSvg(w, h) {
      const days = ['ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
      const periods = ['ម៉ោងទី ១', 'ម៉ោងទី ២', 'ម៉ោងទី ៣', 'ម៉ោងទី ៤', 'ម៉ោងទី ៥'];
      const padX = 40;
      const padY = 120;
      const gridW = w - padX * 2;
      const colW = gridW / (days.length + 1);
      const rowH = (h - padY - 90) / (periods.length + 1);

      let html = `
        <!-- Title Banner -->
        <g transform="translate(${w / 2}, 68)">
          <rect x="-180" y="-22" width="360" height="44" rx="22" fill="#7c3aed" stroke="#ffd700" stroke-width="2" filter="url(#card-shadow)" />
          <text x="0" y="8" font-family="'Moul', 'Khmer OS Muol', cursive" font-size="17" fill="#ffffff" text-anchor="middle">
            កាលវិភាគប្រចាំសប្ដាហ៍
          </text>
        </g>

        <!-- Timetable Table Grid -->
        <g transform="translate(${padX}, ${padY})">
          <!-- Header Row -->
          <rect x="0" y="0" width="${gridW}" height="${rowH}" fill="#ede9fe" rx="6" />
          <rect x="0" y="0" width="${colW}" height="${rowH}" fill="#7c3aed" rx="6" />
          <text x="${colW / 2}" y="${rowH / 2 + 5}" font-family="'Koulen', sans-serif" font-size="13" fill="#ffffff" text-anchor="middle">ម៉ោង / ថ្ងៃ</text>

          ${days.map((d, i) => `
            <text x="${colW * (i + 1.5)}" y="${rowH / 2 + 5}" font-family="'Koulen', sans-serif" font-size="13" fill="#5b21b6" text-anchor="middle">${d}</text>
          `).join('')}

          <!-- Grid Rows -->
          ${periods.map((p, row) => {
            const y = (row + 1) * rowH;
            return `
              <rect x="0" y="${y}" width="${gridW}" height="${rowH}" fill="${row % 2 === 0 ? '#ffffff' : '#f5f3ff'}" stroke="#ddd6fe" stroke-width="0.8" />
              <rect x="0" y="${y}" width="${colW}" height="${rowH}" fill="#8b5cf6" opacity="0.15" />
              <text x="${colW / 2}" y="${y + rowH / 2 + 4}" font-family="'Battambang', sans-serif" font-size="11" font-weight="600" fill="#4c1d95" text-anchor="middle">
                ${p}
              </text>
              ${days.map((_, col) => `
                <line x1="${colW * (col + 1)}" y1="${y}" x2="${colW * (col + 1)}" y2="${y + rowH}" stroke="#ddd6fe" stroke-width="0.8" />
              `).join('')}
            `;
          }).join('')}
        </g>

        <!-- Bottom Notes -->
        <text x="${w / 2}" y="${h - 36}" font-family="'Koulen', sans-serif" font-size="13" fill="#6d28d9" text-anchor="middle">
          ★ គោរពពេលវេលា នាំមកនូវជោគជ័យក្នុងការសិក្សា ★
        </text>
      `;

      return html;
    }
  }
];
