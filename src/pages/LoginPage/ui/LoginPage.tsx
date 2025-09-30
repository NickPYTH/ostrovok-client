import {Button, Flex, Input, NotificationArgsProps, Space} from "antd";
import React, {useEffect, useState} from "react";
import {GetTokenResponseType, authAPI} from "service/AuthService";
import {useSelector} from "react-redux";
import {RootStateType} from "store/store";
import {useNavigate} from "react-router-dom";

type NotificationPlacement = NotificationArgsProps['placement'];

const LoginPage = () => {

    // Store
    const notificationAPI = useSelector((state: RootStateType) => state.currentUser.notificationContextApi);
    // -----
    
    // States
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [accessToken] = useState<string | null>(localStorage.getItem('access'));
    const navigate = useNavigate();
    // -----

    // Notifications
    const showErrorNotification = (placement: NotificationPlacement, msg: string) => {
        notificationAPI?.error({
            message: `Ошибка`,
            description: msg,
            placement,
        });
    };
    const showSuccessNotification = (placement: NotificationPlacement, msg: string) => {
        notificationAPI?.success({
            message: `ОК`,
            description: msg,
            placement,
        });
    };
    const showInfoNotification = (placement: NotificationPlacement, msg: string) => {
        notificationAPI?.info({
            message: `Внимание`,
            description: msg,
            placement,
        });
    };
    // -----

    // Web requests
    const [getTokens, {
        data: getTokensResponse,
        error: getTokensError,
    }] = authAPI.useCreateMutation();
    const [verifyTokenRequest, {
        isSuccess: verifyTokenIsSuccess,
    }] = authAPI.useVerifyMutation();
    // -----
    
    // Handlers
    const loginHandler = () => {
        if (!username || !password) {
            showInfoNotification('topRight', "Некоторые поля остались пустыми");
            return;
        }
        getTokens({username, password});
    }
    // -----

    // Effects
    useEffect(() => {
        if (accessToken) {
            verifyTokenRequest({token: accessToken});
        }
    }, []);
    useEffect(() => {
        if (verifyTokenIsSuccess) {
            navigate('/users');
        }
    }, [verifyTokenIsSuccess]);
    useEffect(() => {
        if (getTokensResponse) {
            if ('token' in getTokensResponse) {
                let response: GetTokenResponseType = getTokensResponse as GetTokenResponseType;
                if (response.token && response.role) {
                    showSuccessNotification('topRight', response.role ?? "");
                    localStorage.setItem('access', response.token);
                    localStorage.setItem('refresh', response.token);
                    setTimeout(() => navigate('/users'), 300);
                }
            }
        }
    }, [getTokensResponse]);
    useEffect(() => {
        if (getTokensError)
            if ('data' in getTokensError) {
                let response: GetTokenResponseType = getTokensError.data as GetTokenResponseType;
                showErrorNotification('topRight', response.token ?? "");
            }
        else
            showErrorNotification('topRight', "На сервере полный 3.14здец");
    }, [getTokensError]);
    // -----

    return(
        <Flex justify={'center'} align={'center'} style={{height: window.innerHeight}}>
            <Space direction={'vertical'} align={'center'}>
                <Flex align={"center"}>
                    <div style={{width: 130}}>Пользователь</div>
                    <Input style={{width: 200}} value={username ?? ""} onChange={(e) => setUsername(e.target.value)}/>
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 130}}>Пароль</div>
                    <Input.Password style={{width: 200}} value={password ?? ""} onChange={(e) => setPassword(e.target.value)}/>
                </Flex>
                <Button onClick={loginHandler} type={'primary'} style={{width: 130}}>Войти</Button>
            </Space>
        </Flex>
    )
}

export default LoginPage;