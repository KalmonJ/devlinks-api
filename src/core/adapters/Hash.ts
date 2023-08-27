export interface Hash {
  encrypt(data: string, salt?: string | number): Promise<string>;
  compare(data: string, encrypted: string): Promise<boolean>;
}
