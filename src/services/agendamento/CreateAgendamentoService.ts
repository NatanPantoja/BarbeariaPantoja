import prismaClient from "../../prisma";
import { parseISO, isBefore, addMinutes } from "date-fns";

interface CreateAgendamentoRequest {
  clienteId: string;
  profissionalId: string;
  servicoId: string;
  date: string;
}

class CreateAgendamentoService {
  async execute({
    clienteId,
    profissionalId,
    servicoId,
    date,
  }: CreateAgendamentoRequest) {
    //  Validar a data de início
    const startDate = parseISO(date);

    if (isBefore(startDate, new Date())) {
      throw new Error(
        "Não é possível criar um agendamento em uma data passada."
      );
    }

    // Buscar o serviço para saber sua duração de cada uma
    const servico = await prismaClient.servico.findUnique({
      where: { id: servicoId },
    });

    if (!servico) {
      throw new Error("Serviço não encontrado.");
    }

    // Calcular a data de término do agendamento
    const endDate = addMinutes(startDate, servico.duration);

    // Verificar se existe sobreposição de horários para o profissional
    const conflictingAppointment = await prismaClient.agendar.findFirst({
      where: {
        profissionalId: profissionalId,
        AND: [
          {
            date: {
              lt: endDate,
            },
          },
        ],
      },
    });

    const findAppointmentInSameDate = await prismaClient.agendar.findFirst({
      where: {
        profissionalId: profissionalId,
        date: startDate, // Verifica se já existe um agendamento EXATAMENTE no mesmo horário
      },
    });

    if (findAppointmentInSameDate) {
      throw new Error(
        "Este profissional já possui um agendamento neste horário."
      );
    }

    //  Criar o agendamento no banco de dados
    const agendamento = await prismaClient.agendar.create({
      data: {
        date: startDate,
        clienteId: clienteId,
        profissionalId: profissionalId,
        servicoId: servicoId,
      },
      include: {
        cliente: { select: { name: true } },
        profissional: { select: { name: true } },
        servico: { select: { name: true, price: true, duration: true } },
      },
    });

    return agendamento;
  }
}

export { CreateAgendamentoService };
