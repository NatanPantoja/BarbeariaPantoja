import { Request, Response } from "express";
import { ResetPasswordService } from "../../services/user/ResetPasswordService";

class ResetPasswordController {
  async handle(req: Request, res: Response) {
    const { token, password } = req.body;

    const resetPasswordService = new ResetPasswordService();

    const result = await resetPasswordService.execute({ token, password });

    return res.json(result);
  }
}

export { ResetPasswordController };
