const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const { insertQuery, selectAQuery } = require("./db_query");

// menuliskan data yang dikirim aplikasi ke database
const registerUserHandler = async (request, h) => {
    try {
        const { email, password } = request.payload;

        // cek jika email sudah digunakan
        const sqlSelect = `SELECT * FROM login_info WHERE email = '${email}'`;
        const result = await selectAQuery(sqlSelect);

        if (result.length >= 1) {
            const response = h.response({
                status: 'failed',
                message: 'Email sudah digunakan',
            });

            response.code(401);
            return response;
        }

        // menyimpan user data ke database
        const idUser = nanoid(16);
        const hashPassword = await bcrypt.hash(password, 13);
        const data = {
            id_user: idUser,
            email: email,
            password: hashPassword
        };

        const sqlInsert = 'INSERT INTO login_info SET ?';
        insertQuery(sqlInsert, data);

        const response = h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: { id_user: idUser }
        });

        response.code(201);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// memastikan username & password sesuai dengan database
const loginUserHandler = async (request, h) => {
    try {
        const { email, password } = request.payload;

        // mengambil data dari database
        const sql = `SELECT * FROM login_info WHERE email = '${email}'`;
        const result = await selectAQuery(sql);

        // cek jika data ditemukan
        if (result < 1) {
            const response = h.response({
                status: 'failed',
                message: 'Email atau Password yang dimasukkan salah',
            });

            response.code(401);
            return response;
        }

        // cek autentikasi password
        const user = result[0];
        const authenticated = await bcrypt.compare(password, user.password);

        if (authenticated) {
            const response = h.response({
                status: 'success',
                message: 'User berhasil login',
                data: {
                    id_user: user.id_user,
                    email: user.email
                }
            });

            response.code(201);
            return response;
        }
    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// mengambil data user dari database
// const getUserHandler = (request, h) => {
// };

module.exports = { registerUserHandler, loginUserHandler };