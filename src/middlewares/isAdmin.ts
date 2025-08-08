import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user_id = req.user_id; // ID pego pelo middleware isAuthenticated

  const user = await prismaClient.user.findFirst({
    where: {
      id: user_id,
    },
  });

  // Se o usuário logado tiver a role "ADMIN", ele pode passar.
  if (user?.role === "ADMIN") {
    return next();
  }

  // Se não for, ele é bloqueado.
  res
    .status(403)
    .json({ error: "Acesso negado. Rota exclusiva para administradores." });
}
