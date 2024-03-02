import React, { useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import CodeShare from "./codeShare/CodeShare";
import SetLink from "./codeShare/SetLink";
import Question from "./question/Question";
import AlarmList from "./question/AlarmList";
import "bootstrap/dist/css/bootstrap.min.css";
import point from "/point.png";
import "./MainPage.css";
import socket from "./socket/socket";
import { setSid } from "./socket/socketEvents";
import data from "../assets/data/ curriculum.json";

export default function MainPage() {
  const [showCodeShare, setShowCodeShare] = useState(false);
  const [showLinkInput, setshowLinkInput] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showAlarmList, setShowAlarmList] = useState(false);

  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(
    // 날짜 형식 YYYY-MM-DD으로 변경
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [weekIndex, setWeekIndex] = useState(() => {
    // 초기 index는 오늘자 날짜가 속한 주로 설정
    const todayIndex = data.findIndex(
      (dayData) => dayData.date === todayString
    );
    return Math.floor(todayIndex / 5);
  });

  const CLASS = "프로 디지털 아카데미";

  let userObj = useSelector((state) => {
    return state.user.userInfo;
  });

  useEffect(() => {
    if (userObj) {
      setSid(userObj);
    }
  }, []);

  const handleShowCodeShare = () => {
    setShowCodeShare((showCodeShare) => !showCodeShare);
  };

  // 링크 공유 하기 버튼
  const handleShowLinkInput = () => {
    setshowLinkInput((showLinkInput) => !showLinkInput);
  };

  // 질문 보기 버튼
  const handleShowQuestion = () => {
    setShowQuestion((showQuestion) => !showQuestion);
  };

  // 질문 보기 버튼
  const handleShowAlarmList = () => {
    setShowAlarmList((showAlarmList) => !showAlarmList);
  };

  // 주별 데이터 가져오는 함수
  const getWeekData = (idx) => {
    const weekData = data.slice(idx * 5, (idx + 1) * 5);
    return weekData;
  };

  // socket 연결 확인
  useEffect(() => {
    console.log(socket);

    // socket.on('connection', (io) => {
    //   console.log('SocketID::', io.id);

    // })
  });

  return (
    <div className="main-container">
      {userObj && (
        <div className="btn-group">
          {userObj.admin === 1 ? (
            <Button className="main-btn" onClick={handleShowAlarmList}>
              🔔 알림보기
            </Button>
          ) : (
            <Button className="main-btn " onClick={handleShowQuestion}>
              🙋 질문하기
            </Button>
          )}
          <Button className="main-btn" onClick={handleShowLinkInput}>
            🔗 화면공유하기
          </Button>
          <Button className="main-btn" onClick={handleShowCodeShare}>
            🖥️ 화면공유보기
          </Button>
        </div>
      )}
      {showCodeShare && <CodeShare />}
      {showQuestion && <Question handleShowQuestion={handleShowQuestion} />}
      {showAlarmList && <AlarmList handleShowAlarmList={handleShowAlarmList} />}
      {showLinkInput && <SetLink handleShowLinkInput={handleShowLinkInput} />}

      <img className="point-img" src={point} width="75" alt="Blueming point" />
      <div className="week-board">
        <p>나의 수업: {CLASS}</p>
        <Carousel
          activeIndex={weekIndex}
          onSelect={setWeekIndex}
          interval={null}
        >
          {Array(Math.ceil(data.length / 5))
            .fill()
            .map((_, index) => (
              <Carousel.Item key={index}>
                <div className="week-card-container">
                  {getWeekData(index).map((dayData, dayIndex) => (
                    <Card
                      key={dayIndex}
                      className={`custom-card c${dayIndex + 1}`}
                    >
                      <div className="circle"></div>
                      <p className="week-text">{dayData.day}</p>
                      <p
                        className={`week-num ${
                          dayData.holiday ? "holiday" : ""
                        }`}
                      >
                        {dayData.date.substring(5).replace("-", "/")}
                      </p>
                      <p className="week-curriculum">{dayData.content}</p>
                    </Card>
                  ))}
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
    </div>
  );
}
