import { Request, Response } from "express";
import { CreateClientService } from "../../services/user/CreateClientService";

class CreateClientController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createClientService = new CreateClientService();

    const user = await createClientService.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}

export { CreateClientController };
