const rescode = require("../config/env.response");
const BookModels = require("../models/BookModels");
const BookControllers = (module.exports = {
    Index: async (req, res) => {
        let apiResult = {};
        try{
            let data = await BookModels.GetAll();
            apiResult.meta = rescode.Success.GetBook;
            apiResult.data = data

            res.status(200).json(apiResult);
        }catch(error){
            apiResult.meta = rescode.Fail.ErFail;
            apiResult.meta.message += error.message;

            res.status(400).json(apiResult);
        }
    }
});