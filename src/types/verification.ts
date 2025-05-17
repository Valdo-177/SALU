export interface VerificationCode {
  id: string;
  email: string;
  code: string;
  createdAt: Date;
  used: boolean;
  expiresAt: Date;
}