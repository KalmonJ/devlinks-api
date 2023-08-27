export interface Jwt {
  sign(payload: unknown): string;
}
