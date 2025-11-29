# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-e1-exemplo-vida-de-estudante/tree/main/documentos/02-Especificação%20do%20Projeto.md"> Especificação do Projeto</a></span>, <a href="https://github.com/ICEI-PUC-Minas-PMV-ADS/ads-e1-exemplo-vida-de-estudante/tree/main/documentos/04-Projeto%20de%20Interface.md"> Projeto de Interface</a>

Os requisitos para realização dos testes de software são:
<ul><li>Site publicado na internet;</li>
<li>Navegador da internet: Chrome, Firefox ou Edge.</li>
</ul>

Os testes funcionais a serem realizados na aplicação são descritos a seguir.

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-01: Validação do formulário de cadastro do usuário na aplicação. Redirecionamento da página de cadastro para o dashboard com a conta do usuário já cadastrada. Atualização dos dados nos cards sempre que a página recarregar.</td>
  <td>
   <ul>
    <li>RF-01: O sistema deve permitir que o usuário cadastre-se e crie uma conta.</li>
    <li>RF-06: O sistema deve permitir que o usuário visualize em tempo real o consumo de água da moradia ou do estabelecimento por meio          do painel interativo</li>
   </ul>
  </td>
  <td>Verificar se ao preencher o formulário, os campos funcionem corretamente mostrando erros caso o usuário preencha algum campo incorretamente ou se esqueça de preencher. Ao final, o cadastro precisa ser finalizado ao apertar o botão "entrar". 
   O usuário será redirecionado para a homepage (dashboard) já com uma conta criada. Atráves dos cards, o usuário poderá conferir, o consumo de água anual, mensal e semanal, quantos porcento ele consumiu ou deixou de consumir, consumo médio em litros e dicas rápidas.</td>
  <td>
   <ol>
    <li>Acessar qualquer navegador (Chrome, Firefox, Edge)</li>
    <li>Informar endereço do site</li>
    <li>Preencher os campos seguindo o que se pede</li>
    <li>Ao finalizar, clicar no "entrar"</li>
    <li>A página deve ser redirecionada para a homepage com uma conta criada.</li>
    <li>Verificar dados salvos no localStorage</li>
    <li>Atualização de novos dados dos cards sempre que for feito um recarregamento da página.</li>
    <li>Barra lateral e menu de navegação do dashboard escondidas ao apertar o menu hamburguer no modo responsivo.</li>
   
   </ol>
   </td>
  <td>O cadastro precisa ser validado com sucesso e os dados do usuário salvos no localStorage. Na homepage, novos dados devem ser exibidos nos cards ao recarregar a página ou voltar para ela.</td>
  <td>Arthur Freitas</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-02: Verificar o funcionamento dos de registro de dados e links da pagina de Login, além do funcionamento do resgate de senha do usuário</td>
  <td>
   <ul>
    <li>RF-02: O sistema permitirá que o usuário realize o login e logout.</li>
    <li>RF-04: O sistema permitirá a recuperação de senha via e-mail.</li>
   </ul>
  </td>
  <td>Verificar se os links da página de Login estão encaminhando para as respectivas páginas corretamente e se o e-mail e senha do usuário estão devidamente armazenados a partir do envio da senha através do e-mail.</td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página de cadastro e registrar seus dados</li>
    <li>vizualizar pagina de login</li>
    <li>Preencher campos de login e senha com dados previamente cadastrados</li>
    <li>Clicar no botão de login</li>
    <li>Voltar para a tela de login</li>
    <li>Clicar no link "esqueceu senha"</li>
    <li>Escrever e-mail cadastrado e clicar no botão enviar</li>
    <li>Retornar a tela de login</li>
    <li>Clicar no link "cadastrar-se"</li>
    <li>Ser redirecionado a tela de cadastro</li>
   </ol>
   </td>
  <td>O usuário e senha devem ser reconhecidos pelo localStorage, o botão de login e todos os links da página devem encaminhar os usuários para as páginas descritas. Usuário deve também receber um e-mail com a senha cadastrada apóx informar e-mail na tela de recupareção de senha.</td>
  <td>Matheus Lamas Galvão</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-03: Verificar a Exibição e Formato dos Gráficos de Consumo.</td>
  <td>
   <ul>
    <li>RF-08 O sistema deve exibir gráficos de consumo diário, semanal e mensal.</li>
   </ul>
  </td>
  <td>Verificar a funcionalidade da tela de Gráficos de Consumo, validando o carregamento da interface, a presença do cartão de meta e a correta renderização dos gráficos Diário, Semanal e Mensal.</td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página de Gráficos de Consumo</li>
    <li>Confirmar a presença do título "Gráficos de Consumo", dos três gráficos (Diário, Semanal e Mensal) e do cartão "Meta - Diária (120 L)".</li>
    <li>Clicar na barra lateral esquerda "Consumo Diário".</li>
    <li>Clicar na barra lateral esquerda "Consumo Semanal".</li>
    <li>Clicar na barra lateral esquerda "Consumo Mensal".</li>
    <li>Clicar na barra lateral esquerda "Gráficos de Consumo".</li>
    <li>Passar o mouse sobre um ponto de dado em cada um dos três gráficos (Diário, Semanal e Mensal).</li>
   </ol>
   </td>
  <td>Todos os componentes visuais (títulos, cartão de meta e áreas de gráfico) são carregados e o cartão de meta exibe 120 L. Os tooltips exibidos em todos os três gráficos devem mostrar o valor de consumo com a unidade Litros (L).</td>
  <td>Elen Maria Gonçalves Lazaro</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-04: Verificar a Exibição, Interação e Reset de Dicas.</td>
  <td>
   <ul>
    <li>RF-09 O sistema deve disponibilizar dicas práticas de economia de água externas para o uso doméstico.</li>
   </ul>
  </td>
  <td>Verificar a funcionalidade da tela de Dicas, incluindo o carregamento inicial, a marcação/desmarcação de dicas e a redefinição de dados.</td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página de Dicas de Economia.</li>
    <li>Confirmar que o progresso é "0 de 5 dicas aplicadas" e que as 5 dicas estão visíveis.</li>
    <li>Clicar na Dica 1 (Fechar a torneira) e na Dica 3 (Reaproveitar água da máquina de lavar).</li>
    <li>O progresso deve atualizar imediatamente para "2 de 5 dicas aplicadas".</li>
    <li>Passar o mouse sobre o ícone 'i' da Dica 2 (Use balde em vez de mangueira) e verificar o texto informativo.</li>
    <li>Clicar na Dica 1 novamente (ela deve ser desmarcada). O progresso deve cair para "1 de 5 dicas aplicadas".</li>
    <li>Marcar as Dicas 1, 2, 4 e 5 para alcançar o progresso máximo.</li>
    <li>Clicar no botão "Limpar Progresso" e confirmar a ação.</li>
    <li>O progresso deve retornar a "0 de 5 dicas aplicadas" e nenhuma dica deve estar marcada.</li>
   </ol>
   </td>
  <td>A interface das Dicas deve carregar corretamente, exibindo 0 de 5 dicas aplicadas. A marcação ou desmarcação de uma dica deve atualizar instantaneamente o contador e a barra de progresso. O tooltip deve ser ativado ao passar o mouse sobre o ícone 'i', exibindo a descrição correta da dica. A função "Limpar Progresso" deve resetar o progresso para 0/5 na interface.</td>
  <td>Elen Maria Gonçalves Lazaro</td>
 </tr>
