// Get the functions in the db.js file to use
const db = require('../services/db');
//const bcrypt = require("bcryptjs");

class login {

    // Id of the user
    id;

    // Email of the user
    email;

    // Username of the user
    Fname;

    constructor(email) {
        this.email = email;
    }
    
    // Get an existing user id from an email address, or return false if not found
    async getIdFromEmail()  {
        var sql = "SELECT userID FROM users WHERE email = ?";
       
        const result = await db.query(sql, [this.email]);

        // TODO LOTS OF ERROR CHECKS HERE..
        if (JSON.stringify(result) != '[]') {
            this.id = result[0].userID;
            return this.id;
        }
        else {
            return false;
        }
    }
    // Get an existing user's user_name from an email address, or return false if not found
    async getUserNameFromEmail()  {
        var sql = "SELECT Fname FROM users WHERE email = ?";
       
        const result = await db.query(sql, [this.email]);

        // TODO LOTS OF ERROR CHECKS HERE..
        if (JSON.stringify(result) != '[]') {
            this.username = result[0].Fname;
            return this.username;
        }
        else {
            return false;
        }
    }

    // Add a password to an existing user
    async setUserPassword(password) {
        const pw = await bcrypt.hash(password, 10);
        var sql = "UPDATE users SET password = ? WHERE userID = ?"
        const result = await db.query(sql, [pw, this.id]);
        return true;
    }
    
    // Add a new record to the users table    
    async addUser(password) {
        const pw = await bcrypt.hash(password, 10);
        var sql = "INSERT INTO users (email, password) VALUES (? , ?)";
        const result = await db.query(sql, [this.email, pw]);
        console.log(result.insertId);
        this.id = result.insertId;
        return true;    
    }

    // Test a submitted password against a stored password?
    async authenticate(submitted) {
        console.log(submitted);

         var sql = "SELECT password FROM users WHERE userID = ?";
         const result = await db.query(sql, [this.id]);
         console.log(result);
         
//         const match = await bcrypt.compare(submitted, result[0].password);
           const match = await submitted == result[0].password;

         if (match == true) {
             return true;
         }
         else {
             return false;
         }
    }

    


}

module.exports  = {
    users
}