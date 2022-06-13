const atividades = require('../models/atividades')

module.exports = (app)=>{
    app.post('/atividades',async(req,res)=>{
        var dados = req.body
       // return console.log(dados)
       //conectar com o mongo
       const database = require('../config/database')()
       //importar model atividades
       const atividades = require('../models/atividades')
       //gravar as informações do formulário no database
       var gravar = await new atividades({
           data:dados.data,
           tipo:dados.tipo,
           entrega:dados.entrega,
           disciplina:dados.disciplina,
           instrucoes:dados.orientacoes,
           usuario:dados.id,
           titulo:dados.titulo,  
           status:dados.status
       }).save()
       
       //recarregar a página atividades
       res.redirect('/atividades?id='+dados.id)
    })
    app.get('/atividades', async(req,res)=>{
        // listar todos os usu logados
        var user = req.query.id
        if (!user) {
            res.redirect('/login')
        }
        var usuarios = require('../models/usuarios')
        var atividades = require('../models/atividades')

        var dadosuser = await usuarios.findOne ({_id:user})
        var dadosAberto = await atividades.find({usuario:user,status:"0"}).sort({data:1})

        var dadosEntregue = await atividades.find({usuario:user,status:"1"}).sort({data:1})

        var dadosExcluido = await atividades.find({usuario:user,status:"2"}).sort({data:1})

        //res.render('atividades.ejs', {nome:dadosuser.nome,id:dadosuser._id,lista:dadosAtividades})
        res.render('atividades.ejs', {nome:dadosuser.nome,id:dadosuser._id,dadosAberto,dadosEntregue, dadosExcluido})
    })


    app.get('/excluir', async(req,res)=>{
        //qual o doc sera exclu da collection ativis??????????????
        var doc = req.query.id
        //exclu o doc
        var excluir = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"2"}
            )
        //voltar para lista de 
        res.redirect('/atividades?id='+excluir.usuario)
    })
   

    //rota entregue
    app.get('/entregue', async(req,res)=>{
        //qual o doc sera exclu da collection ativis??????????????
        var doc = req.query.id
        //exclu o doc
        var entregue = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"1"}
            )
        //voltar para lista de 
        res.redirect('/atividades?id='+entregue.usuario)
    })
    
    }

