'use stricts';

const mongoose = require('mongoose')
const Product = mongoose.model("Product");
const validationContract = require('../validators/fluent-validator')
const repository = require('../repositores/productRepository')

exports.get = (req, res, next)=>{
    repository
    .get()
    .then(data =>{
        res.status(200).send(data)
    }).catch(e =>{
        res.status(400).send(e);
    })
}

exports.getBySlug = (req, res, next)=>{
    repository.getBySlug()
    .then(data =>{
        res.status(200).send(data)
    }).catch(e =>{
        res.status(400).send(e);
    })
}

exports.getById = (req, res, next)=>{
    repository.getById(req.params.id)
    .then(data =>{
        res.status(200).send(data)
    }).catch(e =>{
        res.status(400).send(e);
    })
}

exports.getByTag = (req, res, next)=>{
        repository.getByTag(req.params.tag)
        .then(data =>{
            res.status(200).send(data);
        })
        .catch(e=>{
            res.status(400).send(e);
        })
}


exports.post = (req, res, next)=>{

    let contract = new validationContract()

    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres')

    //Se os dados forem invalidos

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository.Create(req.body)
    .then(x=>{
        res.status(201).send({message: "Produto cadastrado com sucesso", data: x})
    })
    .catch(e =>{
        res.status(400).send({message: "Falha ao cadastrar o produto", data: e})
    })
     
};


exports.put = (req, res, next)=>{
    repository.Update(req.params.id, req.body)
    .then(x =>{
        res.status(200).send("Produto autalizdo com sucesso")
    }).catch(e =>{
        res.send(400).send({message: "Falha ao atualizar o produto", data: e})
    })
}

exports.del = (req, res, next)=>{
   repository.Delete(req.body.id)
    .then(x =>{
        res.status(200).send("Produto removido com sucesso")
    }).catch(e =>{
        res.send(400).send({message: "Falha ao remover o produto", data: e})
    })
}