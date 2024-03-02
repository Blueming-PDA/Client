import instance from "./base";

//user의 프로필 이미지 백엔드로 보냄
export async function fetchChangeProfileImage(userId, profile) {
  try {
    const response = await instance.put(`users/${userId}/profile`, {
      profile: profile,
    });
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

//프로필 이미지 가져옴
export async function fetchGetProfileImage(userId) {
  console.log("ttttt");
  try {
    const response = await instance.get(`users/${userId}/profile`);
    console.log("ddddd");
    console.log(response);
    return response.profile;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
