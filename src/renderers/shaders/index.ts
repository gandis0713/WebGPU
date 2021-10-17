import * as ShaderSource from './source';

const ShaderLib = {
  noinput: {
    vertex: ShaderSource.noinput_vertex,
    fragment: ShaderSource.noinput_fragment,
  },
  base: {
    vertex: ShaderSource.base_vertex,
    fragment: ShaderSource.base_fragment,
  },
};

export { ShaderLib };
