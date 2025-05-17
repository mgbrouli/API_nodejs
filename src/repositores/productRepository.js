'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = ()=>{
    return Product
    .find({
        active: true
    }, 'title price slug');
}


exports.getBySlug = ()=>{
    return Product.findOne({
        slug: slug,
        active:true
    }, 'tile description price slug tags')
}

exports.getById = (id)=>{
    return Product
    .findById(id)
}


exports.getByTag = (tag)=>{
    return Product
        .find({
            tags: tag,
            active: true,
        }, 'title description price slug tags')
}


exports.Create = (data)=>{
    var product = new Product(data)
    return product.save()
}


exports.Update = (id ,data)=>{
    return Product
    .findByIdAndUpdate(id,{
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    })
}


exports.Delete = (id)=>{
    return  Product
    .findOneAndDelete(id)
}