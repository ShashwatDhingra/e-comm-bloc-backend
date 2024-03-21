class Utils{
    getErrorResponse(e, statusCode){

        if(statusCode == undefined){
            statusCode = 400;
        }

        return {status: false, message: "ERROR", error: e.message, statusCode};
    }
}

module.exports = new Utils();