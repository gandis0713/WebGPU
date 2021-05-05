import { VertexArray, VertexIndexArray } from '../../core';
import { NORMAL_TYPE } from '../define';

export interface AbstractGeometryProp {
  normalType?: NORMAL_TYPE;
}

export abstract class AbstractGeometry {
  // identity
  private id: string;

  // prop
  protected normalType: NORMAL_TYPE = NORMAL_TYPE.face;

  // data
  protected vertexArray: VertexArray = [];
  protected triangleIndexArray: VertexIndexArray = [];
  protected lineIndexArray: VertexIndexArray = [];

  constructor(prop?: AbstractGeometryProp) {
    if (!prop) return;

    this.normalType = prop.normalType;
  }

  public getVertexArray(): VertexArray {
    return this.vertexArray;
  }

  public getTriangleIndexArray(): VertexIndexArray {
    return this.triangleIndexArray;
  }

  public getLineIndexArray(): VertexIndexArray {
    return this.lineIndexArray;
  }

  protected build(): void {}
}
