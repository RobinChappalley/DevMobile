export default class Keyboard {
  acceptedKeys = ["KeyW", "KeyA", "KeyS", "KeyD"];
  keymap = new Map();

  constructor() {
    const keymap = this.keymap;
    //this.acceptedKeys.forEach((key) => keymap.set(key, false));

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

  isKeyUp(key) {
    return !this.keymap.has(key);
  }
}
