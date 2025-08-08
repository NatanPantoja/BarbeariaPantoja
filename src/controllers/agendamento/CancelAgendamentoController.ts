import { Request, Response } from "express";
import { CancelAgendamentoService } from "../../services/agendamento/CancelAgendamentoService";

class CancelAgendamentoController {
  async handle(req: Request, res: Response) {
    const { agendamento_id } = req.body;
    const user_id = req.user_id;

    const cancelAgendamentoService = new CancelAgendamentoService();

    try {
      const agendamento = await cancelAgendamentoService.execute({
        agendamento_id,
        user_id,
      });

      return res.json(agendamento);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      return res.status(400).json({ error: errorMessage });
    }
  }
}

export { CancelAgendamentoController };
