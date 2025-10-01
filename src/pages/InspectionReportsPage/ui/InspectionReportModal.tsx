import React, {useEffect, useState} from 'react';
import {Divider, Flex, Input, InputNumber, Modal, Rate, Select} from 'antd';
import {NotificationPlacement} from "antd/es/notification/interface";
import {useSelector} from "react-redux";
import {RootStateType} from "store/store";
import {guestRequestAPI} from "service/GuestRequestService";
import {GuestRequestModel} from "entities/GuestRequestModel";
import {inspectionReportAPI} from "service/InsperctionReportService";
import {InspectionReportModel} from "entities/InspectionReportModel";
import {REPORT_STATUSES} from "shared/config/constants";

const { TextArea } = Input;

type ModalProps = {
    inspectionReport: InspectionReportModel | null,
    visible: boolean,
    setVisible: Function,
    refresh: Function
};
export const InspectionReportModal = (props: ModalProps) => {

    // Store
    const notificationAPI = useSelector((state: RootStateType) => state.currentUser.notificationContextApi);
    const currentUser = useSelector((state: RootStateType) => state.currentUser.user);
    // -----

    // States
    const [guestRequestId, setGuestRequestId] = useState<number | null>(null);
    const [serviceRating, setServiceRating] = useState(0);
    const [serviceComment, setServiceComment] = useState("");
    const [roomConditionRating, setRoomConditionRating] = useState(0);
    const [roomConditionComment, setRoomConditionComment] = useState("");
    const [moneyRating, setMoneyRating] = useState(0);
    const [improvementComment, setImprovementComment] = useState("");
    const [overallRating, setOverallRating] = useState(0);
    const [cleannessRating, setCleannessRating] = useState(0);
    const [cleannessComment, setCleannessComment] = useState("");
    const [finalVerdict, setFinalVerdict] = useState("");
    const [status, setStatus] = useState("");
    const [pointsFromAdmin, setPointsFromAdmin] = useState<number|null>(null);
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
    }] = inspectionReportAPI.useCreateMutation();
    const [update, {
        data: updated,
        isLoading: isUpdateLoading
    }] = inspectionReportAPI.useUpdateMutation();
    const [getGuestRequests, {
        data: guestRequests,
        isError: isGetGuestRequestsError,
        isLoading: isGetGuestRequestsLoading
    }] = guestRequestAPI.useGetAllMutation();
    // -----

    // Effects
    useEffect(() => {
        getGuestRequests();
    }, []);
    useEffect(() => {
        if (props.inspectionReport) {
            setGuestRequestId(props.inspectionReport.guestRequest.id);
            setCleannessRating(props.inspectionReport.cleanRating);
            setServiceRating(props.inspectionReport.serviceRating);
            setRoomConditionRating(props.inspectionReport.roomConditionRating);
            setMoneyRating(props.inspectionReport.moneyRating);
            setOverallRating(props.inspectionReport.overallRating);
            setCleannessComment(props.inspectionReport.cleanlessComment);
            setRoomConditionComment(props.inspectionReport.roomConditionComment);
            setServiceComment(props.inspectionReport.serviceComment);
            setRoomConditionRating(props.inspectionReport.roomConditionRating);
            setImprovementComment(props.inspectionReport.improvementComment);
            setFinalVerdict(props.inspectionReport.finalVerdict);
            setStatus(props.inspectionReport.status);
            setPointsFromAdmin(props.inspectionReport.pointsFromAdmin);
        }
    }, [props.inspectionReport]);
    useEffect(() => {
        if (created || updated) {
            props.setVisible(false);
            props.refresh();
        }
    }, [created, updated]);
    useEffect(() => {
        if (isGetGuestRequestsError)
            showErrorNotification("topRight", "Ошибка получения заявок");
    }, [isGetGuestRequestsError]);
    // -----

    // Handlers
    const confirmHandler = () => {
        if (guestRequestId){
            const guestRequest:GuestRequestModel|undefined = guestRequests?.find((g:GuestRequestModel) => g.id == guestRequestId);
            if (guestRequest) {
                let report: InspectionReportModel = {
                    cleanlessComment: cleannessComment,
                    cleanRating: cleannessRating,
                    finalVerdict,
                    guestRequest,
                    id: null,
                    improvementComment,
                    moneyRating,
                    overallRating,
                    pointsFromAdmin,
                    roomConditionComment,
                    roomConditionRating,
                    serviceComment,
                    serviceRating,
                    status
                };
                if (props.inspectionReport) update({...report, id: props.inspectionReport.id});
                else create(report);
            }
        }
    }
    // -----

    return (
        <Modal title={props.inspectionReport ? "Редактирование отчета" : "Создание отчета"}
               open={props.visible}
               loading={(isCreateLoading || isUpdateLoading)}
               onOk={confirmHandler}
               onCancel={() => props.setVisible(false)}
               okText={props.inspectionReport ? "Сохранить" : "Создать"}
               width={'650px'}
        >
            <Flex gap={'small'} vertical={true}>
                <Flex align={"center"}>
                    <div style={{width: 330}}>Заявка тайного гостя</div>
                    <Select
                        loading={isGetGuestRequestsLoading}
                        value={guestRequestId}
                        placeholder={"Выберите заявку тайного гостя"}
                        style={{width: '100%'}}
                        onChange={(e) => setGuestRequestId(e)}
                        options={guestRequests?.map((gr: GuestRequestModel) => ({value: gr.id, label: `${gr.guest.lastName} ${gr.guest.firstName} ${gr.guest.patronymic ?? ""} ${gr.hotelInspection?.hotel.name}`}))}
                    />
                </Flex>
                <Divider />
                <Flex align={"center"}>
                    <div style={{width: 330}}>Оцените чистоту в отеле</div>
                    <Rate allowHalf value={cleannessRating} onChange={(rating) => setCleannessRating(rating)}/>
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 330}}>Оставьте более подробный отзыв о чистоте в отеле</div>
                    <TextArea value={cleannessComment} onChange={(e) => setCleannessComment(e.target.value)} rows={4} placeholder="Расскажи максимально подробно, мы с удовольствием прочитаем!" maxLength={6} />
                </Flex>
                <Divider />
                <Flex align={"center"}>
                    <div style={{width: 330}}>Оцените уровень сервиса в отеле</div>
                    <Rate allowHalf value={serviceRating} onChange={(rating) => setServiceRating(rating)}/>
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 330}}>Оставьте более подробный отзыв о сервисе в отеле</div>
                    <TextArea value={serviceComment} onChange={(e) => setServiceComment(e.target.value)} rows={4} placeholder="Расскажи максимально подробно, мы с удовольствием прочитаем!" maxLength={6} />
                </Flex>
                <Divider />
                <Flex align={"center"}>
                    <div style={{width: 330}}>Оцените качество номер</div>
                    <Rate allowHalf value={roomConditionRating} onChange={(rating) => setRoomConditionRating(rating)}/>
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 330}}>Оставьте более подробный отзыв о качестве номеров</div>
                    <TextArea value={roomConditionComment} onChange={(e) => setRoomConditionComment(e.target.value)} rows={4} placeholder="Расскажи максимально подробно, мы с удовольствием прочитаем!" maxLength={6} />
                </Flex>
                <Divider />
                <Flex align={"center"}>
                    <div style={{width: 330}}>Оцените соотношение цена/качество</div>
                    <Rate allowHalf value={moneyRating} onChange={(rating) => setMoneyRating(rating)}/>
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 330}}>Оставьте improvementComment</div>
                    <TextArea value={improvementComment} onChange={(e) => setImprovementComment(e.target.value)} rows={4} placeholder="Расскажи максимально подробно, мы с удовольствием прочитаем!" maxLength={6} />
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 330}}>Оставьте общий отзыв об отеле</div>
                    <TextArea value={finalVerdict} onChange={(e) => setFinalVerdict(e.target.value)} rows={4} placeholder="Расскажи максимально подробно, мы с удовольствием прочитаем!" maxLength={6} />
                </Flex>
                <Divider />
                <Flex align={"center"}>
                    <div style={{width: 330}}>Статус</div>
                    <Select
                        loading={isGetGuestRequestsLoading}
                        value={status}
                        placeholder={"Выберите статус"}
                        style={{width: '100%'}}
                        onChange={(e) => setStatus(e)}
                        options={[{value: REPORT_STATUSES.ON_MISSION, label:"Тайный гость на миссии"},
                            {value: REPORT_STATUSES.REPORT_SENT, label:"Отчет отправлен"},
                            {value: REPORT_STATUSES.CONFIRMED, label:"Обработано"},
                        ]}
                    />
                </Flex>
                <Flex align={"center"}>
                    <div style={{width: 330}}>Колличество баллов за отзыв</div>
                    <InputNumber value={pointsFromAdmin} onChange={(val) => setPointsFromAdmin(val ?? 0)} />
                </Flex>
            </Flex>
        </Modal>
    );
};