</table>


<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>

 <tr>
  <td>CT-05: Verificar a interação na caixa de texto e a concessão de conquistas</td>
  <td>
   <ul>
    <li>RF-12: O sistema deve ter uma caixa de texto que permita a interação entre os usuários sobre os resultados alcançados ou o compartilhamento de dicas. (Média)</li>
    <li>RF-13: O sistema deve conceder conquistas ao usuário quando ele atingir determinadas metas (exemplo: “Vigia de Torneira”, “Sentinela da Água”, “Mago da Sustentabilidade”). (Alta)</li>
   </ul>
  </td>
  <td>
    Verificar se a caixa de texto permite a interação entre os usuários e se, ao utilizar essa funcionalidade, o sistema atualiza corretamente as conquistas do usuário.
  </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Efetuar login com um usuário previamente cadastrado.</li>
    <li>Visualizar a página de Perfil, onde se encontram a gamificação e as conquistas do usuário.</li>
    <li>A partir da página de Perfil, navegar até a tela de interação/Chat (por meio do menu ou atalho “Chat”, no menu lateral).</li>
    <li>Localizar a caixa de texto disponível para o usuário.</li>
    <li>Digitar uma mensagem com uma dica ou resultado alcançado.</li>
    <li>Clicar no botão para enviar/criar a postagem.</li>
    <li>Verificar se a mensagem aparece na listagem de postagens do Chat.</li>
    <li>Retornar à página de Perfil/Conquistas.</li>
    <li>Verificar se houve atualização na barra de progresso e/ou nas conquistas exibidas (ex.: “Vigia de Torneira”,“Sentinela da Água”, “Mago da Sustentabilidade”).</li>
   </ol>
  </td>
  <td>
    A mensagem deve ser exibida corretamente na área de interação do Chat, permitindo a visualização pelos usuários. 
    Ao realizar interações suficientes, a barra de progresso e as conquistas do usuário na tela de Perfil devem ser atualizadas de acordo com as metas definidas, exibindo o nível apropriado (“Vigia de Torneira”, “Sentinela da Água”, “Mago da Sustentabilidade”).
  </td>
  <td>Bárbara Augusta</td>
 </tr>
