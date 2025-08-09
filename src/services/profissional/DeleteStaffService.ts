import prismaClient from "../../prisma";

interface DeleteStaffRequest {
  profissional_id: string;
}

class DeleteStaffService {
  async execute({ profissional_id }: DeleteStaffRequest) {
    if (!profissional_id) {
      throw new Error("ID do profissional é obrigatório.");
    }

    // Primeiro, encontramos o profissional para pegar o ID do usuário associado
    const profissional = await prismaClient.profissional.findUnique({
      where: {
        id: profissional_id,
      },
    });

    if (!profissional) {
      throw new Error("Profissional não encontrado.");
    }

    // Agora, usamos uma transação para deletar os dois registros tando do profissional quanto do usuario
    try {
      await prismaClient.$transaction([
        prismaClient.profissional.delete({
          where: {
            id: profissional_id,
          },
        }),
      ]);

      // Se a transação for bem-sucedida, não precisamos retornar nada,
      // pois o controller enviará a mensagem de sucesso.
    } catch (err) {
      throw new Error("Erro ao deletar profissional.");
    }
  }
}

export { DeleteStaffService };
