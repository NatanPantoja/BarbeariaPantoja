import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface ResetPasswordRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  async execute({ token, password }: ResetPasswordRequest) {
    // Encontrar o usuário pelo token de redefinição
    const user = await prismaClient.user.findFirst({
      where: { passwordResetToken: token },
    });

    if (!user) {
      throw new Error("Token inválido.");
    }

    // Verificar se o token não expirou
    const now = new Date();
    if (now > user.passwordResetExpires!) {
      throw new Error(
        "Token expirado, por favor, solicite uma nova redefinição."
      );
    }

    // Criptografar a nova senha
    const passwordHash = await hash(password, 8);

    //Atualizar a senha e limpar os campos de redefinição
    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        password: passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return { message: "Senha redefinida com sucesso!" };
  }
}

export { ResetPasswordService };
