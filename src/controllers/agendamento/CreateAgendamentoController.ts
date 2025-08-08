import { Request, Response } from "express";
import { CreateAgendamentoService } from "../../services/agendamento/CreateAgendamentoService";

class CreateAgendamentoController {
  async handle(req: Request, res: Response) {
    const { profissionalId, servicoId, date } = req.body;
    // O ID do cliente vem do token JWT, garantindo a segurança
    const clienteId = req.user_id;

    const createAgendamentoService = new CreateAgendamentoService();

    try {
      const agendamento = await createAgendamentoService.execute({
        clienteId,
        profissionalId,
        servicoId,
        date,
      });

      return res.json(agendamento);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      return res.status(400).json({ error: errorMessage });
    }
  }
}

export { CreateAgendamentoController };
