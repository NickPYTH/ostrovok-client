import React, {useEffect, useState} from 'react';
import {Button, Flex, Rate, Table, TableProps} from 'antd';
import {useSelector} from "react-redux";
import {RootStateType} from "store/store";
import {NotificationPlacement} from "antd/es/notification/interface";
import {GuestRequestModal} from "pages/GuestRequestsPage/ui/GuestRequestModal";
import {InspectionReportModel} from "entities/InspectionReportModel";
import {inspectionReportAPI} from "service/InsperctionReportService";
import {InspectionReportModal} from "pages/InspectionReportsPage/ui/InspectionReportModal";

const InspectionReportsPage: React.FC = () => {

    // Store
    const notificationAPI = useSelector((state: RootStateType) => state.currentUser.notificationContextApi);
    // -----

    // States
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [selected, setSelected] = useState<InspectionReportModel | null>(null);
    // -----

    // Web requests
    const [getAll, {
        data: data,
        isLoading: isDataLoading,
        isError: isDataError,
    }] = inspectionReportAPI.useGetAllMutation();
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

    // Effects
    useEffect(() => {
        getAll();
    }, []);
    useEffect(() => {
        if (!isVisibleModal) setSelected(null);
    }, [isVisibleModal]);
    useEffect(() => {
        if (isDataError) showErrorNotification('topRight', 'Ошибка загрузки данных');
    }, [isDataError]);
    // -----

    // Useful utils
    const columns: TableProps<InspectionReportModel>['columns'] = [
        {
            title: 'ИД',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => (a.id && b.id) ? a.id - b.id : 0,
            sortDirections: ['descend', 'ascend'],
            defaultSortOrder: 'descend'
        },
        {
            title: 'Отель',
            dataIndex: 'guestRequest',
            key: 'hotel',
            render: (_, record) => (<div>{record.guestRequest.hotelInspectionRequest.hotel.name}</div>),
        },
        {
            title: 'Секретный гость',
            dataIndex: 'guestRequest',
            key: 'guest',
            render: (_, record) => (<div>{record.guestRequest.guest.username}</div>),
        },
        {
            title: 'Рейтинг чистоты',
            dataIndex: 'cleannessRating',
            key: 'cleannessRating',
            render: (_, record) => (<Rate value={record.cleannessRating}/>),
        },
        {
            title: 'Рейтинг сервиса',
            dataIndex: 'serviceRating',
            key: 'serviceRating',
            render: (_, record) => (<Rate value={record.serviceRating}/>),
        },
        {
            title: 'Рейтинг качества номеров',
            dataIndex: 'roomConditionRating',
            key: 'roomConditionRating',
            render: (_, record) => (<Rate value={record.roomConditionRating}/>),
        },
        {
            title: 'Соотношение цена/качество',
            dataIndex: 'moneyRating',
            key: 'moneyRating',
            render: (_, record) => (<Rate value={record.moneyRating}/>),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },
    ]
    // -----

    return (
        <Flex vertical={true} gap={'small'} style={{margin: "0 5px 0 5px"}}>
            {isVisibleModal &&
                <InspectionReportModal inspectionReport={selected} visible={isVisibleModal}
                                   setVisible={setIsVisibleModal} refresh={getAll}/>}
            <Button type={'primary'} onClick={() => setIsVisibleModal(true)}
                    style={{width: 100}}>Добавить</Button>
            <Table
                style={{width: '100vw'}}
                columns={columns}
                dataSource={data}
                loading={isDataLoading}
                pagination={{
                    defaultPageSize: 100,
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: (e) => {
                            setIsVisibleModal(true);
                            setSelected(record);
                        },
                    };
                }}
            />
        </Flex>
    );
};

export default InspectionReportsPage;