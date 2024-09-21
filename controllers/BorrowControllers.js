const rescode = require("../config/env.response");
const BorrowModels = require("../models/BorrowModels");
const BookModels = require("../models/BookModels");
const MemberModels = require("../models/MemberModels");
const moment = require("moment");
const BorrowControllers = (module.exports = {
    Borrow: async (req, res) => {
        let apiResult = {};
        let checkMember;
        let checkBook;
        let checkingPenalty;

        try{
            let data = {
                ...req?.body
            }

            data.borrow_date = moment().format("YYYY-MM-DD");

            if(data.member_code){
                checkMember = await BorrowModels.CheckMember(data.member_code); // is member still have chance to borrow
                checkPenalty = await MemberModels.CheckPenalty(data.member_code)

                if(checkPenalty){
                    checkingPenalty = new Date(data.borrow_date) > new Date(checkPenalty.penalty_until);
                }

                if(checkMember < 2 && (checkPenalty == undefined || checkingPenalty == true)){
                    if(checkingPenalty == true){
                        removePenalty = await MemberModels.RemovePenalty(data.member_code);
                    }
                    checkBook = await BorrowModels.CheckBook(data.book_code); // is the book already borrowed
                    console.log(checkBook);
                    if(checkBook == 0){ // if the book not borrowed
                        checkStock = await BookModels.CheckStock(data.book_code);
                        if(checkStock.stock > 0){
                            updateStock = await BookModels.RemoveStock(data.book_code, checkStock.stock);
                            console.log(updateStock)
                            if(updateStock.stock_before != null && updateStock.stock_now != null){
                                insertBook = await BorrowModels.Insert(data);
                                console.log(insertBook);
                                if(insertBook.id){
                                    apiResult.meta = rescode.Success.GetBorrow;
                                    apiResult.data = [insertBook];
                                    res.status(200).json(apiResult);
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            apiResult.meta = rescode.Fail.ErFail;
            apiResult.meta.message = 'Fail inserting Book!';
            res.status(400).json(apiResult);
        }catch(error){
            apiResult.meta = rescode.Fail.ErFail;
            apiResult.meta.message += error.message;

            res.status(400).json(apiResult);
        }
    },
    Return: async (req, res) => {
        let apiResult = {}
        let checkMemberBook;
        let penaltyUntil;
        try {
            let data = {
                ...req?.body
            }

            data.return_date = moment().format("YYYY-MM-DD");

            if(data.member_code != null && data.book_code != null){
                checkMemberBook = await BorrowModels.CheckMemberBook(data.member_code, data.book_code);

                if(checkMemberBook != null){
                    const borrowDate = new Date(checkMemberBook.borrow_date);
                    const returnDate = new Date(data.return_date);
                    const differenceInMilliseconds = returnDate - borrowDate;
                    const rangeDate = differenceInMilliseconds / (1000 * 60 * 60 * 24);
                    console.log("Difference in days:", rangeDate);
                    
                    if(rangeDate > 7){
                        penaltyUntil = moment().add(2, 'days').format("YYYY-MM-DD")
                        updateMemberPenalty = await MemberModels.AddPenalty(data.member_code, penaltyUntil);
                        console.log(updateMemberPenalty);
                    }
    
                    updateMemberBook = await BorrowModels.UpdateMemberBook(data.member_code, data.book_code, data.return_date);
                    console.log(updateMemberBook);

                    if(updateMemberBook.return_date != null){
                        updateStock = await BookModels.AddStock(data.book_code, 1);
                        console.log(updateStock);
                        apiResult.meta = rescode.Success.GetReturn;
                        apiResult.data = [updateStock];
                        res.status(200).json(apiResult);
                        return;
                    }
                }
            }

            apiResult.meta = rescode.Fail.ErFail;
            apiResult.meta.message = 'Fail returning Book!';
            res.status(400).json(apiResult);
        } catch (error) {
            apiResult.meta = rescode.Fail.ErFail;
            apiResult.meta.message += error.message;

            res.status(400).json(apiResult);
        }
    }
});