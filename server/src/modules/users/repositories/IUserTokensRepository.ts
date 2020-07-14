import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokens {
  generateToken(user_id: string): Promise<UserToken>;
}
