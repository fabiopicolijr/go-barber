// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 4, 20, 14, 0, 0), // Lembrar Mês 1 a menos. Errado no JS.
      user_id: 'user2-id',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      date: new Date(2020, 4, 20, 15, 0, 0),
      user_id: 'user2-id',
    });

    // Com isso, é como se agora fossem 11 horas e não vamos poder agendar antes disso.
    // esse mockImplementation vai alterar a date(Date.now()) de dentro do service, colocando o horario que definimos
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user-id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false }, // appointment scheduled
        { hour: 15, available: false }, // appointment scheduled
        { hour: 16, available: true },
      ]),
    );
  });
});
