import AbstractCamera from '../abstract_camera';
declare class OrthoGraphicCamera extends AbstractCamera {
    protected setProperty(): void;
    setSize(left: number, right: number, bottom: number, top: number): void;
    setHorizontalSize(width: number, height: number): void;
    setVerticalSize(bottom: number, top: number): void;
}
export default OrthoGraphicCamera;
