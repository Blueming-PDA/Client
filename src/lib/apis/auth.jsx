import instance from "./base";
import axios from "axios";

//로그인
export async function fetchLogin({ email, password }) {
  try {
    const response = await instance.post("users/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

//회원가입
export async function fetchSignup({ email, password, name, phone }) {
  try {
    const response = await instance.post("users/signup", {
      email,
      password,
      name,
      phone,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function fetchLogout() {
  const response = await instance.get("users/logout");
  return response;
}

//비밀번호 변경
export async function fetchUpdatePassword({ newPassword, userId }) {
  try {
    const response = await instance.put(`users/${userId}`, {
      password: newPassword,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
