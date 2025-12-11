
# Projeto de Interface


## User Flow

O fluxograma apresentado na figura 1 mostra o fluxo de interação do usuário pelas telas do sistema. Cada uma das telas deste fluxo é detalhada na seção de Protótipo de baixa fidelidade que se segue.

  

![user  flow](https://github.com/user-attachments/assets/821ac489-8944-412b-9597-260d83097731)

  
<figure> 
    <figcaption>Figura 1 - Fluxo de telas do usuário
</figure> 


## Protótipo de baixa fidelidade

As telas do sistema seguem um padrão representado pela figura 2, porém com algumas alterações pontuais. Na estrutura citada temos divisão em 4 grandes blocos com as seguintes informações:
<ul>
  <li>Bloco 1 - Cabeçalho

Caixa com rótulo: Logo/Imagem da capa

Menu superior: Início | Cadastro | Login;</li>
  <li>Bloco 2- Menu lateral (sidebar)

Caixa com rótulo: Perfil (ícone)

Caixa: Controle de Consumo

Lista de navegação: Dashboard | Registro de consumo | Metas | Perfil
;</li>
  <li>Bloco 3 - Área principal (conteúdo)

Título: Dashboard

Subtítulo: Consumo de Água

Card 1: Consumo atual (450 L)

Card 2: Comparativo (-20%)

Card 3: Meta diária (100 L)

Card 4: Consumo médio (250 L)

Card 5: Dica do dia (Evite tomar banhos longos)
;</li>
  <li>Bloco 4 - Rodapé

Caixa: © 2025 AquaPlanner | Todos os direitos reservados.</li>
</ul>

<figure> 
  <img src="https://github.com/user-attachments/assets/c2104b84-8b41-4252-87e8-8ac30822d90a"
    <figcaption>Figura 2 - Estrutura padrão do site
</figure> 
<hr>

<h3><b>Tela - Homepage</b></h3>
<p>É a tela inicial que o usuário visualizará ao acessar o site. Nela o usuário poderá interagir com o dashboard contendo todas as informações sobre seu consumo de água, terá uma parte dedicada ao controle de consumo, como os registros e metas também. As abas acima ajudarão os usuários a serem redirecionados ao locais que desejam de forma rápida, ele poderá voltar ao início (homepage) sempre que quiser, poderá ser redirecionado para a tela de cadastro onde poderá criar uma conta e a aba de "fazer login", onde o usuário será levado a tela para preencher seu email e senha.</p>

<img width="2732" height="1536" alt="Captura de tela 2025-12-04 - 20 54 23" src="https://github.com/user-attachments/assets/6b492690-7777-429d-b0bf-2d9a99c579bb" />


  
<figure> 
  <figcaption>Figura 3 - Tela de Homepage
</figure> 
<hr>

<h3><b>Tela - Cadastro de usuário</b></h3>
<p>É a tela que permite ao usuário registrar-se no sistema. Na parte de cadastro, o usuário preencherá suas informações pessoais e logo em seguida, apertando o botão "entrar" será redirecionado para a homepage já com sua conta criada e logada no AquaPlanner.</p>

<img width="4098" height="2304" alt="Captura de tela 2025-12-04 - 20 55 30" src="https://github.com/user-attachments/assets/57f3df7f-1e8e-40ba-972e-ca61c9f002b2" />


<figure>  
    <figcaption>Figura 4 - Tela de Cadastro      
</figure> 
<hr>

<h3><b>Tela – Login</b></h3>
<p>A tela de Login apresenta campos para a inserção do e-mail e da senha, junto dos links diretos para recuperação de senha e cadastro de novo usuário. </p>

<figure> 
  <img width="2523" height="1313" alt="Captura de Tela 2025-12-04 às 20 48 29" src="https://github.com/user-attachments/assets/2d961e3a-f061-4d13-9696-7e897711891c" />
  <figcaption>Figura 2 - Esrutura padrão do site</figcaption>
</figure> 
<hr>

<h3><b>Tela – Recuperação de senha via e-mail</b></h3>
<p>A tela de recuperação de senha apresenta uma breve mensagem explicativa, junto de um campo para inserção do e-mail que deseja recuperar. A API utlizada pelo grupo tem funcionalidade nesta parte.</p>
  

<figure>
  <img width="2538" height="1312" alt="Captura de Tela 2025-12-04 às 20 53 52" src="https://github.com/user-attachments/assets/14ebd32c-05c6-4b6d-8e00-bbab1c08ccd3" />
  <figcaption>Figura 6 - Tela de recuperação de senha do usuário
</figure>
<hr>


<h3><b>Tela – Impacto ambiental</b></h3>
<p>Exibe um quadro comparativo. Ajuda o usuário analisar seu impacto ambiental pessoal com relação a seu consumo. </p>

![Impacto ambiental](https://github.com/user-attachments/assets/5fb25383-5c75-4729-b989-38376be9766b)


<figure> 
    <figcaption>Figura 7 - Tela de impacto ambiental pessoal do usuário
</figure>
<hr>   
  <h3><b>Tela – Registro de consumo</b></h3>
<p>É a tela que permite ao usuário inserir seu consumo no sistema. Nesta interface o usuário poderá registrar a quantidade de água consumida pelo período mensal.  </p>
  
![registro de consumo](https://github.com/user-attachments/assets/0ddebd4a-f403-4e1e-adf2-e42de1e33762)

<figure> 
    <figcaption>Figura 8 - Tela de registro de consumo do usuário
</figure>
<hr> 

  <h3><b>Tela – Gráficos de consumo</b></h3>
<p>Exibe gráficos interativos que mostram o consumo diário, semanal e mensal de água. Ajuda o usuário a acompanhar metas e entender seu consumo de forma clara e acessível.   </p>
  

<img width="1459" height="748" alt="Captura de Tela 2025-12-03 às 19 42 43" src="https://github.com/user-attachments/assets/4cfa6515-15e0-4189-a7be-65aefe3a8f52" />

<figure> 
    <figcaption>Figura 9 - Tela de Gráficos de consumo
</figure>
 <hr>

  <h3><b>Tela – Dicas de economia de água</b></h3>
<p>Apresenta sugestões práticas para reduzir o desperdício em atividades domésticas. As dicas são ilustradas com ícones. </p>

 <img width="1459" height="748" alt="Captura de Tela 2025-12-03 às 19 43 33" src="https://github.com/user-attachments/assets/d153d914-fa7e-4100-9a55-cbcd636bf60c" />


<figure> 
    <figcaption>Figura 10 - Tela de dicas de economia de água
</figure>
 <hr>

  <h3><b>Tela – Interação entre usuários</b></h3>
<p>O objetivo dessa tela é estimular a troca de experiências sustentáveis entre os usuários, incentivando o aprendizado coletivo e reforçando hábitos de economia de água por meio de interação social, curtidas, comentários e compartilhamentos. </p>

 
  <img width="1919" height="942" alt="tela de interação de usuarios" src="https://github.com/user-attachments/assets/9db07dab-55f0-46b2-97c9-72c70f425103" />

<figure> 
    <figcaption>Figura 11 - Tela de interação entre usuários
</figure>
 <hr>

  <h3><b>Tela – Pefil de usuário e Conquistas</b></h3>
<p>Essa interface serve para acompanhar o progresso do usuário na economia de água, mostrando metas, conquistas, estímulos motivacionais e desafios.
A ideia é engajar o usuário por meio de gamificação (medalhas e níveis) e criar uma experiência positiva de consciência ambiental. </p>

<img width="1916" height="945" alt="tela de perfil" src="https://github.com/user-attachments/assets/88213db1-badb-498c-9da3-46c25a844172" />


<figure> 
    <figcaption>Figura 12 - Tela de perfil de usuário e conquistas
</figure>







