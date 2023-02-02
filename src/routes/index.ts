import express from 'express';
const router  = express.Router();

import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
});

router.get('/version', (_req, res) => {
  //tipoVariable nombreVariable : tipoDato = valor
  const version: string = "1.0.0";
  const jsonResp = {"name":"FODA Be", "version": version}
  res.json(jsonResp);
});
router.use('/empresas', empresasRouter);
router.use('/usuarios', usuariosRouter);


export default router;
