// ERRADO: o listener morre no próximo innerHTML
document.querySelectorAll('.favoritar').forEach(botao => {
botao.addEventListener('click', favoritar);
});
// CERTO: o listener fica no pai, que nunca é destruído
mural.addEventListener('click', (e) => {
const botao = e.target.closest('.favoritar');
if (!botao) return;          
// clicou em outra coisa, ignora
favoritar(botao.dataset.id); // o id vem do data-id do HTML
});
const estado = {
    logado: false,
    usuario: null,   // { id_usuario, nome, nome_usuario, imagem_usuario, tipo }
    chefFiltrado: '' // '' = mural completo
    };
    const mural = document.querySelector('#mural');
    import autenticacao from './rotas/autenticacao.js';
import receitas from './rotas/receitas.js';
import favoritos from './rotas/favoritos.js';
app.use('/api', autenticacao);
app.use('/api', receitas);
app.use('/api', favoritos);
async function carregarSessao() {
    const dados = await (await fetch('/api/sessao')).json();
}

estado.logado  = dados.logado;
estado.usuario = dados.usuario;
document.querySelector('#foto-perfil').src =
`img/${dados.usuario.imagem_usuario}`;
document.querySelector('#nome-usuario').textContent =
`@${dados.usuario.nome_usuario}`;
// Ver Perfil só é habilitado para chef logado (detalhado no R13)
document.querySelector('#btn-ver-perfil').disabled =
!(dados.logado && dados.usuario.tipo === 'chef');
document.querySelector('#btn-login').classList.toggle('oculto', dados.logado);
document.querySelector('#btn-logout').classList.toggle('oculto', !dados.logado);

const modal = document.querySelector('#modal-login');
function abrirModal() {
modal.classList.remove('oculto');
document.querySelector('#email').focus();
}
function fecharModal() {
modal.classList.add('oculto');
document.querySelector('#form-login').reset();
limparErros();
}
document.querySelector('#btn-login').addEventListener('click', abrirModal);
document.querySelector('#btn-cancelar').addEventListener('click', fecharModal);
document.querySelector('#fechar-modal').addEventListener('click', fecharModal);

async function carregarMural() {
    const url = estado.chefFiltrado
    ? `/api/receitas?chef=${encodeURIComponent(estado.chefFiltrado)}`
    : '/api/receitas';
    const receitas = await (await fetch(url)).json();
mural.innerHTML = receitas.map((r, indice) => `
<article class="card">
<div class="card-imagem">
<img src="img/${r.imagem}" alt="${r.titulo}">
<div class="tooltip">
Receita publicada por: @${r.chef}<br>
Origem: ${r.origem}
</div>
</div>
<h3>Receita ${indice + 1}</h3>
<button class="favoritar ${r.favoritado ? 'ativo' : ''}"
data-id="${r.id_receita}">
<img src="svg/estrela.svg" alt="Favoritar">
<span>${r.favoritos}</span>
</button>
</article>`).join('');
}


