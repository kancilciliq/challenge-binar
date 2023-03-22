const Validator = require ('fastest-validator')
const v = new Validator()

const validation = data => {
    const schema = {
        username : {
            type: 'string',
            empty: false
        },
        email: {
            type: 'string',
            empty: false
        },
        password: {
            type: 'string',
            min: 3,
            field: 'password',
            strict: true
        }
    };

    return v.validate(data, schema)
}

module.exports.validation = validation