import * as ShaderSource from './source';

const ShaderLib = {
  phong: {
    vertex: ShaderSource.phong_vertex,
    fragment: ShaderSource.phong_fragment,
  },
};

export { ShaderLib };
