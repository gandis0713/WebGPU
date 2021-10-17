[[stage(fragment)]]
fn main([[location(0)]] fragUV: vec2<f32>,
        [[location(1)]] fragPosition: vec4<f32>) -> [[location(0)]] vec4<f32> {
  return vec4<f32>(fragUV[0], fragUV[1], 0.0, 1.0);
}
