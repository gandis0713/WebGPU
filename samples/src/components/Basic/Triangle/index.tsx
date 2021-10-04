import React, { ReactElement, useEffect } from 'react';
import wgslVertex from './wgsl/vertex.wgsl';
import * as Engine from '../../../../../engine/build';

interface ITriangle {}
const Triangle = (): ReactElement<ITriangle> => {
  console.log('create Triangle');

  const onMounted = function () {
    const run = async () => {
      const { gpu }: Navigator = navigator;
      if (gpu === undefined) return;
      console.log('navigator : ', navigator);
      const adaptorOptions: GPURequestAdapterOptions = {
        powerPreference: 'low-power', // 'low-power', 'high-performance'
        forceFallbackAdapter: false,
      };
      const adapter: GPUAdapter | null = await gpu.requestAdapter(
        adaptorOptions
      );
      console.log('adapter : ', adapter);
      if (adapter === null) return;
      const features: GPUSupportedFeatures = adapter.features;
      console.log('features : ', features);
      features.forEach((feature) => {
        console.log('feature : ', feature);
      });
      if (adapter === null) return;
      const deviceDescriptor: GPUDeviceDescriptor = {
        requiredFeatures: ['texture-compression-bc'],
        requiredLimits: {
          maxInterStageShaderComponents: 60,
        },
      };
      const device: GPUDevice | null = await adapter.requestDevice(
        deviceDescriptor
      );
      if (device === null) return;
      console.log('device : ', device);
      console.log('device.queue : ', device.queue);

      const canvas: HTMLCanvasElement = document.getElementById(
        'gpucanvas'
      ) as HTMLCanvasElement;
      if (canvas === null) return;
      console.log('canvas : ', canvas);
      const context: GPUCanvasContext | null = canvas.getContext('webgpu');
      console.log('context : ', context);
      if (context === null) return;

      const presentationFormat = context.getPreferredFormat(adapter);
      console.log('presentationFormat : ', presentationFormat);
      const devicePixelRatio = window.devicePixelRatio || 1;
      const presentationSize = [
        canvas.clientWidth * devicePixelRatio,
        canvas.clientHeight * devicePixelRatio,
      ];

      context.configure({
        device,
        format: presentationFormat,
        size: presentationSize,
      });

      const pipeline: GPURenderPipeline = device.createRenderPipeline({
        vertex: {
          module: device.createShaderModule({
            code: wgslVertex,
          }),
          entryPoint: 'main',
        },
        fragment: {
          module: device.createShaderModule({
            code: Engine.ShaderLib.phong,
          }),
          entryPoint: 'main',
          targets: [
            {
              format: presentationFormat,
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

        if (context === null) return;
        const currentTexture: GPUTexture = context.getCurrentTexture();
        const textureView: GPUTextureView = currentTexture.createView();

        const renderPassDescriptor: GPURenderPassDescriptor = {
          colorAttachments: [
            {
              view: textureView,
              loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
              storeOp: 'store',
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
        requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    };

    run();
  };

  useEffect(onMounted, []);
  return (
    <>
      <canvas id="gpucanvas" width="640" height="480" />
    </>
  );
};

export { Triangle };
