export default class Touch {
  direction = new Map();
  constructor() {
    const direction = this.direction;

    window.addEventListener("touchstart", (event) => {
      direction.set("touchstart", {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
      console.log("touchstart", event.touches[0].clientX);
    });
    window.addEventListener("touchend", (event) => {
      direction.set("touchend", {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      });
      console.log("touchend", event.changedTouches[0].clientX);
    });

    setTimeout(console.log(this.direction), 800);
  }
}
