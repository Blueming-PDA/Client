import React, { useEffect, useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

export default function CodeShare() {
    const [url, setUrl] = useState(null);
    const [link, setLink] = useState(null);
    const [popupWindow, setPopupWindow] = useState(null);
    const [loading, setLoading] = useState(true);

    let userObj = useSelector((state) => {
        return state.user.userInfo;
    });

    useEffect(() => {
        const getActiveLink = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/link/activate/');
                setLink(response.data);
            } catch (error) {
                console.error("Error fetching active link: ", error);
            } finally {
                setLoading(false);
            }
        }
        getActiveLink();
    }, []);

    useEffect(() => {
        if (!link) return;

        const getContent = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/proxy/${encodeURIComponent(link.codeLink)}`);
                setUrl(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setUrl(null);
            } finally {
                setLoading(false);
            }
        }
        getContent();
    }, [link]);

    const newWindow = () => {
        const width = 600;
        const height = 400;
        const left = window.screen.width - width;
        const top = window.screen.height - height;
        const newPopupWindow = window.open(link.codeLink, '_blank', `toolbar=yes,scrollbars=yes,resizable=yes,top=${top},left=${left},width=${width},height=${height}`);
        setPopupWindow(newPopupWindow);
    }

    const stopSharing = async () => {
        try {
            await axios.put(`/api/link/${link._id}`, { activate: false });
            setLink(null);
            setUrl('');
            if (popupWindow) popupWindow.close();
        } catch (error) {
            console.error("Error stopping sharing: ", error);
        }
    }

    const renderContent = () => {
        if (loading) {
            return <Spinner animation="border" role="status" style={{ color: 'gray' }} />;
        } else if (!link) {
            return <div style={{ color: 'red' }}>화면을 공유할 수 있는 유효한 링크가 없습니다. 화면 공유 링크를 먼저 저장해주세요!</div>;
        } else if (url === null) {
            return (
                <>
                    <Button onClick={stopSharing}>공유 중지하기</Button>
                    <div style={{ color: 'red' }}>입력된 링크( {link.codeLink} )는 공유할 수 없습니다</div>
                </>
            );
        } else {
            return (
                <div>⌨️ 코드 화면 공유
                    <div>{userObj.name}님의 화면을 보고있습니다.</div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '10px' }}>
                        <Button onClick={newWindow}>🖥️ 새창으로 보기</Button>
                        {userObj._id === link.userId ? <Button onClick={stopSharing}>공유 중지하기</Button> : <></>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ width: '100%', height: '500px', position: 'relative' }}>
                            <iframe
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                srcDoc={url}
                                sandbox='allow-scripts allow-same-origin'
                                title='codeShare'
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <Container style={{ width: '800px', backgroundColor: '#ebf1ff', borderRadius: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', position: 'relative', marginTop: 50, marginBottom: 50, bottom: '-20px', padding: 30 }}>
            {renderContent()}
        </Container>
    )
}
