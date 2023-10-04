export interface Upload {
  config(): Upload;
  upload(imagePath: string): Promise<string | null>;
}
