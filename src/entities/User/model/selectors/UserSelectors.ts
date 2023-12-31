import { IStateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import UserRole from '../types/UserRole';

class UserSelectors {
    static getUserAuthData = (state: IStateSchema) => state.user.authData;
    static getUserInit = (state: IStateSchema) => state.user.init;
    static getUserRoles = (state: IStateSchema) => state.user.authData?.roles;
    static isUserMaster = createSelector(this.getUserRoles, (roles) =>
        Boolean(roles?.includes(UserRole.MASTER)),
    );
    static isUserLead = createSelector(this.getUserRoles, (roles) =>
        Boolean(roles?.includes(UserRole.LEAD)),
    );
}

export default UserSelectors;
