import express from 'express';
const router = express.Router();

import { Usuarios, IUsuarios } from '@libs/usuarios/Usuarios';

const usuariosModel = new Usuarios();

//Superusuario
usuariosModel.add({
    codigo: '',
    correo: 'correoAdmin@unicah.edu',
    nombre: 'usuarioAdmin',
    password: 'usuarioAdmin',
    roles: ["UsuarioAdmin"]
});

router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url": "usuarios/all"},
        "getById": {"method":"get", "url": "usuarios/byid/:id"},
        "new": {"method":"post", "url": "usuarios/new"},
        "update": {"method":"put", "url": "usuarios/upd/:id"},
        "delete": {"method":"delete", "url": "usuarios/del/:id"},
    };
    res.status(200).json(jsonUrls);
    });


router.get('/all', (_req, res) => {
    res.status(200).json(usuariosModel.getAll());
});

router.get('/byid/:id', (req, res)=>{
    const {id: codigo} = req.params;
    const usuario = usuariosModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"No se encontró Usuario"});
});


router.post('/new', (req, res) => {
    console.log("Usuarios /new request body:", req.body);
    const {
        correo = '---- NOT SPECIFIED',
        nombre = '---- NOT SPECIFIED',
        password ='---- NOT SPECIFIED',
        roles = ["RolNoAsignado"]
    } = req.body;

    if ((correo === "---- NOT SPECIFIED") || (nombre === "---- NOT SPECIFIED") || (password === "---- NOT SPECIFIED") ){
        return res.status(403).json({"error": "Faltan datos para guardar Usuario"});
    }

    const newUsuario: IUsuarios = {
        codigo : "",
        correo,
        nombre,
        password,
        roles
        
    };
    if (usuariosModel.add(newUsuario)) {
        return res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error": "Error al agregar un nuevo usuario"}
    );
});

router.put('/upd/:id', (req, res) => {
    const { id } = req.params;

    const {
        correo = "---- NOT SPECIFIED",
        nombre = "---- NOT SPECIFIED",
        password = "---- NOT SPECIFIED",
        roles = ["---- NOT SPECIFIED"],
        observacion = "Registro Modificado en algun momento"
    } = req.body;

if ((correo === "---- NOT SPECIFIED") || (nombre === "---- NOT SPECIFIED") || (password === "---- NOT SPECIFIED") || (roles[0] === "---- NOT SPECIFIED")) {
    return res.status(403).json({"error": "Error al actualizar Usuario"});
}

    const UpdateUsuario : IUsuarios = {
        codigo: id,
        correo,
        nombre,
        password,
        roles,
        observacion,
    };
        
    if (usuariosModel.update(UpdateUsuario)) {
        return res
        .status(200)
        .json({"updated": true});
    }
    return res
        .status(404)
        .json(
        {
        "error": "Error al actualizar Usuario"
    }
        );
    });

    router.delete('/del/:id', (req, res)=>{  const {id : codigo} = req.params;
if(usuariosModel.delete(codigo)){
    return res.status(200).json({"deleted": true});
}
return res.status(404).json({"error":"No se pudo eliminar el usuario"});
});

    export default router;