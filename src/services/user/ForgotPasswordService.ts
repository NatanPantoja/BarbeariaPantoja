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
    now.setHours(now.getHours() + 1); // Expira em 1 hora a partir de agora

    // Salvar o token e a data de expiração no usuário
    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    // --- IMPORTANTE: Envio do E-mail ---
    // Aqui é onde você usaria um serviço como Nodemailer para enviar um e-mail de verdade.
    // O e-mail conteria um link como: `http://seusite.com/reset-password?token=${token}`
    console.log("----------------------------------------------------");
    console.log("TOKEN DE REDEFINIÇÃO (simulando envio de e-mail):");
    console.log(token);
    console.log("----------------------------------------------------");
    // Por enquanto, vamos retornar o token para facilitar os testes.

    return { token };
  }
}

export { ForgotPasswordService };
