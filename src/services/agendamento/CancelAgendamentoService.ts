import prismaClient from "../../prisma";

interface CancelRequest {
  agendamento_id: string;
  user_id: string; // ID do usuário que ira fazer o cancelar
}

class CancelAgendamentoService {
  async execute({ agendamento_id, user_id }: CancelRequest) {
    // Buscar o usuário que fez a requisição para saber sua 'role'
    const user = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Buscar o agendamento que será cancelado
    const agendamento = await prismaClient.agendar.findUnique({
      where: { id: agendamento_id },
    });

    if (!agendamento) {
      throw new Error("Agendamento não encontrado.");
    }

    if (
      agendamento.status === "CONCLUIDO" ||
      agendamento.status === "CANCELADO"
    ) {
      throw new Error(
        `Este agendamento já foi ${agendamento.status.toLowerCase()} e não pode ser cancelado.`
      );
    }

    let hasPermission = false;

    if (user.role === "ADMIN" || user.role === "RECEPCIONISTA") {
      // Admin e Recepcionista podem cancelar qualquer agendamento
      hasPermission = true;
    } else if (user.role === "CLIENTE") {
      // Cliente só pode cancelar se o agendamento for dele
      if (agendamento.clienteId === user.id) {
        hasPermission = true;
      }
    } else if (user.role === "PROFISSIONAL") {
      // Profissional só pode cancelar se o agendamento for da sua agenda
      const profissionalProfile = await prismaClient.profissional.findUnique({
        where: { id: user.id },
      });
      if (
        profissionalProfile &&
        agendamento.profissionalId === profissionalProfile.id
      ) {
        hasPermission = true;
      }
    }

    if (!hasPermission) {
      throw new Error("Você não tem permissão para cancelar este agendamento.");
    }

    //Se passou por todas as validações, atualiza o status
    const agendamentoCancelado = await prismaClient.agendar.update({
      where: { id: agendamento_id },
      data: {
        status: "CANCELADO",
      },
    });

    return agendamentoCancelado;
  }
}

export { CancelAgendamentoService };
