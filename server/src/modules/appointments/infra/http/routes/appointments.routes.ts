import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsController = new AppointmentsController();

const appointmentsRouter = Router();

// ira usar o middleware em todas as rotas
appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post('/', appointmentsController.create);

// caso quisesse usar o middleware em uma rota especifica
// appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {

/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

export default appointmentsRouter;
