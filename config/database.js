const mongoose = require('mongoose')

const conn = async()=>{
    //mongoAtlas
    const atlas = await mongoose.connect('mongodb+srv://userNovo:cookie13@fiaptecnico.b869f.mongodb.net/todo_list')
}

module.exports = conn