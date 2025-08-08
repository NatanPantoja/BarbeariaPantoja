import { Request, Response } from "express";
import { DeleteStaffService } from "../../services/profissional/DeleteStaffService";

class DeleteStaffController {
  async handle(req: Request, res: Response) {
    const profissional_id = req.query.id as string;

    const deleteProfissionalService = new DeleteStaffService();

    // Usaremos um try...catch para gerenciar o sucesso e o erro
    try {
      // Tenta executar o serviço
      await deleteProfissionalService.execute({
        profissional_id,
      });

      // Se não houver erro, retorna uma mensagem de sucesso
      return res.json({ message: "Profissional deletado com sucesso!" });
    } catch (err) {
      // Se o serviço lançar qualquer erro (ex: não encontrou, ID faltando)
      // o 'catch' pega esse erro.

      // Verificamos se o erro tem uma mensagem para exibir
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";

      // Retornamos o erro com status 400 (Bad Request)
      return res.status(400).json({ error: errorMessage });
    }
  }
}

export { DeleteStaffController };
