const configs = require('../configs/configs.json')

exports.getServerConfigs = async (req, resp) => {
    resp.status(200).json({
        emailLen: configs.maxEmailLen,
        passwordLen: configs.maxPasswordLen
    })
}