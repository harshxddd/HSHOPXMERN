import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";
const Token=JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
console.log(Token)

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${Token}` },
});
