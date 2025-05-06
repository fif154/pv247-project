import { IIngredientsRepository } from "../application/repositories/ingredients.repository.interface";
import { IUsersRepository } from "../application/repositories/users.repository.interface";
import { IAuthenticationService } from "../application/services/authentication.service.interface";
import { IRegisterUseCase } from "../application/use-cases/auth/register.use-case";
import { ISignInUseCase } from "../application/use-cases/auth/sign-in.use-case";
import { ICreateIngredientUseCase } from "../application/use-cases/ingredients/create-ingredient.use-case";
import { IDeleteIngredientUseCase } from "../application/use-cases/ingredients/delete-ingredient.use-case";
import { IGetIngredientUseCase } from "../application/use-cases/ingredients/get-ingredient.use-case";
import { IListIngredientsUseCase } from "../application/use-cases/ingredients/list-ingredients.use-case";
import { IUpdateIngredientUseCase } from "../application/use-cases/ingredients/update-ingredient.use-case";
import { IRegisterController } from "../controllers/auth/register.controller";
import { ISignInController } from "../controllers/auth/sign-in.controller";
import { ICreateIngredientController } from "../controllers/ingredients/create-ingredient.controller";
import { IDeleteIngredientController } from "../controllers/ingredients/delete-ingredient.controller";
import { IGetIngredientController } from "../controllers/ingredients/get-ingredient.controller";
import { IListIngredientsController } from "../controllers/ingredients/list-ingredients.controller";
import { IUpdateIngredientController } from "../controllers/ingredients/update-ingredient.controller";

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
    IIngredientsRepository: IIngredientsRepository;

    // Use Cases
    ISignInUseCase: ISignInUseCase;
    IRegisterUseCase: IRegisterUseCase;
    ICreateIngredientUseCase: ICreateIngredientUseCase;
    IUpdateIngredientUseCase: IUpdateIngredientUseCase;
    IDeleteIngredientUseCase: IDeleteIngredientUseCase;
    IListIngredientsUseCase: IListIngredientsUseCase;
    IGetIngredientUseCase: IGetIngredientUseCase;

    // Controllers
    ISignInController: ISignInController;
    IRegisterController: IRegisterController;
    ICreateIngredientController: ICreateIngredientController;
    IUpdateIngredientController: IUpdateIngredientController;
    IDeleteIngredientController: IDeleteIngredientController;
    IListIngredientsController: IListIngredientsController;
    IGetIngredientController: IGetIngredientController;
}
