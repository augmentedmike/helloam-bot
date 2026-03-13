export function requireEnv(name: string): number {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  const num = Number(val);
  if (isNaN(num)) throw new Error(`Invalid number for env var ${name}: ${val}`);
  return num;
}
