const rescode = require("../config/env.response");
const MemberModels = require("../models/MemberModels");
const MemberControllers = (module.exports = {
    Index: async (req, res) => {
        let apiResult = {};
        try{
            let data = await MemberModels.GetAll();
            apiResult.meta = rescode.Success.GetMember;
            apiResult.data = data

            res.status(200).json(apiResult);
        }catch(error){
            apiResult.meta = rescode.Fail.ErFail;
            apiResult.meta.message += error.message;

            res.status(400).json(apiResult);
        }
    }
});