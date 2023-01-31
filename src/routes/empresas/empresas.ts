import express from 'express';
const router = express.Router();
import { Empresas } from '@libs/empresas/Empresas';
const empresasModel = new Empresas();

empresasModel.add({
    codigo: '',
    nombre: 'Mi Empresa',
    status: 'Activo'
});

//Registrar los endpoint en router
router.get('/', (_req, res)=> {
    const jsonUrls = {
        "getAll": {"method" : "get", "url":"empresas/all"},
        "getById": {"method" : "get", "url":"empresas/byid/:id"},
        "new": {"method" : "post", "url":"empresas/new"},
        "update": {"method" : "put", "url":"empresas/update/:id"},
        "delete": {"method" : "delete", "url":"empresas/delete/:id"},
        
    }
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req, res) => {
    res.status(200).json(empresasModel.getAll());
});


export default router;

//''