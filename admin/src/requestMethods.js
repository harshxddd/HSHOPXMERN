import axios from 'axios'

const BASE_URL = "http://localhost:3000/api/";
const Token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjJlNzA2Zjk1YTNlYWY5NGViZDg2OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMDY3ODMxM30._UjLmzovzdaRqhN-F7dNT6hYEEv7RdnzhkkmKrh5Dro'
console.log(Token)
export const publicRequest=axios.create({
    baseURL:BASE_URL,
})

export const userRequest=axios.create({
baseURL:BASE_URL,
headers:{token:`Bearer ${Token}`}

})