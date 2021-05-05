import { ArrayType } from '../../../common/data/core';
import { mat4 } from 'gl-matrix';
class AbstractCamera {
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
    initialize() {
        mat4.lookAt(this.wcvc, this.lookAt.eye, this.lookAt.target, this.lookAt.up);
        mat4.invert(this.vcwc, this.wcvc);
    }
    setLootAt(lookAt) {
        this.lookAt = lookAt;
    }
    setSize(left, right, bottom, top) {
        this.frustum.left = left;
        this.frustum.right = right;
        this.frustum.bottom = bottom;
        this.frustum.top = top;
    }
    setHorizontalSize(left, right) {
        this.frustum.left = left;
        this.frustum.right = right;
    }
    setVerticalSize(bottom, top) {
        this.frustum.bottom = bottom;
        this.frustum.top = top;
    }
    setFrustum(frustum) {
        this.frustum = frustum;
    }
    getWCPC() {
        return this.wcpc;
    }
    getVCPC() {
        return this.vcpc;
    }
}
export default AbstractCamera;
