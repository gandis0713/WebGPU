/// <reference types="../../node_modules/@webgpu/types" />

// TODO :remove if updated @webgpu/types
declare interface GPURequestAdapterOptions {
  powerPreference?: GPUPowerPreference;
  forceFallbackAdapter?: boolean;
}
