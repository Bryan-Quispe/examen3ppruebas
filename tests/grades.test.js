const { calcWeightedGrade, percentile } = require('../src/utils/grades');

describe('calcWeightedGrade', () => {
  it('calcula correctamente la nota ponderada', () => {
    expect(
      calcWeightedGrade([
        { score: 80, weight: 0.4 },
        { score: 90, weight: 0.6 },
      ])
    ).toBe(86.0);
  });
  it('lanza RangeError si la suma de pesos no es 1 ±0.001', () => {
    expect(() =>
      calcWeightedGrade([
        { score: 80, weight: 0.5 },
        { score: 90, weight: 0.6 },
      ])
    ).toThrow(RangeError);
  });
  it('lanza TypeError si items no es arreglo', () => {
    expect(() => calcWeightedGrade('no array')).toThrow(TypeError);
  });
  it('lanza RangeError si score fuera de rango', () => {
    expect(() => calcWeightedGrade([{ score: 120, weight: 1 }])).toThrow(
      RangeError
    );
  });
  it('lanza RangeError si weight fuera de rango', () => {
    expect(() => calcWeightedGrade([{ score: 80, weight: 2 }])).toThrow(
      RangeError
    );
  });
});

describe('percentile', () => {
  it('percentile(0,[1,2,3]) → 1.00', () => {
    expect(percentile(0, [1, 2, 3])).toBe(1.0);
  });
  it('percentile(100,[1,2,3]) → 3.00', () => {
    expect(percentile(100, [1, 2, 3])).toBe(3.0);
  });
  it('percentile(50,[1,2,3,4]) → 2.00', () => {
    expect(percentile(50, [1, 2, 3, 4])).toBe(2.0);
  });
  it('lanza RangeError si p fuera de rango', () => {
    expect(() => percentile(-1, [1, 2, 3])).toThrow(RangeError);
    expect(() => percentile(101, [1, 2, 3])).toThrow(RangeError);
  });
  it('lanza TypeError si values no es arreglo', () => {
    expect(() => percentile(50, 'no array')).toThrow(TypeError);
  });
  it('lanza TypeError si values contiene no números', () => {
    expect(() => percentile(50, [1, 'a', 3])).toThrow(TypeError);
  });
});
