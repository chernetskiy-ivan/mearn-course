const {Router} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User') //подключаем модель User
const router = Router() //создаем роут

//добавляем post запросы
// /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body

        const candidate = await User.findOne({email: email})

        //проверка есть ли уже такой пользователь
        if(candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        //регистрируем нового полльзователя
        //хэширую пароль
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        //схраняем пользователя
        await user.save()

        //отвечаем фронтенду
        res.status(201).json({message: 'Пользователь создан'})

    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})


// /api/auth/login
router.post('/login', async (req, res) => {

})

//роут это middleware в express
//экспортируем объект роута из модуля
module.exports = router