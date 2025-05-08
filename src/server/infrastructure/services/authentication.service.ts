import { IAuthenticationService } from "@/server/application/services/authentication.service.interface";
import { compare, hash } from "bcrypt-ts";

export class AuthenticationService implements IAuthenticationService {
  async validatePasswords(
    inputPassword: string,
    usersHashedPassword: string,
  ): Promise<boolean> {
    return await compare(inputPassword, usersHashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }
}
