import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import glslangModule from '../../../common/utils/glslang';

const glslShaders = {
  vertex: `#version 450
const vec2 pos[3] = vec2[3](vec2(0.0f, 0.5f), vec2(-0.5f, -0.5f), vec2(0.5f, -0.5f));

void main() {
    gl_Position = vec4(pos[gl_VertexIndex], 0.0, 1.0);
}
`,

  fragment: `#version 450
  layout(location = 0) out vec4 outColor;

  void main() {
      outColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`,
};

const wgslShaders = {
  vertex: `
const pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
    vec2<f32>(0.0, 0.5),
    vec2<f32>(-0.5, -0.5),
    vec2<f32>(0.5, -0.5));

[[stage(vertex)]]
fn main([[builtin(vertex_index)]] VertexIndex : u32)
     -> [[builtin(position)]] vec4<f32> {
  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
}
`,
  fragment: `
[[stage(fragment)]]
fn main() -> [[location(0)]] vec4<f32> {
  return vec4<f32>(1.0, 0.0, 0.0, 1.0);
}
`,
};

interface ITriangle {}
const Triangle = (): ReactElement<ITriangle> => {
  console.log('create Triangle');
  const [useWGSL, setUseWGSL] = useState<boolean>(true);

  const checkModule = useCallback(async () => {
    const { gpu }: Navigator = navigator;
    if (gpu === undefined) return;
    console.log('navigator : ', navigator);
    const adapter: GPUAdapter | null = await gpu.requestAdapter();
    console.log('adapter : ', adapter);
    if (adapter === null) return;
    const device: GPUDevice | null = await adapter.requestDevice();
    if (device === null) return;
    console.log('device : ', device);
    // console.log('device : ', device);
    const glslang = await glslangModule();
    if (glslang === undefined) return;
    console.log('glslang : ', glslang);

    const canvas: HTMLCanvasElement = document.getElementById(
      'gpucanvas'
    ) as HTMLCanvasElement;
    if (canvas === null) return;
    console.log('canvas : ', canvas);
    const context: GPUCanvasContext | null = canvas.getContext('gpupresent');
    console.log('context : ', context);

    if (context === null) return;
    const swapChainFormat: GPUTextureFormat = 'bgra8unorm';

    const swapChain: GPUSwapChain = context.configureSwapChain({
      device,
      format: swapChainFormat,
    });
    console.log('swapChain : ', swapChain);

    const pipeline: GPURenderPipeline = device.createRenderPipeline({
      vertex: {
        module: useWGSL
          ? device.createShaderModule({
              code: wgslShaders.vertex,
            })
          : device.createShaderModule({
              code: glslShaders.vertex,
              // transform: (glsl) => glslang.compileGLSL(glsl, 'vertex'),
            }),
        entryPoint: 'main',
      },
      fragment: {
        module: useWGSL
          ? device.createShaderModule({
              code: wgslShaders.fragment,
            })
          : device.createShaderModule({
              code: glslShaders.fragment,
              // transform: (glsl) => glslang.compileGLSL(glsl, 'fragment'),
            }),
        entryPoint: 'main',
        targets: [
          {
            format: swapChainFormat,
          },
        ],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });

    function frame() {
      if (device === null) return;
      const commandEncoder: GPUCommandEncoder = device.createCommandEncoder();
      const currentTexture: GPUTexture = swapChain.getCurrentTexture();
      const textureView: GPUTextureView = currentTexture.createView();

      const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
          {
            attachment: textureView,
            loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          },
        ],
      };

      const passEncoder: GPURenderPassEncoder = commandEncoder.beginRenderPass(
        renderPassDescriptor
      );
      passEncoder.setPipeline(pipeline);
      passEncoder.draw(3, 1, 0, 0);
      passEncoder.endPass();
      const commandBuffer: GPUCommandBuffer = commandEncoder.finish();

      device.queue.submit([commandBuffer]);
    }

    frame();
  }, []);
  const onMounted = function() {
    checkModule();
    console.log('mounted');
  };

  useEffect(onMounted, []);
  return (
    <>
      <canvas id="gpucanvas" width="640" height="480" />
    </>
  );
};

export default Triangle;
