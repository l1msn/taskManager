import rtkApi from '@/shared/api/rtkApi';
import { IUser } from '..';

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDataById: build.query<IUser, string>({
            query: (userId) => ({
                url: '/users/' + userId,
                method: 'GET',
            }),
        }),
    }),
});

const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;

export { getUserDataByIdQuery };
