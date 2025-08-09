import { Request, Response } from "express";
import { ListStaffService } from "../../services/profissional/ListStaffService";

class ListStaffController {
  async handle(req: Request, res: Response) {
    const listStaffService = new ListStaffService();

    const profissional = await listStaffService.execute();

    return res.json(profissional);
  }
}

export { ListStaffController };
