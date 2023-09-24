import {IUserScheme} from "@/entities/User";
import rtkApi from "@/shared/api/rtkApi";

interface IStateSchema {
    user: IUserScheme;

    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export default IStateSchema;
