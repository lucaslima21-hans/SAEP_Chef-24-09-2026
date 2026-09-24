import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

// Quem está na tela agora? O logado, ou o @SAEPChef institucional.
router.get('/sessao', async (req, res) => {
if (req.session.usuario) {
return res.json({ logado: true, usuario: req.session.usuario });
}
const { rows } = await pool.query(
`SELECT nome_usuario, imagem_usuario, tipo
FROM usuario WHERE nome_usuario = $1`, ['SAEPChef']
);
res.json({ logado: false, usuario: rows[0] });
});
export default router;