</table>
<table>
 <tr>
  <th>Caso de Teste</th>
  <th>Requisitos Associados</th>
  <th>Objetivo de Teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
 <td> CT-06: Registrar o Consumo de Água.</td>
 <td>
  <ul>
   <li> RF-05: O sistema permitirá que o usuário registre de forma manual consumos diários, mensais, semestrais ou anuais.(Alta)</li>
  </ul>
 </td>
 <td>
  Verificar se o sistema permite o registro manual do consumo de água pelo usuário para diferentes períodos (diário, mensal, semestral, anual), conforme especificado no requisito.
 </td>
 <td>
  <ol>
   <li>Acessar a tela de registro de consumo de água.</li>
   <li>Selecionar a opção de registro manual.</li>
   <li>Selecionar o período de registro (ex: Diário, Mensal, Semestral, Anual).</li>
   <li>Inserir um valor válido de consumo (ex: 200 Litros).</li>
   <li>Clicar no botão "Registrar".</li>
   <li>Acessar a tela de Impacto Ambiental ou Grafico de Consumos.</li>
  </ol>
 </td>
 <td>
  O sistema exibe um alerta para confirmação de registro bem-sucedido.
  O processo é repetido com sucesso para todos os períodos especificados (Diário, Mensal, Semestral, Anual).
 </td>
 <td>Maria Gabriela</td>
</table>



<table>
 <tr>
  <th>Caso de Teste</th>
  <th>Requisitos Associados</th>
  <th>Objetivo de Teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
 <td>CT-07: Visualizar o Impacto Ambiental.</td>
 <td>
  <ul>
   <li> RF-07: O sistema deve apresentar o impacto ambiental estimado com base no consumo.(Média)</li>
  </ul>
 </td>
 <td>
Verificar se o sistema calcula e apresenta o impacto ambiental estimado de forma correta e compreensível, utilizando como base o consumo de água registrado pelo usuário.
 </td>
 <td>
  <ol>
   <li>Registrar um consumo de água válido no sistema.</li>
   <li>Navegar para a tela de visualização do Impacto Ambiental.</li>
   <li>Analisar o valor e a métrica de impacto apresentada.</li>
   <li>Comparar o impacto estimado com o consumo registrado.</li>
  </ol>
 </td>
 <td>
  O sistema exibe claramente uma métrica de impacto ambiental.
  O valor do impacto exibido é coerente com o consumo de água (valores de consumo maiores devem resultar em impactos maiores).
  A informação é legível e associada ao período de consumo.
 </td>
 <td>Maria Gabriela</td>
</table>

