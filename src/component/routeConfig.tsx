import {RouteProps} from "react-router-dom";
import React from "react";
import UsersPage from "pages/UsersPage/ui/UsersPage";
import {LoginPage} from "pages/LoginPage";
import ProfilesPage from "pages/ProfilesPage/ui/ProfilesPage";

export enum AppRoutes {
    USERS = 'USERS',
    PROFILES = 'PROFILES',
    LOGIN = 'LOGIN',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.USERS]: '/users',
    [AppRoutes.PROFILES]: '/profiles',
    [AppRoutes.LOGIN]: '/login',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.USERS]: {
        path: RoutePath.USERS,
        element: <UsersPage/>
    },
    [AppRoutes.PROFILES]: {
        path: RoutePath.PROFILES,
        element: <ProfilesPage/>
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.LOGIN,
        element: <LoginPage/>
    },
}