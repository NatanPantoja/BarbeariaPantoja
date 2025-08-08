import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { Role } from "@prisma/client";

interface StaffRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
  // Adicionamos o avatar aqui, ele é opcional
  avatar?: string;
}

class CreateStaffService {
  async execute({ name, email, password, role, avatar }: StaffRequest) {
    if (!email) {
      throw new Error("Email incorreto");
    }

    if (role === "CLIENTE") {
      throw new Error("Use a rota de cadastro pública para criar clientes.");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado");
    }

    const passwordhash = await hash(password, 8);

    // Agora, a criação do usuário e do perfil profissional acontece em uma transação
    const newUser = await prismaClient.$transaction(async (prisma) => {
      // 1. Cria a conta de usuário (login)
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: passwordhash,
          role: role,
        },
      });

      // 2. Se o cargo for PROFISSIONAL, cria também o perfil com o avatar
      if (role === "PROFISSIONAL") {
        await prisma.profissional.create({
          data: {
            name: name, // Usamos o mesmo nome para o perfil público
            userId: user.id,
            avatar: avatar, // Salvamos o nome do arquivo da imagem
          },
        });
      }

      return user;
    });

    // Retornamos apenas os dados seguros do usuário recém-criado
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }
}

export { CreateStaffService };
