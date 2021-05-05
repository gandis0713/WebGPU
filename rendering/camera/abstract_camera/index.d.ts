import { Mat4 } from '../../../common/data/core';
import { ILootAt, IFrustum } from './define';
declare abstract class AbstractCamera {
    protected lookAt: ILootAt;
    protected frustum: IFrustum;
    protected wcvc: Mat4;
    protected vcwc: Mat4;
    protected vcpc: Mat4;
    protected pcvc: Mat4;
    protected wcpc: Mat4;
    protected pcwc: Mat4;
    constructor();
    protected initialize(): void;
    protected abstract setProperty(): void;
    setLootAt(lookAt: ILootAt): void;
    setSize(left: number, right: number, bottom: number, top: number): void;
    setHorizontalSize(left: number, right: number): void;
    setVerticalSize(bottom: number, top: number): void;
    setFrustum(frustum: IFrustum): void;
    getWCPC(): Mat4;
    getVCPC(): Mat4;
}
export default AbstractCamera;
