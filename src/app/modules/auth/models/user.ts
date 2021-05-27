import {Role} from './role';

export class User {
  userId: number;
  username: string;
  role: Role;
  result: boolean;
  token?: string;
  success: boolean;
  errors: string;
  refreshToken: string;
}
