import AbstractCamera from '../AbstractCamera';
import { mat4 } from 'gl-matrix';

class OrthoGraphicCamera extends AbstractCamera {
  protected setProperty(): void {
    mat4.ortho(
      this.vcpc,
      this.frustum.left,
      this.frustum.right,
      this.frustum.bottom,
      this.frustum.top,
      this.frustum.near,
      this.frustum.far
    );

    mat4.invert(this.pcvc, this.vcpc);
    mat4.multiply(this.wcpc, this.vcpc, this.wcvc);
    mat4.invert(this.pcwc, this.wcpc);
  }

  public setSize(
    left: number,
    right: number,
    bottom: number,
    top: number
  ): void {
    super.setSize(left, right, bottom, top);
    this.setProperty();
  }

  public setHorizontalSize(width: number, height: number): void {
    super.setHorizontalSize(width, height);
    this.setProperty();
  }

  public setVerticalSize(bottom: number, top: number): void {
    super.setVerticalSize(bottom, top);
    this.setProperty();
  }
}

export default OrthoGraphicCamera;
