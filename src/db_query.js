const mysql = require('mysql');

// Membuat Koneksi ke Database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test koneksi ke database
const testConnection = () => {
    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) {
                reject(new Error('Database connection failed: ' + err.message));
            } else {
                console.log('Terhubung dengan database...');
                resolve();
            }
        });
    });
};

// Insert to database
const insertQuery = (sql, data) => {
    return new Promise((resolve, reject) => {
        db.query(sql, data, (err, result) => {
            if (err) {
                reject(new Error('Database insert failed: ' + err.message));
            } else {
                resolve(result);
            }
        });
    });
};

// Select a query
const selectAQuery = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject(new Error('Database select failed: ' + err.message));
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { db, testConnection, insertQuery, selectAQuery };