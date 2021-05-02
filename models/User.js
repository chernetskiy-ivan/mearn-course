//создаем модель user
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Link: [{ type: Types.ObjectId, ref: 'Link'}]
})

//экспортируем модель User работающая по схеме schema
module.exports = model('User', schema)