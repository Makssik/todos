const jwt = require('jsonwebtoken');
const {notAuthorizedErr} = require('../helpers/errors');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw new notAuthorizedErr('Пользователь не авторизирован')
        }
        
        const decodedData = jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                throw new notAuthorizedErr('Пользователь не найден, нет доступа к информации', 403)
            }
        })
        req.user = decodedData;
        next()
    } catch (err) {
        next(err)
    }
}
 
module.exports = {authMiddleware} 