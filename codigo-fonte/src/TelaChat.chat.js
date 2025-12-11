// chat.js - Tela de Chat AquaPlanner

document.addEventListener("DOMContentLoaded", function () {
  // ===== ELEMENTOS DA TELA =====
  const textarea = document.getElementById("mensagem");
  const btnCriar = document.querySelector(".criar-postagem");
  const listaPostagens = document.getElementById("listaPostagens");
  const labelUsuario = document.querySelector(".formulario label");

  // ===== CHAVES NO LOCALSTORAGE =====
  const LS_BONUS_POSTAGENS = "aquaplannerBonusPostagens";
  const BONUS_POR_POSTAGEM = 5; // cada postagem vale +5% na barra
  const LS_POSTAGENS = "aquaplannerPostagensChat";
  const LS_NOME = "aquaplannerNomeUsuario";

  // ------------------------------------------------
  // 0. NOME DO USUÁRIO (VINDO DO PERFIL)
  // ------------------------------------------------
  function carregarNomeUsuarioNoLabel() {
    const nomeSalvo = localStorage.getItem(LS_NOME);

    if (!labelUsuario) return;

    if (nomeSalvo && nomeSalvo.trim() !== "") {
      // Ex.: "Mensagem de Bárbara Augusta"
      labelUsuario.textContent = `Mensagem de ${nomeSalvo.trim()}`;
    } else {
      labelUsuario.textContent = "Nome do usuário";
    }
  }

  // ------------------------------------------------
  // 1. POSTAGENS: SALVAR / CARREGAR DO LOCALSTORAGE
  // ------------------------------------------------
  function salvarPostagens(posts) {
    localStorage.setItem(LS_POSTAGENS, JSON.stringify(posts));
  }

  function carregarPostagens() {
    const salvo = localStorage.getItem(LS_POSTAGENS);
    if (!salvo) return [];
    try {
      return JSON.parse(salvo);
    } catch (e) {
      console.error("Erro ao ler postagens do localStorage:", e);
      return [];
    }
  }

  // Seed de postagens iniciais (Carla e José) apenas na primeira vez
  function inicializarPostagensPadrao() {
    if (localStorage.getItem(LS_POSTAGENS)) return; // já tem algo salvo

    const postsIniciais = [
      {
        autor: "Carla Alves",
        texto:
          "Reutilizei a água da máquina de lavar para limpar o quintal. Funciona super bem!",
        isUsuario: false,
      },
      {
        autor: "José Antonio",
        texto:
          "Hoje consegui diminuir meu banho de 15 minutos para 10 minutos.",
        isUsuario: false,
      },
    ];

    salvarPostagens(postsIniciais);
  }

  // ------------------------------------------------
  // 2. CRIAÇÃO VISUAL DOS CARDS DE POSTAGEM
  // ------------------------------------------------
  function criarCardPostagem(postObj, index) {
    const { autor, texto, isUsuario } = postObj;

    const post = document.createElement("div");
    post.classList.add("post");
    post.dataset.index = index;

    post.innerHTML = `
      <div class="perfil">
        <img src="imags/user.png" alt="Foto de perfil">
        <h3>${autor}</h3>
      </div>
      <p>${texto}</p>
      <div class="acoes">
        <span>💬</span>
        <span>❤</span>
        ${
          isUsuario
            ? '<button class="btn-remover">Excluir</button>'
            : ""
        }
      </div>
    `;

    // Botão de excluir (somente nas postagens do usuário)
    const btnRemover = post.querySelector(".btn-remover");
    if (btnRemover) {
      btnRemover.addEventListener("click", function () {
        const idx = Number(post.dataset.index);
        let posts = carregarPostagens();
        posts.splice(idx, 1); // remove o post do array
        salvarPostagens(posts);
        renderizarPostagens(); // redesenha a lista
      });
    }

    return post;
  }

  function renderizarPostagens() {
    listaPostagens.innerHTML = "";

    const posts = carregarPostagens();
    posts.forEach((p, index) => {
      const card = criarCardPostagem(p, index);
      listaPostagens.appendChild(card);
    });
  }

  // ------------------------------------------------
  // 3. GAMIFICAÇÃO: BONUS PARA A BARRA DE PROGRESSO
  // ------------------------------------------------
  function somarBonusPostagem() {
    let bonusAtual = Number(localStorage.getItem(LS_BONUS_POSTAGENS) || 0);

    bonusAtual += BONUS_POR_POSTAGEM;

    // Limita ao máximo de 100%
    if (bonusAtual > 100) {
      bonusAtual = 100;
    }

    localStorage.setItem(LS_BONUS_POSTAGENS, bonusAtual);
  }

  // ------------------------------------------------
  // 4. EVENTO DO BOTÃO "CRIAR POSTAGEM"
  // ------------------------------------------------
  btnCriar.addEventListener("click", function () {
    const texto = textarea.value.trim();
    if (!texto) {
      alert("Digite uma mensagem antes de criar a postagem.");
      return;
    }

    const nomeSalvo = localStorage.getItem(LS_NOME);
    const autor =
      nomeSalvo && nomeSalvo.trim() !== "" ? nomeSalvo.trim() : "Você";

    let posts = carregarPostagens();

    // Adiciona a nova postagem no início (topo do feed)
    posts.unshift({
      autor,
      texto,
      isUsuario: true,
    });

    salvarPostagens(posts);
    textarea.value = "";

    // Atualiza gamificação
    somarBonusPostagem();

    // Redesenha a lista já com a nova postagem
    renderizarPostagens();
  });

  // ------------------------------------------------
  // 5. INICIALIZAÇÃO DA TELA
  // ------------------------------------------------
  inicializarPostagensPadrao();
  carregarNomeUsuarioNoLabel();
  renderizarPostagens();
});
