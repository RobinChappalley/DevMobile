export default class Keyboard {
  keymap = new Map();

  constructor() {
    const keymap = this.keymap;
    window.addEventListener("keydown", (event) => {
      keymap.set(event.code);
    });

    window.addEventListener("keyup", (event) => {
      keymap.delete(event.code);
    });
  }

  isKeyDown(key) {
    return this.keymap.has(key);
  }
}
