import './providers';

import { container } from 'tsyringe';

import { RoomsRepository } from '../../modules/rooms/repositories/implementations/RoomsRepository';
import { IRoomsRepository } from '../../modules/rooms/repositories/IRoomsRepository';

container.registerSingleton<IRoomsRepository>(
  'RoomsRepository',
  RoomsRepository
);
