import prismaClient from "../../prisma";
import { parseISO, startOfDay, endOfDay } from "date-fns";

interface ListAgendamentosRequest {
  startDate?: string;
  endDate?: string;
}

class ListAgendamentosService {
  async execute({ startDate, endDate }: ListAgendamentosRequest) {
    // Objeto que vai construir a query de data dinamicamente
    const dateQuery = {} as any;

    if (startDate) {
      dateQuery.gte = startOfDay(parseISO(startDate));
    } else {
      dateQuery.gte = startOfDay(new Date());
    }

    if (endDate) {
      dateQuery.lte = endOfDay(parseISO(endDate));
    }

    if (startDate && !endDate) {
      dateQuery.lte = endOfDay(parseISO(startDate));
    }

    const agendamentos = await prismaClient.agendar.findMany({
      where: {
        date: dateQuery, // Aplica o filtro de data que montamos
      },
      orderBy: {
        date: "asc", // Sempre ordenado por data
      },
      include: {
        cliente: { select: { name: true } },
        profissional: { select: { name: true, avatar: true } },
        servico: { select: { name: true, price: true, duration: true } },
      },
    });

    return agendamentos;
  }
}

export { ListAgendamentosService };
