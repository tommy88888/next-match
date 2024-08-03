// custom.d.ts
declare module 'crypto-browserify' {
  export function randomBytes(size: number): Buffer;
  export function createHash(algorithm: string): any; // Define other methods as needed
  // Add other exports as needed
}
