const { registerUserHandler, loginUserHandler, otpSendHandler, otpAuthHandler, updatePasswordHandler } = require("./handler");

const routes = [
    {
        // menyimpan data register user
        method: 'GET',
        path: '/register',
        handler: registerUserHandler
    },
    {
        // verifikasi login user
        method: 'GET',
        path: '/login',
        handler: loginUserHandler
    },
    {
        // mengirim kode OTP
        method: 'GET',
        path: '/sendOtp',
        handler: otpSendHandler
    },
    {
        // autentifikasi input otp
        method: 'GET',
        path: '/authOtp',
        handler: otpAuthHandler
    },
    {
        // ganti password
        method: 'GET',
        path: '/updatePassword',
        handler: updatePasswordHandler
    }
];

module.exports = routes;