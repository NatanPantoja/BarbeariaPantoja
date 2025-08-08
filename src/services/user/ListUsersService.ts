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

    // Busca todos os funcionários (qualquer role que NÃO seja CLIENTE)
    const funcionarios = await prismaClient.user.findMany({
      where: {
        NOT: {
          role: "CLIENTE",
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        perfilProfissional: true,
      },
    });

    //  Retorna um objeto com as duas listas separadas
    return { clientes, funcionarios };
  }
}

export { ListUsersService };
