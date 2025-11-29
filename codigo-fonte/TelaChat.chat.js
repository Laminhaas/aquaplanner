// chat.js - Tela de Chat AquaPlanner

document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("mensagem");
  const btnCriar = document.querySelector(".criar-postagem");
  const listaPostagens = document.getElementById("listaPostagens");

  const LS_BONUS_POSTAGENS = "aquaplannerBonusPostagens";
  const BONUS_POR_POSTAGEM = 5; // cada postagem vale +5% na barra

  // Função para criar um card de postagem
  function criarCardPostagem(texto) {
    const post = document.createElement("div");
    post.classList.add("post");

    post.innerHTML = `
      <div class="perfil">
        <img src="imgs/user.png" alt="Foto de perfil">
        <h3>Você</h3>
      </div>
      <p>${texto}</p>
      <div class="acoes">
        <span>💬</span>
        <span>❤</span>
        <button class="btn-remover">Excluir</button>
      </div>
    `;

    // Botão de excluir
    const btnRemover = post.querySelector(".btn-remover");
    btnRemover.addEventListener("click", function () {
      post.remove();
      // Se quiser no futuro, dá pra diminuir o bônus aqui.
    });

    return post;
  }

  // Atualiza o bônus da barra de progresso (perfil)
  function somarBonusPostagem() {
    let bonusAtual = Number(localStorage.getItem(LS_BONUS_POSTAGENS) || 0);

    // Cada nova postagem vale +5% na barra
    bonusAtual += BONUS_POR_POSTAGEM;

    // Limita apenas ao máximo de 100%
    if (bonusAtual > 100) {
      bonusAtual = 100;
    }

    localStorage.setItem(LS_BONUS_POSTAGENS, bonusAtual);
  }

  // Clique no botão "Criar postagem"
  btnCriar.addEventListener("click", function () {
    const texto = textarea.value.trim();
    if (!texto) {
      alert("Digite uma mensagem antes de criar a postagem.");
      return;
    }

    const novoPost = criarCardPostagem(texto);
    listaPostagens.prepend(novoPost); // adiciona no topo

    textarea.value = "";

    // Soma bônus na barra de progresso do perfil
    somarBonusPostagem();
  });
});
