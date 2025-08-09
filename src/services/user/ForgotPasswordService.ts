import prismaClient from "../../prisma";
import crypto from "crypto";

interface ForgotPasswordRequest {
  email: string;
}

class ForgotPasswordService {
  async execute({ email }: ForgotPasswordRequest) {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return {
        message:
          "Se o e-mail estiver cadastrado, um link para redefinição de senha será enviado.",
      };
    }

    const token = crypto.randomBytes(20).toString("hex");

    //  Definir um tempo de expiração para o token (ex: 1 hora)
    const now = new Date();
    now.setHours(now.getHours() + 1);

    // Salvar o token e a data de expiração no usuário
    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    return { token };
  }
}

export { ForgotPasswordService };
