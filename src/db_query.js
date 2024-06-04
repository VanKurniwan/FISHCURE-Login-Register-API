const mysql = require('mysql');

// Membuat Koneksi ke Database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test koneksi ke database
const testConnection = db.connect((err) => {
    if (err) { throw err; };
    console.log('Terhubung dengan database... ');
});

// insert to database
const insertQuery = (sql, data) => {
    db.query(sql, data, (err) => {
        if (err) { throw err; };
    })
};

// select a query
const selectAQuery = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { db, testConnection, insertQuery, selectAQuery };