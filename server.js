import express from 'express';
import session from 'express-session';
const app = express();

// Lê JSON enviado pelo fetch do navegador
app.use(express.json());
// Guarda quem está logado
app.use(session({
secret: 'saepchef',
resave: false,
saveUninitialized: false
}));
// Serve index.html, css, js, imagens e svgs
app.use(express.static('public'));
app.listen(3000, () => {
console.log('SAEPChef rodando em http://localhost:3000');
});