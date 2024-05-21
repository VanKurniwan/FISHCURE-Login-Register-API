const mysql = require('mysql');

// Membuat Koneksi ke Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_db'
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