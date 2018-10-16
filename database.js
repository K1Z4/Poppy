"use strict";

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('app.sqlite');

db.serialize(function() {
    db.get("PRAGMA foreign_keys = ON");
    db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        PRIMARY KEY(id),
        CONSTRAINT unique_email UNIQUE (email))`);
});

//db.on('trace', console.log);

module.exports = class {
    static getUserWithPassword(email) {
        return single('SELECT id, email, password FROM user WHERE email = ?', [email]);
    }

    static getUserCount() {
        return single('SELECT COUNT(id) AS count FROM user').then(e => e.count);
    }

    static getUser(email) {
        return single('SELECT id, email FROM user WHERE email = ?', [email]);
    }

    static addUser(email, password, apikey) {
        return run('INSERT INTO user(email, password) VALUES(?, ?)', [email, password]);
    }
}

function run(sql, props) {
    return _promisifyDbCall("run", sql, props);
}

function all(sql, props) {
    return _promisifyDbCall("all", sql, props);
}

function single(sql, props) {
    return _promisifyDbCall("get", sql, props);
}

function _promisifyDbCall(method, sql, props = []) {
    return new Promise((resolve, reject) => {
        db.serialize(function() {
            db[method](sql, props, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            })
        });
    });
}