import { IEmitDTO } from './dtos/IEmitDTO';

export interface IServerProvider {
  getClientById(socketId: string): Promise<IClientProvider | null>;
  emit(options: IEmitDTO): void;
}

export interface IClientProvider {
  join(room: string): void;
}
