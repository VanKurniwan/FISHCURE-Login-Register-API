const { registerUserHandler, loginUserHandler, otpSendHandler, otpAuthHandler, updatePasswordHandler } = require("./handler");

const routes = [
    {
        // menyimpan data register user
        method: 'POST',
        path: '/register',
        handler: registerUserHandler
    },
    {
        // verifikasi login user
        method: 'POST',
        path: '/login',
        handler: loginUserHandler
    },
    {
        // mengirim kode OTP
        method: 'POST',
        path: '/sendOtp',
        handler: otpSendHandler
    },
    {
        // autentifikasi input otp
        method: 'POST',
        path: '/authOtp',
        handler: otpAuthHandler
    },
    {
        // ganti password
        method: 'POST',
        path: '/updatePassword',
        handler: updatePasswordHandler
    }
];

module.exports = routes;