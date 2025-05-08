import { IRegisterUseCase } from "@/server/application/use-cases/auth/register.use-case";
import { InputParseError } from "@/server/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export const registerController =
  (registerUseCase: IRegisterUseCase) => async (input: unknown) => {
    const { data, error } = inputSchema.safeParse(input);

    if (error) {
      throw new InputParseError("Invalid data", { cause: error });
    }

    const user = await registerUseCase(data);

    return user;
  };

export type IRegisterController = ReturnType<typeof registerController>;
