const { items } = require('../models')
const Validator = require('fastest-validator')
const v = new Validator()


//add Items
const addItems =  async (req,res) => {
    try {
        const { name_item, price } = req.body
        //validation
        const schema = {
            name_item: 'string',
            price: 'string',
        }
        const validate = v.validate(req.body, schema)
        if (validate.length) {
        return res.status(400).json(validate)
        }
        //proses update
        const Item = new items({
            name_item: name_item,
            price: price
        })
        const addItem = await Item.save(req.body);
        return res.json({
            status: 200,
            message: 'succses create item',
            data: addItem
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'cath eror di addItems'
        })
    }
};

//GET ALL items
const getItems = async (req,res) => {
    const item = await items.findAll()
    return res.json({
        status: 200,
        data: item
    })
}

//GET items byID
const getItemsById = async (req,res) => {
    try {
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

    } catch (error) {
        console.log(error)
    }
}

//UPDATE items
const updateItems = async (req,res) => {
    try {
        const { name_item, price } = req.body
        const id = req.params.id

        const updateItem = await items.update({
            name_item,price
        },{
            where: {id:id}
        })
        return res.json({
            msg: 'succses update items',
            data: updateItem
        })

    } catch (error) {
        console.log(error)
    }
}

//DELETE items
const deleteItems = async (req,res) => {
    try {
        const id = req.params.id

        const deleteItem = await items.destroy({
            where: {id:id}
        })
        return res.json({
            msg: 'succses delete items',
            data: deleteItem
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addItems,
    getItems,
    getItemsById,
    updateItems,
    deleteItems
}