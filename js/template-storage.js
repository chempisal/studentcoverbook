/**
 * Template Storage & URL Sharing Manager
 */

const TemplateStorage = {
  key: 'khmer_bookcover_autosave_v3',

  autoSave(state) {
    try {
      localStorage.setItem(this.key, JSON.stringify(state));
      return true;
    } catch (e) {
      console.warn('Auto-save failed:', e);
      return false;
    }
  },

  loadAutoSave() {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Load auto-save failed:', e);
      return null;
    }
  },

  clearAutoSave() {
    localStorage.removeItem(this.key);
  },

  exportToFile(state, name = 'Khmer-Book-Cover') {
    const cleanName = (name || 'cover').replace(/[/\\?%*:|"<>]/g, '-');
    const jsonStr = JSON.stringify({
      app: 'KhmerBookCoverStudioPro',
      version: '3.0',
      exportedAt: new Date().toISOString(),
      state: state
    }, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cleanName}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  async importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed.state) {
            resolve(parsed.state);
          } else if (parsed.layers) {
            resolve(parsed);
          } else {
            reject(new Error('ទម្រង់ឯកសារ JSON មិនត្រឹមត្រូវ'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('បរាជ័យក្នុងការអានឯកសារ'));
      reader.readAsText(file);
    });
  },

  generateShareUrl(state) {
    try {
      const clean = JSON.parse(JSON.stringify(state));
      if (clean.customFrame) clean.customFrame.src = null;
      if (clean.studentPhoto) clean.studentPhoto.src = null;

      const str = JSON.stringify(clean);
      const encoded = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode('0x' + p1);
      }));
      return `${window.location.origin}${window.location.pathname}#cover=${encoded}`;
    } catch (e) {
      console.warn('Share URL error:', e);
      return null;
    }
  },

  loadFromUrlHash() {
    const hash = window.location.hash;
    if (!hash || !hash.includes('#cover=')) return null;
    try {
      const encoded = hash.split('#cover=')[1];
      const str = decodeURIComponent(Array.prototype.map.call(atob(encoded), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(str);
    } catch (e) {
      console.warn('Failed parsing template from URL hash:', e);
      return null;
    }
  }
};

