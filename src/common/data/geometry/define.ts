export enum NORMAL_TYPE {
  vertex = 0,
  face = 1,
}

export interface AbstractGeometryProp {
  normalType?: NORMAL_TYPE;
}
