import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authAPI} from "service/AuthService";
import userSlice, {CurrentUserModelStateType} from "./slice/UserSlice";
import {userAPI} from "service/UserService";
import {roleAPI} from "service/RoleService";
import {profileAPI} from "service/ProfileService";
import {cityAPI} from "service/CityService";

export type RootStateType = {
    currentUser: CurrentUserModelStateType
};

const rootReducer = combineReducers({
    currentUser: userSlice,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [roleAPI.reducerPath]: roleAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
    [cityAPI.reducerPath]: cityAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(authAPI.middleware)
                .concat(userAPI.middleware)
                .concat(roleAPI.middleware)
                .concat(profileAPI.middleware)
                .concat(cityAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
