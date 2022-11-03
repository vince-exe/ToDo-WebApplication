const configs = require('../configs/configs.json')

class Utils {
    static checkEmail = (email, domains) => {
        let check = false
        domains.forEach(domain => {
            if (email.includes(domain)) {
                check = true
            }
        })

        return check
    }

    static getServerConfigs = async (req, resp) => {
        resp.status(200).json({
            emailLen: configs.maxEmailLen,
            passwordLen: configs.maxPasswordLen
        })
    }
}

module.exports = { Utils }