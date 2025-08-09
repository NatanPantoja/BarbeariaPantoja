import prismaClient from "../../prisma";

class ListStaffService {
  async execute() {
    // Busca todos os funcionarios
    const profissional = await prismaClient.profissional.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return { profissional };
  }
}

export { ListStaffService };
