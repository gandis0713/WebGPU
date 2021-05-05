import { Mat4, ArrayType } from '../../../common/Data/Core';
import { mat4 } from 'gl-matrix';
import { ILootAt, IFrustum } from './define';

abstract class AbstractCamera {
  protected lookAt: ILootAt;
  protected frustum: IFrustum;

  protected wcvc: Mat4;
  protected vcwc: Mat4;
  protected vcpc: Mat4;
  protected pcvc: Mat4;
  protected wcpc: Mat4;
  protected pcwc: Mat4;

  constructor() {
    this.lookAt = {
      eye: new ArrayType([0, 0, 1]),
      up: new ArrayType([0, 1, 0]),
      target: new ArrayType([0, 0, 0]),
    };

    this.frustum = {
      left: -250,
      right: 250,
      bottom: -250,
      top: 250,
      near: 1000,
      far: -1000,
    };

    this.wcvc = new ArrayType(16);
    this.vcwc = new ArrayType(16);
    this.vcpc = new ArrayType(16);
    this.pcvc = new ArrayType(16);
    this.wcpc = new ArrayType(16);
    this.pcwc = new ArrayType(16);

    this.initialize();
  }

  protected initialize(): void {
    mat4.lookAt(this.wcvc, this.lookAt.eye, this.lookAt.target, this.lookAt.up);
    mat4.invert(this.vcwc, this.wcvc);
  }

  protected abstract setProperty(): void;

  public setLootAt(lookAt: ILootAt): void {
    this.lookAt = lookAt;
  }

  public setSize(
    left: number,
    right: number,
    bottom: number,
    top: number
  ): void {
    this.frustum.left = left;
    this.frustum.right = right;
    this.frustum.bottom = bottom;
    this.frustum.top = top;
  }

  public setHorizontalSize(left: number, right: number): void {
    this.frustum.left = left;
    this.frustum.right = right;
  }

  public setVerticalSize(bottom: number, top: number): void {
    this.frustum.bottom = bottom;
    this.frustum.top = top;
  }

  public setFrustum(frustum: IFrustum): void {
    this.frustum = frustum;
  }

  public getWCPC(): Mat4 {
    return this.wcpc;
  }

  public getVCPC(): Mat4 {
    return this.vcpc;
  }
}

export default AbstractCamera;
