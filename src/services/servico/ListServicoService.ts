import prismaClient from "../../prisma";

class ListServicoService {
  async execute() {
    const servico = await prismaClient.servico.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        duration: true,
        description: true,
        banner: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return { servico };
  }
}

export { ListServicoService };
