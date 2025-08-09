import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { Role } from "@prisma/client";

interface StaffRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string;
}

class CreateStaffService {
  async execute({ name, email, password, role, avatar }: StaffRequest) {
    if (!email) {
      throw new Error("Email incorreto");
    }

    // A verificação se cadastro do profissional
    const profissionalAlreadyExists =
      await prismaClient.profissional.findUnique({
        where: { email: email },
      });

    if (profissionalAlreadyExists) {
      throw new Error("Um profissional com este e-mail já está cadastrado.");
    }

    // A role de um funcionário não pode ser CLIENTE
    if (role === "CLIENTE") {
      throw new Error(
        "Esta rota é apenas para cadastrar funcionários (ADMIN, PROFISSIONAL, etc)."
      );
    }

    const passwordhash = await hash(password, 8);

    const profissional = await prismaClient.profissional.create({
      data: {
        name: name,
        email: email,
        password: passwordhash,
        role: role,
        avatar: avatar,
      },
    });

    return {
      id: profissional.id,
      name: profissional.name,
      email: profissional.email,
      role: profissional.role,
      avatar: profissional.avatar,
    };
  }
}

export { CreateStaffService };
