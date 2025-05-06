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
    IIngredientsRepository: Symbol.for("IIngredientsRepository"),

    // Use Cases
    ISignInUseCase: Symbol.for("ISignInUseCase"),
    IRegisterUseCase: Symbol.for("IRegisterUseCase"),
    ICreateIngredientUseCase: Symbol.for("ICreateIngredientUseCase"),
    IUpdateIngredientUseCase: Symbol.for("IUpdateIngredientUseCase"),
    IDeleteIngredientUseCase: Symbol.for("IDeleteIngredientUseCase"),
    IListIngredientsUseCase: Symbol.for("IListIngredientsUseCase"),
    IGetIngredientUseCase: Symbol.for("IGetIngredientUseCase"),

    // Controllers
    ISignInController: Symbol.for("ISignInController"),
    IRegisterController: Symbol.for("IRegisterController"),
    ICreateIngredientController: Symbol.for("ICreateIngredientController"),
    IUpdateIngredientController: Symbol.for("IUpdateIngredientController"),
    IDeleteIngredientController: Symbol.for("IDeleteIngredientController"),
    IListIngredientsController: Symbol.for("IListIngredientsController"),
    IGetIngredientController: Symbol.for("IGetIngredientController"),
};

export interface DI_RETURN_TYPES {
    // Services
    IAuthenticationService: IAuthenticationService;

    // Repositories
    IUsersRepository: IUsersRepository;

    // Use Cases
    ISignInUseCase: ISignInUseCase;
    IRegisterUseCase: IRegisterUseCase;

    // Controllers
    ISignInController: ISignInController;
    IRegisterController: IRegisterController;
}
