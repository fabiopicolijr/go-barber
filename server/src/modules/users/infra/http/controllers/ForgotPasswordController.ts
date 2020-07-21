import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordMailService from '@modules/users/services/SendForgotPasswordMailService';

export default class SendForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPassword = container.resolve(SendForgotPasswordMailService);

    console.log('forgot');

    await sendForgotPassword.execute({
      email,
    });

    return response.status(204).json();
  }
}
