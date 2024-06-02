require('dotenv').config();

const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const nodemailer = require("nodemailer");
const { insertQuery, selectAQuery } = require("./db_query");

// menuliskan data yang dikirim aplikasi ke database
const registerUserHandler = async (request, h) => {
    try {
        const { email, password } = request.query;

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
        const hashPassword = await bcrypt.hash(password, 13);
        const data = {
            email: email,
            password: hashPassword
        };

        const sqlInsert = 'INSERT INTO login_info SET ?';
        await insertQuery(sqlInsert, data);

        const response = h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: { email: email }
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
        const { email, password } = request.query;

        // mengambil data dari database
        const sql = `SELECT * FROM login_info WHERE email = '${email}'`;
        const result = await selectAQuery(sql);

        if (result < 1) {
            const response = h.response({
                status: 'failed',
                message: 'Email atau Password yang dimasukkan salah'
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
                data: { email: user.email }
            });

            response.code(201);
            return response;
        }

        const response = h.response({
            status: 'failed',
            message: 'Email atau Password yang dimasukkan salah'
        });

        response.code(401);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// mengirimkan kode otp ke email ketika lupa password
const otpSendHandler = async (request, h) => {
    try {
        const { email } = request.query;

        // validate email
        const sql = `SELECT * FROM login_info WHERE email = '${email}'`;
        const result = await selectAQuery(sql);

        if (result < 1) {
            const response = h.response({
                status: 'failed',
                message: 'Email yang anda masukkan belum melakukan register'
            });

            response.code(401);
            return response;
        }

        //generate otp
        const otp = nanoid(6);

        // send email
        let config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        }

        let transporter = nodemailer.createTransport(config);

        transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "FISHCURE - Reset Password Request",
            text: `Kode OTP anda : ${otp}`,
            html: `<b>Kode OTP anda : ${otp} </b>`
        }).catch(err => {
            console.log("Error:", err);
            return h.response({ message: "Server error" }).code(500);
        });

        // save to database
        const data = {
            otp: otp
        };

        const sqlInsert = `UPDATE login_info SET ? WHERE email = '${email}'`;
        await insertQuery(sqlInsert, data);

        // return success
        const response = h.response({
            status: 'success',
            message: 'Kode OTP berhasil dikirimkan',
            data: { otp: otp }
        });

        response.code(201);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
};

// mengkonfirmasi kode otp yang dimasukka pengguna
const otpAuthHandler = async (request, h) => {
    try {
        const { email, otp } = request.query;

        const sql = `SELECT * FROM login_info WHERE email = '${email}' && otp = '${otp}'`;
        const result = await selectAQuery(sql);

        if (result[0] !== undefined) {
            const data = {
                otp: ''
            };
            const sqlInsert = `UPDATE login_info SET ? WHERE email = '${email}'`;
            await insertQuery(sqlInsert, data);

            const response = h.response({
                status: 'success',
                message: 'Kode OTP telah sesuai',
                data: { email: email }
            });

            response.code(201);
            return response;
        }

        const response = h.response({
            status: 'failed',
            message: 'Kode yang anda masukkan salah'
        });

        response.code(401);
        return response;

    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
}

// update password pengguna
const updatePasswordHandler = async (request, h) => {
    try {
        const { email, newPassword } = request.query;
        const hashPassword = await bcrypt.hash(newPassword, 13);

        // update database
        const data = {
            password: hashPassword
        };
        const sqlInsert = `UPDATE login_info SET ? WHERE email = '${email}'`;
        await insertQuery(sqlInsert, data);

        const response = h.response({
            status: 'success',
            message: 'Password berhasil diperbarui',
            data: { email: email }
        });

        response.code(201);
        return response;
    } catch (err) {
        console.log("Error:", err);
        return h.response({ message: "Server error" }).code(500);
    }
}

module.exports = { registerUserHandler, loginUserHandler, otpSendHandler, otpAuthHandler, updatePasswordHandler };