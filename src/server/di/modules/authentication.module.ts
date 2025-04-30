import { createModule } from "@evyweb/ioctopus";

import { registerUseCase } from "@/server/application/use-cases/auth/register.use-case";
import { signInUseCase } from "@/server/application/use-cases/auth/sign-in.use-case";
import { registerController } from "@/server/controllers/auth/register.controller";
import { signInController } from "@/server/controllers/auth/sign-in.controller";
import { AuthenticationService } from "@/server/infrastructure/services/authentication.service";
import { DI_SYMBOLS } from "../types";

export function createAuthenticationModule() {
    const authenticationModule = createModule();

    authenticationModule
        .bind(DI_SYMBOLS.IAuthenticationService)
        .toClass(AuthenticationService, [DI_SYMBOLS.IUsersRepository]);

    authenticationModule
        .bind(DI_SYMBOLS.ISignInUseCase)
        .toHigherOrderFunction(signInUseCase, [
            DI_SYMBOLS.IUsersRepository,
            DI_SYMBOLS.IAuthenticationService,
        ]);

    authenticationModule
        .bind(DI_SYMBOLS.IRegisterUseCase)
        .toHigherOrderFunction(registerUseCase, [
            DI_SYMBOLS.IUsersRepository,
            DI_SYMBOLS.IAuthenticationService,
        ]);

    authenticationModule
        .bind(DI_SYMBOLS.ISignInController)
        .toHigherOrderFunction(signInController, [DI_SYMBOLS.ISignInUseCase]);

    authenticationModule
        .bind(DI_SYMBOLS.IRegisterController)
        .toHigherOrderFunction(registerController, [
            DI_SYMBOLS.IRegisterUseCase,
        ]);

    return authenticationModule;
}
