import { Request, Response } from "express";
import { DeleteServicoService } from "../../services/servico/DeleteServicoService";

class DeleteServicoController {
  async handle(req: Request, res: Response) {
    const servico_id = req.query.id as string;

    const deleteServicoService = new DeleteServicoService();

    // Executa o serviço e passa o ID
    const servico = await deleteServicoService.execute({
      servico_id,
    });

    return res.json(servico);
  }
}

export { DeleteServicoController };
