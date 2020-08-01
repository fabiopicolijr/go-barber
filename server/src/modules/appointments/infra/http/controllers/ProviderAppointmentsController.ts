import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id; // logged user
    const { year, month, day } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    // classToClass: faz a serialização de um objeto, utilizando a estratégia
    // de acordo com o "cadastro" da entidade.
    // Essa estratégia (@expose, @exclude), esconde o password e mostra a url do avatar.
    return response.json(classToClass(appointments));
  }
}
