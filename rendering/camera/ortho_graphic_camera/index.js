import AbstractCamera from '../abstract_camera';
import { mat4 } from 'gl-matrix';
class OrthoGraphicCamera extends AbstractCamera {
    setProperty() {
        mat4.ortho(this.vcpc, this.frustum.left, this.frustum.right, this.frustum.bottom, this.frustum.top, this.frustum.near, this.frustum.far);
        mat4.invert(this.pcvc, this.vcpc);
        mat4.multiply(this.wcpc, this.vcpc, this.wcvc);
        mat4.invert(this.pcwc, this.wcpc);
    }
    setSize(left, right, bottom, top) {
        super.setSize(left, right, bottom, top);
        this.setProperty();
    }
    setHorizontalSize(width, height) {
        super.setHorizontalSize(width, height);
        this.setProperty();
    }
    setVerticalSize(bottom, top) {
        super.setVerticalSize(bottom, top);
        this.setProperty();
    }
}
export default OrthoGraphicCamera;
