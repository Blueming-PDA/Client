import React, { useEffect, useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import axios from 'axios';


export default function AlarmList({ handleShowAlarmList }) {
    const [alarms, setAlarms] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchAlarms = async () => {
            try {
                let { data } = await axios.get('/api/alarms');
                data = data.sort((a, b) => new Date(b.alarmCreatedAt) - new Date(a.alarmCreatedAt));  // 최신순으로 정렬
                setAlarms(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAlarms();
    }, []);

    const handleConfirm = async (id) => {
        try {
            await axios.put(`/api/alarms/${id}`, { confirmed: true });
            setAlarms(alarms.filter(alarm => alarm._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const filteredAlarms = showAll ? alarms : alarms.filter(alarm => !alarm.confirmed);

    const getAlertColor = (title) => {
        switch (title) {
            case "코드를 다시 보여주세요":
                return '#F0FFFF';  // 빨간색
            case "너무 빨라요":
                return '#FFE4E1';  // 초록색
            case "다시 한번 설명해 주세요":
                return '#FFF8DC';  // 파란색
            default:
                return '#edeceb';  // 기본색
        }
    };

    const calculateTime = (pastTime) => {
        const timeDifference = new Date() - new Date(pastTime);
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}일 전`;
        if (hours > 0) return `${hours}시간 전`;
        if (minutes > 0) return `${minutes}분 전`;
        return `${seconds}초 전`;
    };

    return (
        <Modal show={true} onHide={handleShowAlarmList} >
            <Modal.Header closeButton>
                <Modal.Title centered>알림 보기</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '400px', overflow: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: '5%' }}>
                    <Button onClick={() => setShowAll(false)}>✨NEW</Button>
                    <Button onClick={() => setShowAll(true)}>🔍View All</Button>
                </div>
                {filteredAlarms.map(alarm =>
                    <Alert key={alarm._id} style={{ backgroundColor: getAlertColor(alarm.alarmTitle), border: 'none' }} onClose={() => handleConfirm(alarm._id)} dismissible>
                        <span>  🏷️ {alarm.alarmTitle}</span>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                            <span style={{ backgroundColor: '#F5F5F5', borderRadius: '10px', padding: '5px' }}> {alarm.userName} </span>
                            <span style={{ padding: '5px' }}>  {calculateTime(alarm.alarmCreatedAt)}</span>
                        </div>
                    </Alert>
                )}
            </Modal.Body>
        </Modal>
    );
}
