const router = require('express').Router();
const router = express.Router();
const Cliente = require('../../models/cliente');
const { check, validationResult } = require('express-validator')
//Get http://localhost:3000/api/clientes
router.get('/',async(req,res)=>{

    const rows = await Cliente.getAll();
    res.json(rows);
});
//POST http://localhost:3000/api/clientes
router.post('/',[
    check('nombre').isLength({ min: 3 }),
    check('apellidos').isLength({ min: 3 }),
    check('direccion').isLength({ min: 3 }),
    check('email').isEmail(),
    check('edad').isNumeric(),
    check('sexo').isLength({ min: 1 }),
    check('cuota').isDecimal(),
    check('fecha_nacimiento'),
    check('dni').custom((value) => {
        return (/^[a-zA-Z0-9]{5,10}$/).test(value);
    })
],async (req,res)=>{
    const result = await Cliente.create (req.body);
    if(result['affectedRows'] === 1){
        const cliente = await Cliente.getById(result['insertId']);
        res.json(cliente)
    }else {
        res.json({error:"este cliente no exixte"});
    }
});

//PUT http://localhost:3000/api/clientes/:pclienteId
router.put('/:pClienteId', async (req, res) => {
    const result = await Cliente.updateById(req.body, req.params.pClienteId);
    res.json(result)
});

//DELETE http://localhost:3000/api/clientes
router.delete('/',async(req,res)=>{
    const result = await Cliente.deletebyId (req.body.ClienteId);
    if(result['affectedRows'] === 1){
        res.json({success:'Se ha borrado el cliente'});
    }else{
        res.json({error: 'no se ha borrado el cliente'})
    }
});


module.exports = router;