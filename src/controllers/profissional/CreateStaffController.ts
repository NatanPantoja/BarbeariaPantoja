import { Request, Response } from "express";
import { CreateStaffService } from "../../services/profissional/CreateStaffService";

class CreateStaffController {
  async handle(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    const createStaffService = new CreateStaffService();

    let avatarFilename: string | undefined = undefined;
    if (req.file) {
      avatarFilename = req.file.filename;
    }

    const user = await createStaffService.execute({
      name,
      email,
      password,
      role,
      avatar: avatarFilename,
    });

    return res.json(user);
  }
}

export { CreateStaffController };
