import React, { useCallback, useState } from 'react';
import { Modal, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

export default function SetLink({ handleShowLinkInput }) {
    const [link, setLink] = useState('');

    let userObj = useSelector((state) => {
        return state.user.userInfo;
    });

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(link)
        axios.post('/api/link', { codeLink: link, userId: userObj._id, userName: userObj.name })
            .then((response) => {
                console.log(response);
                alert("링크가 정상적으로 저장되었습니다.")
                handleShowLinkInput();
            })
            .catch((error) => {
                console.log(error);
            });
    }, [handleShowLinkInput, link])

    return (
        <>
            <Modal show={true} onHide={handleShowLinkInput}>
                <Modal.Header closeButton>

                    <Modal.Title>링크를 입력하세요!</Modal.Title>

                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group className='mb-3'>

                            <Form.Label>VSCode LiveShare 링크를 입력해주세요.</Form.Label>
                            <Form.Control as='textarea' rows={5} placeholder='input Link' value={link} onChange={(e) => setLink(e.target.value)} />

                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit'>입력</Button>
                        <Button onClick={handleShowLinkInput} >취소</Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    )
}

