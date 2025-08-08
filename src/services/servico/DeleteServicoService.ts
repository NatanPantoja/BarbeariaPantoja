import prismaClient from "../../prisma";

interface DeleteServicoRequest {
  servico_id: string;
}

class DeleteServicoService {
  async execute({ servico_id }: DeleteServicoRequest) {
    if (!servico_id) {
      throw new Error("ID do serviço é obrigatório.");
    }

    try {
      const servicoDeletado = await prismaClient.servico.delete({
        where: {
          id: servico_id,
        },
      });

      return servicoDeletado;
    } catch (err) {
      throw new Error("Serviço não encontrado ou já deletado.");
    }
  }
}

export { DeleteServicoService };
