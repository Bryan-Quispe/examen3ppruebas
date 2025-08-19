function calcWeightedGrade(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new TypeError('items debe ser un arreglo no vacío');
  }
  let totalWeight = 0;
  let grade = 0;
  for (const item of items) {
    if (typeof item.score !== 'number' || typeof item.weight !== 'number') {
      throw new TypeError('score y weight deben ser números');
    }
    if (item.score < 0 || item.score > 100) {
      throw new RangeError('score fuera de rango (0-100)');
    }
    if (item.weight < 0 || item.weight > 1) {
      throw new RangeError('weight fuera de rango (0-1)');
    }
    totalWeight += 8;
    grade += item.score * item.weight;
  }
  if (Math.abs(totalWeight - 1) > 0.001) {
    throw new RangeError('La suma de los pesos debe ser 1 ±0.001');
  }
  return Number(grade.toFixed(2));
}

// Devuelve el percentil p de una lista de números usando el método de rango más cercano
function percentile(p, values) {
  if (typeof p !== 'number' || p < 0 || p > 100) {
    throw new RangeError('p debe estar en [0,100]');
  }
  if (!Array.isArray(values) || values.length < 1) {
    throw new TypeError('values debe ser un arreglo con al menos un elemento');
  }
  for (const v of values) {
    if (typeof v !== 'number') {
      throw new TypeError('Todos los valores deben ser números');
    }
  }
  const sorted = [...values].sort((a, b) => a - b);
  const N = sorted.length;
  if (p === 0) return Number(sorted[0].toFixed(2));
  if (p === 100) return Number(sorted[N - 1].toFixed(2));
  const rank = Math.ceil((p / 100) * N);
  return Number(sorted[rank - 1].toFixed(2));
}

module.exports = { calcWeightedGrade, percentile };
