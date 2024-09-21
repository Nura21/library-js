const { resolve } = require("path");
var dbDMA = require("../library/dbConnection");

const MemberModels = (module.exports = {
    GetAll: async function (){
        return new Promise((resolve, reject) => {
            let query = `
                SELECT members.*, 
                    COUNT(borrowings.borrow_id) AS borrowed_books
                FROM members
                LEFT JOIN borrowings 
                    ON borrowings.member_code = members.code 
                    AND borrowings.return_date IS NULL 
                    AND borrowings.borrow_date IS NOT NULL
                GROUP BY members.code;
            `
            console.log(query)
            dbDMA.query(query, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
            });
        });
    },
    AddPenalty: async function (member_code, penalty_until){
        return new Promise((resolve, reject) => {
            let query = `
                UPDATE members
                SET penalty_until = ?
                WHERE code = ?
            `;
            console.log(query);
            dbDMA.query(query, [penalty_until, member_code], function(err, result) {
                if(err){
                    reject(err);
                }else{
                    resolve({
                        code: member_code,
                        penalty_until: penalty_until
                    });
                }
            });
        })
    },
    RemovePenalty: async function (member_code){
        return new Promise((resolve, reject) => {
           let query = `
                UPDATE members SET penalty_until = NULL
                WHERE code = ?
           `;
           console.log(query);
           dbDMA.query(query, [member_code], function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve({
                        member_code: member_code,
                        penalty_until: ''
                    }); 
                }
           });
        });
    },
    CheckPenalty: async function (member_code){
        return new Promise((resolve, reject) => {
           let query = `
                SELECT penalty_until FROM members WHERE code = ?
           `;
           console.log(query);
           dbDMA.query(query, [member_code], function(err, result){
            if(err){
                reject(err);
            }else{
                resolve({
                    penalty_until: result[0].penalty_until
                });
            }
           })
        });
    }
});
