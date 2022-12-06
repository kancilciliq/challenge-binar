var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const Validator = require('fastest-validator');
const { where } = require('sequelize');
const v = new Validator()
const { users } = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//register
router.post('/register',async(req,res)=>{
  const schema = {
    username: {
      type: 'string',
      empty: false
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string',
      min: 5,
      field: 'password',
      strict: true
    }
  }
  const validate = v.validate(req.body, schema)
  if(validate !== true){
    return res.json({
      status:400,
      message:'register gagal'
    })
  };

  const createUser = await users.create(req.body);
  res.json({
      status: 200,
      message: 'user created',
      data: createUser
  });
})

//login
router.post('/login', async(req,res)=>{
  const {username, password} = req.body
  const userFound = await users.findOne({ where: {username}})
    if(!userFound) {
        return res.sendStatus(401)
    }

    if(userFound.password == password) {
        return res.send("Login berhasil")
    }else {
        return res.send("Login Gagal")
    }
})

//update user
router.put('/:id', async(req,res)=>{
  const {username, email, password} = req.body
  let findUser = await users.findByPk(req.params.id)
  if(!findUser){
    return res.json({
      status: 404, 
      message: 'user not found'
    })
  };
  const schema = {
    username: {
      type: 'string',
      empty: false
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string',
      min: 5,
      field: 'password',
      strict: true
    }
  };

  const validate = v.validate(req.body, schema)
  if(validate.length){
    return res.json({
      status:400,
      message:'update user gagal'
    })
  };

  const updatedUser = await users.update({username, email, password}, {
    where: {id: req.params.id}
  });
  res.json({
      status: 200,
      message: 'user updated'
  });

})

//delete user
router.delete('/:id', async(req,res) =>{
  const id = req.params.id
  let userDeleted = await users.findByPk(id)

  if (!userDeleted) {
      return res.json({
          status: 404,
          message: 'data not found'
      })   
  }
  await userDeleted.destroy()
  res.json({
      status: 200,
      message: 'succsess delete user',
  });
});

module.exports = router;
