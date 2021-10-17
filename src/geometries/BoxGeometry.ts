type TypedArray = Float32Array;

class BoxGeometry {

  private bufferGeometry_: TypedArray;
  
  private positionOffset_: number;
  
  private colorOffset_: number;
  
  private uvOffset_: number;
  
  private vertexCount_: number;

  private byteSize_: number;

  private vertexSize_: number;

  constructor() {
    console.log("this.bufferGeometry_ : ", this.bufferGeometry_);
    this.bufferGeometry_ = new Float32Array([
      // float4 position, float4 color, float2 uv,
      1, -1, 1, 1,   1, 0, 1, 1,  1, 1,
      -1, -1, 1, 1,  0, 0, 1, 1,  0, 1,
      -1, -1, -1, 1, 0, 0, 0, 1,  0, 0,
      1, -1, -1, 1,  1, 0, 0, 1,  1, 0,
      1, -1, 1, 1,   1, 0, 1, 1,  1, 1,
      -1, -1, -1, 1, 0, 0, 0, 1,  0, 0,
    
      1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
      1, -1, 1, 1,   1, 0, 1, 1,  0, 1,
      1, -1, -1, 1,  1, 0, 0, 1,  0, 0,
      1, 1, -1, 1,   1, 1, 0, 1,  1, 0,
      1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
      1, -1, -1, 1,  1, 0, 0, 1,  0, 0,
    
      -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,
      1, 1, 1, 1,    1, 1, 1, 1,  0, 1,
      1, 1, -1, 1,   1, 1, 0, 1,  0, 0,
      -1, 1, -1, 1,  0, 1, 0, 1,  1, 0,
      -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,
      1, 1, -1, 1,   1, 1, 0, 1,  0, 0,
    
      -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,
      -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,
      -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
      -1, -1, -1, 1, 0, 0, 0, 1,  1, 0,
      -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,
      -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
    
      1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
      -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,
      -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,
      -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,
      1, -1, 1, 1,   1, 0, 1, 1,  1, 0,
      1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
    
      1, -1, -1, 1,  1, 0, 0, 1,  1, 1,
      -1, -1, -1, 1, 0, 0, 0, 1,  0, 1,
      -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
      1, 1, -1, 1,   1, 1, 0, 1,  1, 0,
      1, -1, -1, 1,  1, 0, 0, 1,  1, 1,
      -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
    ]);

    this.byteSize_ = this.bufferGeometry_.byteLength / this.bufferGeometry_.length;
    
    this.vertexCount_ = 36;
  
    this.vertexSize_ = this.bufferGeometry_.byteLength / this.vertexCount_; // Byte size of one cube vertex.  
    
    this.positionOffset_ = 0 * this.byteSize_;
    
    this.colorOffset_ = 4 * this.byteSize_;
    
    this.uvOffset_ = 8 * this.byteSize_;
  }

  public getBufferGeometry(): TypedArray  {
    return this.bufferGeometry_;
  }

  public getTotalSize():number {
    return this.vertexSize_ * this.vertexCount_;
  }

  public getVertexSize(): number {
    return this.vertexSize_;
  }

  public getVertexCount(): number {
    return this.vertexCount_;
  }

  public getPositionOffset(): number {
    return this.positionOffset_;
  }

  public getColorOffset(): number {
    return this.colorOffset_;
  }

  public getUVOffset(): number {
    return this.uvOffset_;
  }
}

export { BoxGeometry }