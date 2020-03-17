const getAll = () =>{
    return new Promise((resolve,reject)=>{
        db.query('select * from clientes',
        (err,rows)=>{
            console.log(err);
            if(err) reject(err)
            resolve(rows);
        });
    });
};

const getById = (pClientes)=>{
    return new Promise ((resolve,reject)=>{
        db.query('select * from alumnos where id = ?',[pClientes],(err,rows)=>{
            if(err) reject(err);
            if(rows.length === 0){
                resolve(null);
            }
            resolve(rows[0]);
        })
    });
};
const create = ({nombre,apellidos,direccion,email,edad,sexo,fecha_inscripcion,cuota,fecha_nacimiento,dni})=>{
    return new Promise((resolve,reject)=>{
     db.query('insert into clientes(nombre,apellidos,email,direccion,edad,sexo,fecha_inscripcion,cuota,fecha_nacimiento,dni)values(?, ?, ?, ?, ?, ?, ?, ?,?,?)',[nombre,apellidos,direccion,email,edad,sexo,fecha_inscripcion,cuota,fecha_nacimiento,dni], (err,result)=>{
        if(err) reject(err);
        resolve(result);
        })
    })
};

const deleteById = (pClientes)=>{
    return new Promise ((resolve,reject)=>{
        dbquery('delete from alumnos where id =?',[pClientes],(err,result)=>{
            if(err) reject(err);
            resolve(result);
        })
    });
};

const create = ({nombre, apellidos, direccion, email,cuota,fecha_nacimiento, dni}) => {
    return new Promise((resolve,reject)=>{
        db.query('insert into clientes(nombre,apellidos,direccion,email,edad,sexo,cuota,fecha_nacimiento,dni) values (?, ?, ?, ?, ?, ?, ?, ?,?)',[nombre,apellidos,direccion,email,cuota,fecha_nacimiento,dni],(err,result)=>{
            if(err) reject(err);
            resolve(result);
        })
    });
}

module.export={
    getAll:getAll,
    getById:getById,
    create:create,
    deleteById:deleteById,
    create: create,
}
