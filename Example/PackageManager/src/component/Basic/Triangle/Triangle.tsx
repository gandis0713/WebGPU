import React, { ReactElement, useCallback, useEffect } from 'react';
import glslangModule from '@webgpu/glslang/dist/web-devel/glslang';

interface ITryangle {}
const Triangle = (): ReactElement<ITryangle> => {
  console.log('create Triangle');

  const checkModule = useCallback(async () => {
    const { gpu }: Navigator = navigator;
    if (gpu === undefined) return;
    console.log('navigator : ', navigator);
    const adapter: GPUAdapter | null = await gpu.requestAdapter();
    console.log('adapter : ', adapter);
    if (adapter === null) return;
    const device: GPUDevice | null = await adapter.requestDevice();
    console.log('device : ', device);
    // console.log('device : ', device);
    const glslang = await glslangModule();
  }, []);
  const onMounted = function() {
    checkModule();
    console.log('mounted');
  };

  useEffect(onMounted, []);
  return (
    <>
      <canvas id="_glcanvas" width="640" height="480" />
    </>
  );
};

export default Triangle;
