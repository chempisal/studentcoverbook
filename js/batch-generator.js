/**
 * Batch Student Cover & A4 Classroom Printing Engine
 * Designed for Cambodian school teachers to generate, preview, and print 30-50 student covers in seconds.
 */

const DEFAULT_KHMER_CLASS_ROSTER = [
  { studentName: 'រស់ សុវណ្ណរចនា', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០០១' },
  { studentName: 'ជា ប៊ុនថន', studentInfoExtra: 'ភេទ ៖ ប្រុស   |   អត្តលេខ ៖ ០០២' },
  { studentName: 'សុខ ចាន់ណា', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០០៣' },
  { studentName: 'ម៉ៅ វិច្ឆិកា', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០០៤' },
  { studentName: 'រ័ត្ន ពិសិដ្ឋ', studentInfoExtra: 'ភេទ ៖ ប្រុស   |   អត្តលេខ ៖ ០០៥' },
  { studentName: 'កែវ សុជាតា', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០០៦' },
  { studentName: 'ឈឹម ចិន្តា', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០០៧' },
  { studentName: 'ហេង គឹមសាន', studentInfoExtra: 'ភេទ ៖ ប្រុស   |   អត្តលេខ ៖ ០០៨' },
  { studentName: 'លី ស្រីម៉ៅ', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០០៩' },
  { studentName: 'អ៊ុំ សារ៉ាត', studentInfoExtra: 'ភេទ ៖ ប្រុស   |   អត្តលេខ ៖ ០១០' },
  { studentName: 'សេង មុនីរ័ត្ន', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០១១' },
  { studentName: 'ប៉ែន សុភាព', studentInfoExtra: 'ភេទ ៖ ប្រុស   |   អត្តលេខ ៖ ០១២' },
  { studentName: 'ទ្រី វណ្ណា', studentInfoExtra: 'ភេទ ៖ ប្រុស   |   អត្តលេខ ៖ ០១៣' },
  { studentName: 'វ៉ាន់ សុខុម', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០១៤' },
  { studentName: 'ព្រុំ ដារ៉ា', studentInfoExtra: 'ភេទ ៖ ប្រុស   |   អត្តលេខ ៖ ០១៥' },
  { studentName: 'ឡុង ធីតា', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០១៦' },
  { studentName: 'អេង សម្បត្តិ', studentInfoExtra: 'ភេទ ៖ ប្រុស   |   អត្តលេខ ៖ ០១៧' },
  { studentName: 'ជុំ រស្មី', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០១៨' },
  { studentName: 'នួន សុផល', studentInfoExtra: 'ភេទ ៖ ប្រុស   |   អត្តលេខ ៖ ០១៩' },
  { studentName: 'ឃឹម ចរិយា', studentInfoExtra: 'ភេទ ៖ ស្រី   |   អត្តលេខ ៖ ០២០' }
];

const BatchGenerator = {
  students: [...DEFAULT_KHMER_CLASS_ROSTER],

  parseCSV(rawText) {
    if (!rawText || !rawText.trim()) return [];
    const lines = rawText.trim().split(/\r?\n/);
    const result = [];

    lines.forEach((line, idx) => {
      if (!line.trim()) return;
      // Split by tab or comma
      const parts = line.split(/[,\t]/).map(p => p.trim().replace(/^["']|["']$/g, ''));
      if (parts.length >= 1 && parts[0]) {
        // If header line like "ឈ្មោះ", skip
        if (idx === 0 && (parts[0].includes('ឈ្មោះ') || parts[0].toLowerCase().includes('name'))) return;

        const name = parts[0];
        const gender = parts[1] || '';
        const id = parts[2] || '';
        let extra = '';
        if (gender && id) {
          extra = `ភេទ ៖ ${gender}   |   អត្តលេខ ៖ ${id}`;
        } else if (gender) {
          extra = `ភេទ ៖ ${gender}`;
        } else if (id) {
          extra = `អត្តលេខ ៖ ${id}`;
        }

        result.push({
          studentName: name.startsWith('ឈ្មោះ') ? name : `ឈ្មោះ ៖ ${name}`,
          studentInfoExtra: extra || 'ភេទ ៖ ....  |  អត្តលេខ ៖ ....'
        });
      }
    });

    return result;
  },

  /**
   * Build complete printable HTML with 2 covers per A4 sheet
   */
  async generatePrintHtml(engine, studentList) {
    const list = studentList && studentList.length > 0 ? studentList : this.students;
    const baseState = JSON.parse(JSON.stringify(engine.state));

    let pagesHtml = '';
    const tempEngine = new BookCoverCanvasEngine(document.createElement('div').id = 'dummy-print-div');

    for (let i = 0; i < list.length; i += 2) {
      const student1 = list[i];
      const student2 = list[i + 1] || null;

      // Render cover 1
      tempEngine.state = JSON.parse(JSON.stringify(baseState));
      tempEngine.state.layers.studentName.text = student1.studentName;
      if (student1.studentInfoExtra) {
        tempEngine.state.layers.studentInfoExtra.text = student1.studentInfoExtra;
      }
      tempEngine.render();
      const svg1 = tempEngine.svgElement.outerHTML;

      // Render cover 2
      let svg2 = '';
      if (student2) {
        tempEngine.state = JSON.parse(JSON.stringify(baseState));
        tempEngine.state.layers.studentName.text = student2.studentName;
        if (student2.studentInfoExtra) {
          tempEngine.state.layers.studentInfoExtra.text = student2.studentInfoExtra;
        }
        tempEngine.render();
        svg2 = tempEngine.svgElement.outerHTML;
      }

      pagesHtml += `
        <div class="print-page-sheet">
          <div class="print-cover-slot slot-top">
            ${svg1}
          </div>
          <!-- Cutting Guide Line -->
          <div class="print-cutting-line">
            <span class="scissor-icon">✂️ ------------------ បន្ទាត់កាត់ (Cut Here) ------------------ ✂️</span>
          </div>
          <div class="print-cover-slot slot-bottom">
            ${svg2}
          </div>
        </div>
      `;
    }

    return pagesHtml;
  }
};

