const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose') //подключаем пакет mongoose для подключения к базе данных MongoDB

const app = express() //наш будущий сервер

//добавляю новый middleware
app.use(express.json({extended: true}))

//регистрируем роуты
//вторым параметром передаем роут
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t',require('./routes/redirects.routes'))

if(process.env.NODE_ENV === "production") {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    //обработка всех get запросов
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = config.get('port') || 5000

async function start() {
    try {
        //если все хорошо - подключаюсь к монго
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }) //метод connect возвращает promise - поэтому используем await и пишем все в async функции
        //вторым параметром мы передаем набор опций

        //после того как база данных подсоединиться - запускаем сервер
        app.listen(PORT, () => console.log(`App has been started on port:${PORT}...`))

    } catch(e) {
        console.log('Server Error ', e.message)
        process.exit(1)
        //завершаем процесс в Node.js в случае если что-то пойдет не так благодаря глобальному объекту
        //process и его методу exit()
    }
}

start()