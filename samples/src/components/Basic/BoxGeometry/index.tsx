import React, { ReactElement, useEffect } from 'react';
import * as WebGPULib from '@WebGPULib';
import { mat4 } from 'gl-matrix';

interface IBoxGeometry {}

const BoxGeometry = (): ReactElement<IBoxGeometry> => {
  console.log('create BoxGeometry');

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
        requiredFeatures: [
          'texture-compression-bc',
        ] as Iterable<GPUFeatureName>,
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

      const boxGeometry = new WebGPULib.BoxGeometry();
      const verticesBuffer = device.createBuffer({
        size: boxGeometry.getTotalSize(), // total byte size.
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
      });

      new Float32Array(verticesBuffer.getMappedRange()).set(
        boxGeometry.getBufferGeometry()
      );
      verticesBuffer.unmap();

      const pipeline: GPURenderPipeline = device.createRenderPipeline({
        vertex: {
          module: device.createShaderModule({
            code: WebGPULib.ShaderLib.base.vertex,
          }),
          entryPoint: 'main',
          buffers: [
            {
              arrayStride: boxGeometry.getVertexSize(), // The vertex byte size.
              attributes: [
                {
                  // position
                  shaderLocation: 0,
                  offset: boxGeometry.getPositionOffset(),
                  format: 'float32x4',
                },
                {
                  // uv
                  shaderLocation: 1,
                  offset: boxGeometry.getUVOffset(),
                  format: 'float32x2',
                },
              ],
            },
          ] as Iterable<GPUVertexBufferLayout>,
        },
        fragment: {
          module: device.createShaderModule({
            code: WebGPULib.ShaderLib.base.fragment,
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
          cullMode: 'back',
        },
        depthStencil: {
          depthWriteEnabled: true,
          depthCompare: 'less',
          format: 'depth24plus',
        },
      });

      const depthTextureDescriptor: GPUTextureDescriptor = {
        size: presentationSize,
        format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
      };
      const depthTexture = device.createTexture(depthTextureDescriptor);

      const uniformBuffer = device.createBuffer({
        size: 4 * 16, // 4 * 4 float32 matrix
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      const uniformBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          {
            binding: 0,
            resource: {
              buffer: uniformBuffer,
            },
          },
        ],
      });

      const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
          {
            view: undefined, // Assigned later
            loadValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },
            storeOp: 'store',
          },
        ] as Iterable<GPURenderPassColorAttachment>,
        depthStencilAttachment: {
          view: depthTexture.createView(),
          depthLoadValue: 1.0,
          depthStoreOp: 'store',
          stencilLoadValue: 0,
          stencilStoreOp: 'store',
        },
      };

      const aspect = canvas.width / canvas.height;
      const projectionMatrix = mat4.create();
      mat4.perspective(projectionMatrix, (2 * Math.PI) / 5, aspect, 1, 100.0);

      function frame() {
        if (device === null) return;
        const commandEncoder: GPUCommandEncoder = device.createCommandEncoder();

        if (context === null) return;
        const currentTexture: GPUTexture = context.getCurrentTexture();
        const textureView: GPUTextureView = currentTexture.createView();

        const passEncoder: GPURenderPassEncoder =
          commandEncoder.beginRenderPass(renderPassDescriptor);
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

export { BoxGeometry };
