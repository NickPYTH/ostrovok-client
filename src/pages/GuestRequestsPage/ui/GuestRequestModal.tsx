import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {DatePicker, Flex, Modal, Select} from 'antd';
import {NotificationPlacement} from "antd/es/notification/interface";
import {useSelector} from "react-redux";
import {RootStateType} from "store/store";
import {HotelInspectionRequestModel} from "entities/HotelInspectionRequestModel";
import {hotelInspectionRequestAPI} from "service/HotelInspectionRequestService";
import {guestRequestAPI} from "service/GuestRequestService";
import {GuestRequestModel} from "entities/GuestRequestModel";
import {userAPI} from "service/UserService";
import {UserModel} from "entities/UserModel";

type ModalProps = {
    selectedRequest: GuestRequestModel | null,
    visible: boolean,
    setVisible: Function,
    refresh: Function
}
export const GuestRequestModal = (props: ModalProps) => {

    // Store
    const notificationAPI = useSelector((state: RootStateType) => state.currentUser.notificationContextApi);
    const currentUser = useSelector((state: RootStateType) => state.currentUser.user);
    // -----

    // States
    const [hotelInspectionRequestId, setHotelInspectionRequestId] = useState<number | null>(null);
    const [guestId, setGuestId] = useState<number | null>(null);
    const [dateStart, setDateStart] = useState<number | null>(null);
    const [dateFinish, setDateFinish] = useState<number | null>(null);
    // -----

    // Notifications
    const showErrorNotification = (placement: NotificationPlacement, msg: string) => {
        notificationAPI?.error({
            message: `Ошибка`,
            description: msg,
            placement,
        });
    };
    // -----

    // Web requests
    const [create, {
        data: created,
        isLoading: isCreateLoading
    }] = guestRequestAPI.useCreateMutation();
    const [update, {
        data: updated,
        isLoading: isUpdateLoading
    }] = guestRequestAPI.useUpdateMutation();
    const [getHotelInspectionRequest, {
        data: hotelInspectionRequests,
        isError: isHotelInspectionRequestsError,
        isLoading: isHotelInspectionRequestsLoading
    }] = hotelInspectionRequestAPI.useGetAllMutation();
    const [getUsersRequest, {
        data: users,
        isError: isUsersError,
        isLoading: isUsersLoading
    }] = userAPI.useGetAllMutation();
    // -----

    // Effects
    useEffect(() => {
        getHotelInspectionRequest();
    }, []);
    useEffect(() => {
        if (props.selectedRequest) {
            setHotelInspectionRequestId(props.selectedRequest.hotelInspectionRequest.id);
            setGuestId(props.selectedRequest.guest.id);
            setDateStart(props.selectedRequest.dateStart);
            setDateFinish(props.selectedRequest.dateFinish);
        }
    }, [props.selectedRequest]);
    useEffect(() => {
        if (created || updated) {
            props.setVisible(false);
            props.refresh();
        }
    }, [created, updated]);
    useEffect(() => {
        if (isHotelInspectionRequestsError)
            showErrorNotification("topRight", "Ошибка получения городов");
    }, [isHotelInspectionRequestsError]);
    // -----

    // Handlers
    const confirmHandler = () => {
        if (hotelInspectionRequestId && guestId && dateStart && dateFinish){
            const hotelInspectionRequest:HotelInspectionRequestModel|undefined = hotelInspectionRequests?.find((hr:HotelInspectionRequestModel) => hr.id == hotelInspectionRequestId);
            const guest:UserModel|undefined = users?.find((g:UserModel) => g.id == guestId);
            if (hotelInspectionRequest && guest) {
                let request: GuestRequestModel = {
                    id: null,
                    guest,
                    hotelInspectionRequest,
                    dateStart,
                    dateFinish
                };
                if (props.selectedRequest) update({...request, id: props.selectedRequest.id});
                else create(request);
            }
        }
    }
    // -----

    return (
        <Modal title={props.selectedRequest ? "Редактирование заявки тайного гостя" : "Создание заявки тайного гостя"}
               open={props.visible}
               loading={(isCreateLoading || isUpdateLoading)}
               onOk={confirmHandler}
               onCancel={() => props.setVisible(false)}
               okText={props.selectedRequest ? "Сохранить" : "Создать"}
               width={'550px'}
        >
            <Flex gap={'small'} vertical={true}>
                <Flex align={"center"}>
                    <div style={{width: 180}}>Инспектируемый отель</div>
                    <Select
                        loading={isHotelInspectionRequestsLoading}
                        value={hotelInspectionRequestId}
                        placeholder={"Выберите отель"}
                        style={{width: '100%'}}
                        onChange={(e) => setHotelInspectionRequestId(e)}
                        options={hotelInspectionRequests?.map((hr: HotelInspectionRequestModel) => ({value: hr.id, label: hr.hotel.name}))}
                    />
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 180}}>Секрктный гость</div>
                    <Select
                        loading={isUsersLoading}
                        value={guestId}
                        placeholder={"Выберите пользователя"}
                        style={{width: '100%'}}
                        onChange={(e) => setGuestId(e)}
                        options={users?.map((g: UserModel) => ({value: g.id, label: g.username}))}
                    />
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 180}}>Дата заезда</div>
                    <DatePicker value={dateStart ? dayjs.unix(dateStart) : dayjs()} onChange={date => setDateStart(date.unix)}/>
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 180}}>Дата выезда</div>
                    <DatePicker value={dateFinish ? dayjs.unix(dateFinish) : dayjs()} onChange={date => setDateFinish(date.unix)}/>
                </Flex>
            </Flex>
        </Modal>
    );
};
