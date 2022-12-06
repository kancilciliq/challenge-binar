var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator')
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
      type: 'email'
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


module.exports = router;
