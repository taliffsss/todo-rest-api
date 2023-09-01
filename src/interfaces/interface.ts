export interface IDatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface IAuthorization {
  authorize(req: any): boolean;
  generate(userId: string | number): string;
  verify(token: string): string | null;
}

