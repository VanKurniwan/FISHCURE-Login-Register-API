const { registerUserHandler, loginUserHandler } = require("./handler");

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
    // Mengambil data user
    // {

    //     method: 'GET',
    //     path: '/get/{userID}',
    //     handler: getUserHandler
    // }

    // jika user lupa password
];

module.exports = routes;