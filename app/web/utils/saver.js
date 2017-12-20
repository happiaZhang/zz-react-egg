import {saveAs} from 'file-saver';

export default {
  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  },
  save2Xlsx(str, name) {
    saveAs(new Blob([this.s2ab(str)], {type: 'application/octet-stream'}), name + '.xlsx');
  }
};
