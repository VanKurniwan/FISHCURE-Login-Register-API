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

module.exports = { testConnection };