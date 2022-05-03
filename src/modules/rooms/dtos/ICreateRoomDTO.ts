export interface ICreateRoomDTO {
  name: string;
  password?: string;
  maxParticipants: number;
  code: number;
}
