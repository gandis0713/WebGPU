import { AbstractGeometryProp, AbstractGeometry } from '../abstract_geometry';

export interface SphereGeometryProp extends AbstractGeometryProp {
  sector: number;
  stack: number;
  radius: number;
}

export class SphereGeometry extends AbstractGeometry {
  // prop
  private sector: number = 10;
  private stack: number = 10;
  private radius: number = 200;

  constructor(prop?: SphereGeometryProp) {
    super(prop);

    if (!prop) return;

    this.sector = prop.sector;
    this.stack = prop.stack;
    this.radius = prop.radius;
  }

  public setRadius(radius: number): void {
    this.radius = radius;
    this.build();
  }

  public setStack(stack: number): void {
    this.stack = stack;
    this.build();
  }

  public setSector(sector: number): void {
    this.sector = sector;
    this.build();
  }

  public build(): void {
    this.vertexArray = [];
    this.triangleIndexArray = [];
    this.lineIndexArray = [];
    let x, y, z, xy; // vertex position
    let nx,
      ny,
      nz,
      lengthInv = 1.0 / this.radius; // vertex normal
    let s, t; // vertex texCoord
    let sectorStep = (2 * Math.PI) / this.sector;
    let stackStep = Math.PI / this.stack;
    let sectorAngle, stackAngle;

    for (let i = 0; i <= this.stack; ++i) {
      stackAngle = Math.PI / 2 - i * stackStep; // starting from pi/2 to -pi/2
      xy = this.radius * Math.cos(stackAngle); // r * cos(u)
      z = this.radius * Math.sin(stackAngle); // r * sin(u)

      for (let j = 0; j <= this.sector; ++j) {
        sectorAngle = j * sectorStep; // starting from 0 to 2pi

        // vertex position (x, y, z)
        x = xy * Math.cos(sectorAngle); // r * cos(u) * cos(v)
        y = xy * Math.sin(sectorAngle); // r * cos(u) * sin(v)
        this.vertexArray.push(x);
        this.vertexArray.push(y);
        this.vertexArray.push(z);

        // normalized vertex normal (nx, ny, nz)
        nx = x * lengthInv;
        ny = y * lengthInv;
        nz = z * lengthInv;

        this.vertexArray.push(nx);
        this.vertexArray.push(ny);
        this.vertexArray.push(nz);

        if (true) {
          // use texture coord
          // vertex tex coord (s, t) range between [0, 1]
          s = j / this.sector;
          t = i / this.stack;
          this.vertexArray.push(s);
          this.vertexArray.push(t);
        }
      }
    }

    let k1, k2;
    for (let i = 0; i < this.stack; ++i) {
      k1 = i * (this.sector + 1); // beginning of current stack
      k2 = k1 + this.sector + 1; // beginning of next stack

      for (let j = 0; j < this.sector; ++j, ++k1, ++k2) {
        // 2 triangles per sector excluding first and last stacks
        // k1 => k2 => k1+1
        if (i != 0) {
          this.triangleIndexArray.push(k1);
          this.triangleIndexArray.push(k2);
          this.triangleIndexArray.push(k1 + 1);

          this.lineIndexArray.push(k1);
          this.lineIndexArray.push(k2);

          this.lineIndexArray.push(k2);
          this.lineIndexArray.push(k1 + 1);

          this.lineIndexArray.push(k1);
          this.lineIndexArray.push(k1 + 1);
        }

        // k1+1 => k2 => k2+1
        if (i != this.stack - 1) {
          this.triangleIndexArray.push(k1 + 1);
          this.triangleIndexArray.push(k2);
          this.triangleIndexArray.push(k2 + 1);

          this.lineIndexArray.push(k1 + 1);
          this.lineIndexArray.push(k2);

          this.lineIndexArray.push(k2);
          this.lineIndexArray.push(k2 + 1);

          this.lineIndexArray.push(k1 + 1);
          this.lineIndexArray.push(k2 + 1);
        }
      }
    }
  }
}
