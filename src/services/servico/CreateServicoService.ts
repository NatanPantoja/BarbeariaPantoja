import prismaClient from "../../prisma";

interface ServicoRequest {
  name: string;
  price: string;
  duration: number;
  description?: string;
  banner?: string;
}
class CreateServicoService {
  async execute({
    name,
    price,
    duration,
    description,
    banner,
  }: ServicoRequest) {
    if (name === "") {
      throw new Error("O nome do serviço não pode ser vazio.");
    }

    const servicoAlreadyExists = await prismaClient.servico.findFirst({
      where: {
        name: name,
      },
    });

    if (servicoAlreadyExists) {
      throw new Error("Um serviço com este nome já está cadastrado.");
    }

    const servico = await prismaClient.servico.create({
      data: {
        name: name,
        price: parseFloat(price),
        duration: duration ? duration : 0,
        description: description ? description : "",
        banner: banner ? banner : "",
      },
    });

    return servico;
  }
}

export { CreateServicoService };
