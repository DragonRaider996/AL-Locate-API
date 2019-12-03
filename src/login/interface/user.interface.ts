export interface UserInterface {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
  token?: string;
}