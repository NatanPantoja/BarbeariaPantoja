import { Router } from "express";
import multer from "multer";
// --CADASTRA CLIENTE--
import { CreateClientController } from "./controllers/user/CreateClientController";
import { AuthUserController } from "./controllers/user/AuthUserController";

// --RECUPERAÇÃO DE SENHA ---
import { ForgotPasswordController } from "./controllers/user/ForgotPasswordController";
import { ResetPasswordController } from "./controllers/user/ResetPasswordController";

// --ADMIN VER TODOS OS USUÁRIOS--
import { ListUsersController } from "./controllers/user/ListUsersController";

// --PROFISSIONAL--
import { CreateStaffController } from "./controllers/profissional/CreateStaffController";
import { DeleteStaffController } from "./controllers/profissional/DeleteStaffController";

//--SERVIÇO--
import { CreateServicoController } from "./controllers/servico/CreateServicoController";
import { DeleteServicoController } from "./controllers/servico/DeleteServicoController";
import { ListServicoController } from "./controllers/servico/ListServicoController";

// --AGENDAMENTO--
import { CreateAgendamentoController } from "./controllers/agendamento/CreateAgendamentoController";
import { CancelAgendamentoController } from "./controllers/agendamento/CancelAgendamentoController";
import { ListAgendamentosController } from "./controllers/agendamento/ListAgendamentosController";

// --CREDENCIAIS--

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post("/users", new CreateClientController().handle);
router.post("/login", new AuthUserController().handle);

// --- ROTAS DE RECUPERAÇÃO DE SENHA ---
router.post("/forgot_password", new ForgotPasswordController().handle);
router.post("/reset_password", new ResetPasswordController().handle);

// ROTA PARA O ADMIN VER TODOS OS USUÁRIOS
router.get(
  "/users",
  isAuthenticated,
  isAdmin,
  new ListUsersController().handle
);

// --ADMIN CADASTRA FUNCIONARIO--
router.post(
  "/staff",
  isAuthenticated,
  isAdmin,
  upload.single("avatar"),
  new CreateStaffController().handle
);
router.delete(
  "/staff",
  isAuthenticated,
  isAdmin,
  new DeleteStaffController().handle
);

//-- ROTAS SERVICO --
router.post(
  "/servico",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  new CreateServicoController().handle
);
router.delete(
  "/servico",
  isAuthenticated,
  isAdmin,
  new DeleteServicoController().handle
);
router.get(
  "/servico",
  isAuthenticated,
  isAdmin,
  new ListServicoController().handle
);

// --- ROTAS DE AGENDAMENTO ---
router.post(
  "/agendamentos",
  isAuthenticated,
  new CreateAgendamentoController().handle
);
router.post(
  "/agendamentos/cancel",
  isAuthenticated,
  new CancelAgendamentoController().handle
);
router.get(
  "/agendamentos",
  isAuthenticated,
  isAdmin,
  new ListAgendamentosController().handle
);

export { router };
