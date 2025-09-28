import {RouteProps} from "react-router-dom";
import React from "react";
import UsersPage from "pages/UsersPage/ui/UsersPage";
import {LoginPage} from "pages/LoginPage";
import ProfilesPage from "pages/ProfilesPage/ui/ProfilesPage";
import HotelsPage from "pages/HotelsPage/ui/HotelsPage";

export enum AppRoutes {
    USERS = 'USERS',
    PROFILES = 'PROFILES',
    HOTELS = 'HOTELS',
    LOGIN = 'LOGIN',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.USERS]: '/users',
    [AppRoutes.PROFILES]: '/profiles',
    [AppRoutes.HOTELS]: '/hotels',
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
    [AppRoutes.HOTELS]: {
        path: RoutePath.HOTELS,
        element: <HotelsPage/>
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.LOGIN,
        element: <LoginPage/>
    },
}