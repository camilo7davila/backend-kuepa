exports.success = (req,res, message, status,details) => {
    res.status(status || 200).send({
        statusCode: status,
        error: '',
        message: message
    });
}

exports.error = (req,res,message,status, details) => {
    console.log('[response error]' + details);
    res.status(status || 500).send({
        statusCode: status,
        error: message,
        message: ''
    })
}