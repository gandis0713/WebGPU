class EventCallback {
    constructor(element) {
        this.element = element;
        this.initialize();
    }
    initialize() {
        this.element.addEventListener('mousedown', this.mouseDownEvent, false);
        this.element.addEventListener('mousemove', this.mouseMoveEvent, false);
        this.element.addEventListener('mouseup', this.mouseUpEvent, false);
    }
    mouseDownEvent() { }
    mouseMoveEvent() { }
    mouseUpEvent() { }
}
export default EventCallback;
