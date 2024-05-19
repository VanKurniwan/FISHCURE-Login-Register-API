const { registerUserHandler, loginUserHandler, getUserHandler } = require("./handler");

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
        path: '/login/{userID}',
        handler: loginUserHandler
    },
    {
        // Mengambil data user
        method: 'GET',
        path: '/{userID}',
        handler: getUserHandler
    }
];

module.exports = routes;