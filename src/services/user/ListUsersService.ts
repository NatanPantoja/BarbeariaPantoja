import prismaClient from "../../prisma";

class ListUsersService {
  async execute() {
    // Busca todos os usuários que são clientes
    const clientes = await prismaClient.user.findMany({
      where: {
        role: "CLIENTE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return { clientes };
  }
}

export { ListUsersService };
