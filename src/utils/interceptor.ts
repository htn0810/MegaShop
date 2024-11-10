import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8080/megashop', // Replace with your API URL
})

// http.interceptors.request.use(
//   (config) => {
//     // Retrieve the JWT token from local storage (or wherever you store it)
//     const token =
//       'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodG4wODEwMjAwMUBnbWFpbC5jb20iLCJpYXQiOjE3Mjc3OTQ5ODYsImV4cCI6MTcyNzc5ODU4Nn0.cFqE-peP55TrHSdoURd7bgsHKVrkUp-0XLm5G5BPmZI'

//     // If the token exists, add it to the headers
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error)
//   },
// )
