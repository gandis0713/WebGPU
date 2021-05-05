class EventCallback {
  private element;

  constructor(element) {
    this.element = element;

    this.initialize();
  }

  private initialize(): void {
    this.element.addEventListener('mousedown', this.mouseDownEvent, false);
    this.element.addEventListener('mousemove', this.mouseMoveEvent, false);
    this.element.addEventListener('mouseup', this.mouseUpEvent, false);
  }

  protected mouseDownEvent(): void {}

  protected mouseMoveEvent(): void {}

  protected mouseUpEvent(): void {}
}

export default EventCallback;
