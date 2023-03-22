const { users } = require('../models')
const { validation } = require('../middleware/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

          const validate = validation(req.body)
          if(validate.length){
            return res.json({
              status:400,
              message:'register gagal'
            })
          };
        //config bcrypt
        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
          const addUser = new users({
              username: username,
              email: email,
              password: hashPassword
          });
          const createUser = await addUser.save(req.body);
          res.json({
              status: 200,
              message: 'user created'
          });
    } catch (error) {
        res.send('server eror').status(500)
    };
};

const login = async (req,res) => {
  try {
    const { email, password } = req.body

    const checkEmail = await users.findOne({
      where: {
        email: email
      }
    });

    if(!checkEmail){
      return res.send('email not found').status(404)
    };

    const resultLogin = bcrypt.compareSync(password, checkEmail.password)

    if(!resultLogin){
      return res.send('login failed').status(400)
    };

    //jwt
    const token = jwt.sign({
      _email: checkEmail.email
    },process.env.token)

    res.header('auth-token', token).send('login succses').status(200)
  } catch (error) {
    console.log(error)
    res.send('server eror').status(500)
  };
};

// //update user
// router.put('/:id', async(req,res)=>{
//   const {username, email, password} = req.body
//   let findUser = await users.findByPk(req.params.id)
//   if(!findUser){
//     return res.json({
//       status: 404, 
//       message: 'user not found'
//     })
//   };
//   const schema = {
//     username: {
//       type: 'string',
//       empty: false
//     },
//     email: {
//       type: 'string'
//     },
//     password: {
//       type: 'string',
//       min: 5,
//       field: 'password',
//       strict: true
//     }
//   };

//   const validate = v.validate(req.body, schema)
//   if(validate.length){
//     return res.json({
//       status:400,
//       message:'update user gagal'
//     })
//   };

//   const updatedUser = await users.update({username, email, password}, {
//     where: {id: req.params.id}
//   });
//   res.json({
//       status: 200,
//       message: 'user updated'
//   });

// })

// //delete user
// router.delete('/:id', async(req,res) =>{
//   const id = req.params.id
//   let userDeleted = await users.findByPk(id)

//   if (!userDeleted) {
//       return res.json({
//           status: 404,
//           message: 'data not found'
//       })   
//   }
//   await userDeleted.destroy()
//   res.json({
//       status: 200,
//       message: 'succsess delete user',
//   });
// });

module.exports = {
    register,
    login
}
