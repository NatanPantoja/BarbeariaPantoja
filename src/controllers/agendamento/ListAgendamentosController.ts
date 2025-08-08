import { Request, Response } from "express";
import { ListAgendamentosService } from "../../services/agendamento/ListAgendamentosService";

class ListAgendamentosController {
  async handle(req: Request, res: Response) {
    const { startDate, endDate } = req.query;

    const listAgendamentosService = new ListAgendamentosService();

    try {
      const agendamentos = await listAgendamentosService.execute({
        startDate: startDate as string,
        endDate: endDate as string,
      });

      return res.json(agendamentos);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      return res.status(400).json({ error: errorMessage });
    }
  }
}

export { ListAgendamentosController };
