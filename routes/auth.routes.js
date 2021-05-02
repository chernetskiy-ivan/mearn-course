const {Router} = require('express')
const bcrypt = require('bcryptjs') //либа для хеширования, сравнения и т.д. с паролями
const {check, validationResult} = require('express-validator')
const User = require('../models/User') //подключаем модель User
const router = Router() //создаем роут

//добавляем post запросы
// /api/auth/register
router.post(
    '/register',
    //добавляем массив валидаторов
    [
        //проверяю email
        check('email', 'Некорректный email').isEmail(),
        //проверяю длинну пароля
        check('password', 'Минимальная длинна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        //если есть какие-то ошибки
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

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
router.post(
    '/login',
    //добавляем массив валидаторов
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('paaword', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            //если есть какие-то ошибки
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body

            const user = new User.findOne({ email })

            if(!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            //сравниваю пароль с паролем в базе
            const isMatch = await bvrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }



        } catch(e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })

//роут это middleware в express
//экспортируем объект роута из модуля
module.exports = router