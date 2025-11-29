// script.js - Tela de Perfil AquaPlanner

document.addEventListener("DOMContentLoaded", function () {
  // ===== ELEMENTOS DO PERFIL =====
  const nomeUsuarioEl = document.getElementById("nomeUsuario");
  const emailUsuarioEl = document.getElementById("emailUsuario");
  const fotoUsuarioEl = document.querySelector(".foto-usuario");
  const perfilInfoEl = document.querySelector(".perfil-info");
  const btnEditar = document.getElementById("btnEditar");

  // ===== SIDEBAR =====
  const itensSidebar = document.querySelectorAll(".sidebar ul li");

  // ===== CONQUISTAS / BARRA / TEXTOS =====
  const conquistas = document.querySelectorAll(".conquista");
  const barraProgresso = document.querySelector(".barra-progresso .progresso");
  const tituloEconomia = document.querySelector(".conquistas h2");

  const tituloNivelEl = document.querySelector(".perfil-texto h3");
  const textoNivelEl = document.querySelector(".perfil-texto p");

  const msgEstimuloEl = document.querySelector(".mensagem-estimulo");
  const desafioEspecialEl = document.querySelector(".desafio-especial");

  // ===== LOCALSTORAGE KEYS =====
  const LS_NOME = "aquaplannerNomeUsuario";
  const LS_EMAIL = "aquaplannerEmailUsuario";
  const LS_FOTO = "aquaplannerFotoUsuario";
  const LS_BONUS_POSTAGENS = "aquaplannerBonusPostagens";

  // ------------------------------------------------
  // 0. PERFIL: CARREGAR E SALVAR
  // ------------------------------------------------
  function carregarPerfil() {
    const nomeSalvo = localStorage.getItem(LS_NOME);
    const emailSalvo = localStorage.getItem(LS_EMAIL);
    const fotoSalva = localStorage.getItem(LS_FOTO);

    if (nomeSalvo && nomeSalvo.trim() !== "") {
      nomeUsuarioEl.textContent = nomeSalvo;
    }

    if (emailSalvo && emailSalvo.trim() !== "") {
      emailUsuarioEl.textContent = emailSalvo;
    }

    if (fotoSalva && fotoSalva.startsWith("data:image")) {
      fotoUsuarioEl.src = fotoSalva;
    }
  }

  function salvarNomeEmail(nome, email) {
    if (nome) localStorage.setItem(LS_NOME, nome);
    if (email) localStorage.setItem(LS_EMAIL, email);
  }

  function salvarFoto(srcBase64) {
    localStorage.setItem(LS_FOTO, srcBase64);
  }

  // ------------------------------------------------
  // 1. MENU DE EDIÇÃO (Editar Perfil)
  // ------------------------------------------------
  let menuEdicao;
  let inputFoto;

  function criarMenuEdicao() {
    menuEdicao = document.createElement("div");
    menuEdicao.classList.add("menu-edicao");
    menuEdicao.style.display = "none";

    const btnTrocarFoto = document.createElement("button");
    btnTrocarFoto.textContent = "Trocar foto de perfil";
    btnTrocarFoto.classList.add("opcao-edicao");

    const btnTrocarNome = document.createElement("button");
    btnTrocarNome.textContent = "Trocar nome de usuário";
    btnTrocarNome.classList.add("opcao-edicao");

    const btnTrocarEmail = document.createElement("button");
    btnTrocarEmail.textContent = "Trocar e-mail";
    btnTrocarEmail.classList.add("opcao-edicao");

    inputFoto = document.createElement("input");
    inputFoto.type = "file";
    inputFoto.accept = "image/*";
    inputFoto.style.display = "none";

    menuEdicao.appendChild(btnTrocarFoto);
    menuEdicao.appendChild(btnTrocarNome);
    menuEdicao.appendChild(btnTrocarEmail);
    menuEdicao.appendChild(inputFoto);

    perfilInfoEl.appendChild(menuEdicao);

    // Trocar foto
    btnTrocarFoto.addEventListener("click", function () {
      inputFoto.click();
    });

    inputFoto.addEventListener("change", function () {
      const arquivo = inputFoto.files[0];
      if (!arquivo) return;

      const leitor = new FileReader();
      leitor.onload = function (e) {
        const base64 = e.target.result;
        fotoUsuarioEl.src = base64;
        salvarFoto(base64);
      };
      leitor.readAsDataURL(arquivo);
    });

    // Trocar nome
    btnTrocarNome.addEventListener("click", function () {
      const nomeAtual = nomeUsuarioEl.textContent.trim();
      const novoNome = prompt("Digite o novo nome de usuário:", nomeAtual);

      if (novoNome && novoNome.trim() !== "") {
        nomeUsuarioEl.textContent = novoNome.trim();
        salvarNomeEmail(novoNome.trim(), null);
      }
    });

    // Trocar email
    btnTrocarEmail.addEventListener("click", function () {
      const emailAtual = emailUsuarioEl.textContent.trim();
      const novoEmail = prompt("Digite o novo e-mail:", emailAtual);

      if (novoEmail && novoEmail.trim() !== "") {
        emailUsuarioEl.textContent = novoEmail.trim();
        salvarNomeEmail(null, novoEmail.trim());
      }
    });
  }

  criarMenuEdicao();

  btnEditar.addEventListener("click", function () {
    if (!menuEdicao) return;
    const visivel =
      menuEdicao.style.display === "block" || menuEdicao.style.display === "";
    menuEdicao.style.display = visivel ? "none" : "block";
  });

  // ------------------------------------------------
  // 2. SIDEBAR: destacar item ativo
  // ------------------------------------------------
  itensSidebar.forEach(function (item) {
    item.addEventListener("click", function () {
      itensSidebar.forEach(function (i) {
        i.classList.remove("ativo");
      });
      item.classList.add("ativo");
    });
  });

  // ------------------------------------------------
  // 3. GAMIFICAÇÃO: barra, medalhas e mensagens
  // ------------------------------------------------
  function atualizarBarraProgresso() {
    // Lê o bônus vindo do chat
    let porcentagem = Number(
      localStorage.getItem(LS_BONUS_POSTAGENS) || 0
    );

    if (porcentagem < 0) porcentagem = 0;
    if (porcentagem > 100) porcentagem = 100;

    // Atualiza largura da barra
    if (barraProgresso) {
      barraProgresso.style.width = porcentagem + "%";
    }

    // Define nível com base na porcentagem
    // 0 = iniciante, 1 = Vigia, 2 = Sentinela, 3 = Mago
    let nivel = 0;
    if (porcentagem >= 100) {
      nivel = 3;
    } else if (porcentagem >= 60) {
      nivel = 2;
    } else if (porcentagem >= 30) {
      nivel = 1;
    } else {
      nivel = 0;
    }

    // Atualiza medalhas (.conquista.ativa)
    conquistas.forEach((c) => c.classList.remove("ativa"));
    if (nivel >= 1 && conquistas[0]) conquistas[0].classList.add("ativa");
    if (nivel >= 2 && conquistas[1]) conquistas[1].classList.add("ativa");
    if (nivel >= 3 && conquistas[2]) conquistas[2].classList.add("ativa");

    // ===== TÍTULO DAS CONQUISTAS (H2) =====
    if (tituloEconomia) {
      if (nivel === 0) {
        tituloEconomia.textContent = "Economizando 20L por semana";
      } else if (nivel === 1) {
        tituloEconomia.textContent =
          "Parabéns! Você alcançou o nível 1: Vigia de torneira!";
      } else if (nivel === 2) {
        tituloEconomia.textContent =
          "Muito bom! Você alcançou o nível 2: Sentinela da água!";
      } else if (nivel === 3) {
        tituloEconomia.textContent =
          "Incrível! Você alcançou o nível 3: Mago da sustentabilidade! 🎉";
      }
    }

    // ===== TEXTO DO CARD GRANDE (perfil-texto) =====
    if (tituloNivelEl && textoNivelEl) {
      if (nivel === 0) {
        tituloNivelEl.textContent = "Comece sua jornada de economia!";
        textoNivelEl.textContent =
          "Você ainda não desbloqueou conquistas. Comece registrando seu consumo e adotando pequenas ações para economizar água.";
      } else if (nivel === 1) {
        tituloNivelEl.textContent = "Vigia de torneira";
        textoNivelEl.textContent =
          "Parabéns! Você se tornou um Vigia de torneira! Sua atenção evita desperdícios e garante que cada gota conte.";
      } else if (nivel === 2) {
        tituloNivelEl.textContent = "Sentinela da água";
        textoNivelEl.textContent =
          "Agora você é uma Sentinela da água! Seu consumo consciente inspira outras pessoas a adotarem hábitos sustentáveis.";
      } else if (nivel === 3) {
        tituloNivelEl.textContent = "Mago da sustentabilidade";
        textoNivelEl.textContent =
          "Você atingiu o nível máximo! Suas ações têm impacto real na economia de água. Continue sendo exemplo!";
      }
    }

    // ===== MENSAGEM DE ESTÍMULO + DESAFIO ESPECIAL =====
    if (msgEstimuloEl && desafioEspecialEl) {
      if (nivel === 0) {
        msgEstimuloEl.innerHTML = `
          <h3>Mensagem de Estímulo</h3>
          <p>
            Você ainda não desbloqueou conquistas, mas cada pequena ação conta!
            Que tal começar registrando seu consumo de água hoje?
          </p>
          <p>
            Fechar a torneira ao escovar os dentes ou reduzir alguns minutos de banho
            já faz diferença. Comece com passos simples!
          </p>
        `;

        desafioEspecialEl.innerHTML = `
          <h3>Desafio Especial</h3>
          <p><strong>Próximo passo:</strong> Vigia de torneira</p>
          <ul>
            <li>Registrar seu consumo por 3 dias seguidos</li>
            <li>Escolher 1 hábito para mudar nesta semana</li>
          </ul>
        `;
      } else if (nivel === 1) {
        msgEstimuloEl.innerHTML = `
          <h3>Mensagem de Estímulo</h3>
          <p>
            Você já é um <strong>Vigia de torneira</strong>, um verdadeiro guardião contra o desperdício!
            Que tal dar o próximo passo nessa jornada sustentável?
          </p>
          <p>
            Cada gota economizada é um passo rumo a um planeta mais consciente. Continue firme!
          </p>
        `;

        desafioEspecialEl.innerHTML = `
          <h3>Desafio Especial</h3>
          <p><strong>Próximo passo:</strong> Sentinela da água</p>
          <ul>
            <li>Registrar cada atitude sustentável que você tiver no dia</li>
            <li>Compartilhar uma dica de economia de água com um amigo</li>
          </ul>
        `;
      } else if (nivel === 2) {
        msgEstimuloEl.innerHTML = `
          <h3>Mensagem de Estímulo</h3>
          <p>
            Agora você é uma <strong>Sentinela da água</strong>! Seu consumo consciente já está
            fazendo diferença na sua rotina.
          </p>
          <p>
            Continue monitorando seus hábitos e ajude outras pessoas a economizar também.
            Você está muito perto do próximo nível!
          </p>
        `;

        desafioEspecialEl.innerHTML = `
          <h3>Desafio Especial</h3>
          <p><strong>Próximo passo:</strong> Mago da sustentabilidade</p>
          <ul>
            <li>Manter sua economia de água por pelo menos 4 semanas</li>
            <li>Incentivar alguém da sua casa a registrar o consumo junto com você</li>
          </ul>
        `;
      } else if (nivel === 3) {
        msgEstimuloEl.innerHTML = `
          <h3>Mensagem de Estímulo</h3>
          <p>
            Você se tornou um <strong>Mago da sustentabilidade</strong>! Suas atitudes estão no nível máximo
            e servem de exemplo para outras pessoas.
          </p>
          <p>
            Continue compartilhando conhecimento e inspirando mais gente a cuidar da água.
            O planeta agradece!
          </p>
        `;

        desafioEspecialEl.innerHTML = `
          <h3>Desafio Especial</h3>
          <p><strong>Missão contínua:</strong> Espalhar sustentabilidade</p>
          <ul>
            <li>Ensinar alguém a usar o AquaPlanner e acompanhar o consumo</li>
            <li>Criar sua própria meta de economia e tentar superá-la</li>
          </ul>
        `;
      }
    }
  }

  // ------------------------------------------------
  // 4. INICIALIZAÇÃO
  // ------------------------------------------------
  carregarPerfil();
  atualizarBarraProgresso();

  // Atualização periódica para refletir mudanças do chat em tempo real
  setInterval(atualizarBarraProgresso, 1000);
});
