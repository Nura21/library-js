const { resolve } = require("path");
var dbDMA = require("../library/dbConnection");

const BorrowModels = (module.exports = {
    Insert: async function (data) {
        return new Promise((resolve, reject) => {
          var col = [];
          var val = [];
          var valSql = [];
    
          var i = 1;
          for (var d in data) {
            col.push(d);
            val.push(data[d]);
            valSql.push("?");
            i++;
          }
          var query =
            `INSERT INTO borrowings` +
            `  (${col.join(", ")})  values (${valSql.join(", ")})`;
    
          dbDMA.query(query, val, function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve({
                id: result.insertId,
                book_code: data.book_code
              });
            }
          });
        });
    },
    CheckMember: async function (member_code) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT COUNT(*) AS borrowed_count 
                FROM borrowings 
                WHERE member_code = ? 
                AND borrow_date IS NOT NULL
                AND return_date IS NULL
            `;
    
            // Pass member_code as an array (for parameterized query)
            dbDMA.query(query, [member_code], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    // Extract the borrowed_count from result[0]
                    resolve(result[0].borrowed_count);
                }
            });
        });
    },        
    CheckBook: async function (book_code) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT COUNT(*) AS borrowed_count 
                FROM borrowings 
                WHERE book_code = ? 
                AND borrow_date IS NOT NULL
                AND return_date IS NULL
            `;
    
            // Pass member_code as an array (for parameterized query)
            dbDMA.query(query, [book_code], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    // Extract the borrowed_count from result[0]
                    resolve(result[0].borrowed_count);
                }
            });
        });
    },
    CheckMemberBook: async function (member_code, book_code) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT * FROM borrowings WHERE member_code = ?
                AND book_code = ?
                AND return_date IS NULL
            `;

            dbDMA.query(query, [member_code, book_code], function(err, result) {
                if (err) {
                    reject(err);
                }else{
                    resolve({
                        borrow_date: result[0].borrow_date
                    })
                }
            });
        });
    },
    UpdateMemberBook: async function(member_code, book_code, return_date){
        return new Promise((resolve, reject) => {
            let query = `
                UPDATE borrowings SET return_date = ?
                WHERE member_code = ?
                AND book_code = ?
                AND borrow_date IS NOT NULL
            `;

            dbDMA.query(query, [return_date, member_code, book_code], function(err, result) {
                if(err){
                    reject(err);
                }else{
                    resolve({
                        return_date: return_date
                    })
                }
            });
        });
    }
});
