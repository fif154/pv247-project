export interface IAuthenticationService {
  validatePasswords(
    inputPassword: string,
    usersHashedPassword: string
  ): Promise<boolean>;

  hashPassword(password: string): Promise<string>;
}
