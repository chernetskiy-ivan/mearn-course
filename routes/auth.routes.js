const {Router} = require('express')
//создаем роут
const router = Router()

//добавляем post запросы
// /api/auth/register
router.post('/register', async (req, res) => {

})


// /api/auth/login
router.post('/login', async (req, res) => {

})

//роут это middleware в express
//экспортируем объект роута из модуля
module.exports = router