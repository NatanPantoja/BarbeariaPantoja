import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface ClientRequest {
  name: string;
  email: string;
  password: string;
}

class CreateClientService {
  async execute({ name, email, password }: ClientRequest) {
    if (!email) {
      throw new Error("Email incorreto");
    }

    // faz a procura para ver ser tem email cadastrado
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado");
    }

    const passwordhash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordhash,
        role: "CLIENTE",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  }
}

export { CreateClientService };
