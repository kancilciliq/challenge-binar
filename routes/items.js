const express = require('express');
const router = express.Router();
const Validator = require('fastest-validator');
const v = new Validator();
const {items} = require('../models');

//GET All DATA
router.get('/', async(req,res) =>{
    const item = await items.findAll()
    return res.json({
        status: 200,
        message: 'succsess get all item',
        data: item
    });
});

//GET BY DATA ID_ITEMS
router.get('/:id', async(req,res) =>{
    const id = req.params.id
    const item = await items.findByPk(id)

    if (!item) {
        return res.json({
            status: 404,
            message: 'item not found'
        })
        
    }else{
        return res.json({
            status: 200,
            message: 'succsess get item by id',
            data: item
        });
    }
});

//POST
router.post('/', async (req,res) => {
    //validation
    const schema = {
        name_item: 'string',
        price: 'number',
        // id_user: req.headers['X-ID-User'] || req.headers['x-id-user']
    }
    const validate = v.validate(req.body, schema)
    if (validate.length) {
       return res.status(400).json(validate)
    }
    //proses update
    const item = await items.create(req.body);
    res.json({
        status: 200,
        message: 'succses create item',
        data: item
    });
});

//PUT
router.put('/:id', async (req,res)=>{
    const id = req.params.id
    let item = await items.findByPk(id)
    if (!item) {
        return res.status(404).json({message: "item not found"})
    }
    //validation
    const schema = {
        name_item: 'string',
        price: 'number'
    }
    const validate = v.validate(req.body, schema)
    if (validate.length) {
        return res.status(400).json(validate)
    }
    //proses update
    item = await item.update(req.body);
    res.json({
        status: 200,
        message: 'succses update item',
        data: item,
    });
});

//DELETE
router.delete('/:id', async(req,res) =>{
    const id = req.params.id
    let item = await items.findByPk(id)

    if (!item) {
        return res.json({
            status: 404,
            message: 'data not item'
        })   
    }
    await item.destroy()
    res.json({
        status: 200,
        message: 'succsess delete item',
    });
});


module.exports = router;