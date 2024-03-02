import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../socket/socket';
import { useSelector } from 'react-redux';
import './Alarm.css'

const Alarm = () => {

    let userObj = useSelector((state) => {
        return state.user.userInfo;
    });

    const getToastColor = (title) => {
        switch (title) {
            case "코드를 다시 보여주세요":
                return 'toast-red';
            case "너무 빨라요":
                return 'toast-green';
            case "다시 한번 설명해 주세요":
                return 'toast-blue';
            default:
                return 'toast-default';
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


    useEffect(() => {
        // 관리자만 알림 표시
        if (userObj && userObj.admin === 1) {
            socket.on('message', (alarmContent) => {
                // 알림 내용을 가져와서 토스트로 표시
                console.log(alarmContent);
                const message = (
                    <div>
                        <span style={{ fontSize: '20px', color: 'black' }} > 📍 {alarmContent.alarmTitle} </span>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {/* 화면에 보이는 알림은 사용자를 가릴까? */}
                            {/* <span style={{ backgroundColor: '#F5F5F5', borderRadius: '10px', padding: '5px' }}> {alarmContent.userName} </span> */}
                            <span style={{ padding: '5px' }}> {calculateTime(alarmContent.alarmCreatedAt)} </span>
                        </div>
                    </div>
                );
                toast(message, {
                    className: getToastColor(alarmContent.alarmTitle),
                });
            });
        }

        // 컴포넌트가 언마운트될 때에는 리스너를 제거
        return () => {
            socket.off('message');
        };
    }, [userObj]);

    return (
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
};

export default Alarm;
