import UserRole from '../types/UserRole';

interface IUser {
    id: string | number;
    username: string;
    roles?: UserRole[];
}

interface IUserScheme {
    authData?: IUser;
    init: boolean;
}

export type { IUser, IUserScheme };
