const factors: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: Math.pow(1024, 2),
  GB: Math.pow(1024, 3),
  TB: Math.pow(1024, 4),
};

export function convertToByte(value: number, unit: string) {
  return value * (factors[unit] || 1);
}
