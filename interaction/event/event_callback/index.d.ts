declare class EventCallback {
    private element;
    constructor(element: any);
    private initialize;
    protected mouseDownEvent(): void;
    protected mouseMoveEvent(): void;
    protected mouseUpEvent(): void;
}
export default EventCallback;
