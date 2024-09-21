var dbDMA = require("../library/dbConnection");

const BookModels = (module.exports = {
    GetAll: async function (){
        return new Promise((resolve, reject) => {
            let query = `
                SELECT * FROM books WHERE stock > 0
            `;
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
    CheckStock: async function (book_code){
        return new Promise((resolve, reject) => {
           let query = `
            SELECT stock FROM books WHERE code = ?
           ` ;
           console.log(query);
           dbDMA.query(query, [book_code], function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve({
                        stock: result[0].stock
                    });
                }
           });
        });
    },
    RemoveStock: async function (book_code, stock) {
        return new Promise((resolve, reject) => {
            let stock_before = stock
            stock -= 1
            let query = `
                UPDATE books
                SET stock = ?
                WHERE code = ?
            `;
            console.log(query);
            dbDMA.query(query, [stock, book_code], function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve({
                        stock_before: stock_before,
                        stock_now: stock
                    });
                }
            });
        })
    },
    AddStock: async function(book_code, stock) {
        return new Promise((resolve, reject) => {
            let query = `
                UPDATE books
                SET stock = ?
                WHERE code = ?
            `;
            console.log(query);
            dbDMA.query(query, [stock, book_code], function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve({
                        stock_now: stock
                    })
                }
            });
        });
    }
});
