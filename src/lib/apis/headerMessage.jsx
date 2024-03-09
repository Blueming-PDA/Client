import instance from "./base";

//헤더 메세지 백엔드로 보냄
export async function writeHeaderMessage(headerMessage) {
  try {
    const response = await instance.post("headerMessage", headerMessage);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

//헤더메세지 가져옴
export async function getHeaderMessage() {
  const response = await instance.get("headerMessage");
  return response;
}
