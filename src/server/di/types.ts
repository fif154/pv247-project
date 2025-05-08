import { IGroupMembersRepository } from "../application/repositories/groupMembers.repository.interface";
import { IGroupsRepository } from "../application/repositories/groups.repository.interface";
import { IUsersRepository } from "../application/repositories/users.repository.interface";
import { IAuthenticationService } from "../application/services/authentication.service.interface";
import { IRegisterUseCase } from "../application/use-cases/auth/register.use-case";
import { ISignInUseCase } from "../application/use-cases/auth/sign-in.use-case";
import { IRegisterController } from "../controllers/auth/register.controller";
import { ISignInController } from "../controllers/auth/sign-in.controller";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  ITransactionManagerService: Symbol.for("ITransactionManagerService"),

    // Repositories
    IUsersRepository: Symbol.for("IUsersRepository"),
    IGroupsRepository: Symbol.for("IGroupsRepository"),
    IGroupMembersRepository: Symbol.for("IGroupMembersRepository"),

  // Use Cases
  ISignInUseCase: Symbol.for("ISignInUseCase"),
  IRegisterUseCase: Symbol.for("IRegisterUseCase"),

  // Controllers
  ISignInController: Symbol.for("ISignInController"),
  IRegisterController: Symbol.for("IRegisterController"),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;

    // Repositories
    IUsersRepository: IUsersRepository;
    IGroupsRepository: IGroupsRepository;
    IGroupMembersRepository: IGroupMembersRepository;

  // Use Cases
  ISignInUseCase: ISignInUseCase;
  IRegisterUseCase: IRegisterUseCase;

  // Controllers
  ISignInController: ISignInController;
  IRegisterController: IRegisterController;
}
