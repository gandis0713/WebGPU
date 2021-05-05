abstract class AbstractWindow {
  protected container: HTMLElement;
  protected canvas: HTMLCanvasElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }
}

export default AbstractWindow;
