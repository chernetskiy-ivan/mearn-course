//middleware - обычная функция которая позволяет перехватывать определенные данные логику которых сейчас и опишем

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res,next) => {
    //проверям доступен ли сервер
    if(req.method === 'OPTIONS') {
        //продолжаем делать запрос
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]  // "Bearer Token"

        if(!token) {
            return res.status(401).json({message: 'Нет авторизации'})
        }

        //если есть токен, то раскодируем его
        //вторым параметром передаем секретный ключ которым и формировали токен
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
        
    } catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}