import {IUserScheme} from "@/entities/User";
import rtkApi from "@/shared/api/rtkApi";
import {ILoginSchema} from "@/features/AuthByUsername";

interface IStateSchema {
    user: IUserScheme;

    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    loginForm?: ILoginSchema;
}

export default IStateSchema;
