# Especificação do Projeto

## Perfis de Usuários

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil 01: Adultos </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Qualquer pessoa que deseja reduzir seu consumo diário de água.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>
1.Incentivo para adotar hábitos conscientes, como banhos mais curtos e fechar torneiras ao escovar os dentes.
2. Redução de custos nas altas contas de água.
3. Manter o acompanhamento do meu consumo.
</td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil 02: Idosos </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Pessoas de idade avançada que podem ter dificuldade com tecnologias e precisam de informações mais simples, acessíveis.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>
1. Receber lembretes visuais e sonoros para evitar desperdícios.
2. Ter relatórios de consumo em linguagem clara, com letras grandes, gráficos simples e design inclusivo .
3. Garantir a economia sem precisar de muito esforço manual.
</td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil 03: Donas de Casa </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">As responsáveis pelo cuidado diário do lar são as que mais utilizam água em atividades diárias como lavar roupa, louça, cozinhar e cuidar de plantas.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>1. Controlar melhor os gastos domésticos relacionados à conta de água.</td>
</tr>
</tbody>
</table>

## Histórias de Usuários

A análise constatou as seguintes histórias de usuários:

|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
| Morador | Ter controle do meu consumo de água | Reduzir minha conta de água |
| Ambientalista | participar de uma atividade extra que emita certificados | cumprir os créditos necessários para concluir a graduação. |
| Morador de República | Ver relatórios individuais sobre meu consumo de água. | Para conseguir entender minha parte na conta. |
| Estudante Ambientalmente Engajado | Acesso a informações educativas sobre os gastos de água. Gerar relatório em arquivo pdf para impressão. | Para acompanhar metas de consumo de água e impacto ambiental. |
| Dona de casa responsável pelas tarefas domésticas | Quero acessar dicas práticas de consumo consciente de água no meu dia a dia. | Para reduzir o desperdício |
| Idoso com pouca familiaridade com tecnologia | Gostaria de ter acesso a uma plataforma simples | Para entender facilmente quando estou gastando demais |
| Pai/Mãe de Família | Cadastrar perfis individuais | Para acompanhar o consumo de cada membro e promover a conscientização familiar. |

## Requisitos

### Requisitos Funcionais

[Utilize o modelo de tabela abaixo para apresentar os requisitos funcionais]

|ID    | Descrição                | Prioridade |
|-------|---------------------------------|----|
| RF-01 |  O sistema permitirá que o usuário se cadastre e cria uma conta | ALTA | 
| RF-02 |  O sistema permitirá que o usuário realize o login e logout. | ALTA |
| RF-03 | O sistema permitirá editar ou atualizar as contas de usuários já cadastrados. | ALTA |
| RF-04 | O sistema permitirá a recuperação de senha via e-mail. | ALTA |
| RF-05 | O sistema permitirá que o usuário registre de forma manual consumos diários, mensais, semestrais ou anuais | ALTA |
| RF-06 | O sistema deve permitir que o usuário visualize em tempo real o consumo de água da moradia ou do estabelecimento por meio do painel interativo no site. | ALTA |
| RF-07 | O sistema deve apresentar o impacto ambiental estimado com base no consumo. | MÉDIA |
| RF-08 | O sistema deve exibir gráficos de consumo diário, semanal e mensal. | ALTA |
| RF-09 | O sistema deve disponibilizar dicas práticas de economia de água voltadas para o uso doméstico. | ALTA |
| RF-10 | O sistema deve disponibilizar ao usuário um relatório completo de consumo em PDF na área de consumo do DASHBOARD, permitindo sua visualização e download a qualquer momento. | MÉDIA |
| RF-11 | O sistema deve exibir notificações visuais com ícones e cores de fácil compreensão sempre que o consumo de água ultrapassar os limites definidos como ideais | MÉDIA |
| RF-12 | O sistema deve ter uma caixa de texto que permite interação entre os usuários, sobre os resultados alcançados ou compartilhamento de dicas. | MÉDIA |
| RF-13 | O sistema deve conceder conquistas ao usuário quando ele atingir determinadas metas (Exemplo: “Vigia de torneira”, “Estagiário das Gotas”, “Sentinela da Água”, “Mago da sustentabilidade”). | MÉDIA |
| RF-14 | O sistema deve mostrar um gráfico do volume dos reservatórios do sistema Paraopeba. | BAIXA |
| RF-15 | O sistema deve permitir integrar dados de consumo a partir da digitalização ou escaneamento de contas de água | BAIXA |

**Prioridade: Alta / Média / Baixa. 

### Requisitos Não Funcionais


|ID      | Descrição               |Prioridade |
|--------|-------------------------|----|
| RNF-01 | O sistema deve permitir exportação de relatórios compatíveis com diferentes sistemas operacionais | ALTA | 
| RNF-02 | O sistema deve suportar um número definido de usuários simultâneos sem comprometer o desempenho (escalabilidade). | ALTA | 
| RNF-03 | O sistema deve ter disponibilidade de 24 horas por dia, possibilitando ao usuário monitorar seu consumo de água em tempo real e em qualquer momento. | ALTA | 
| RNF-04 | O sistema deve ter tempo de resposta inferior a 2 segundos para exibir gráficos. | MÉDIA | 
| RNF-05 | A aplicação deve ser simples, intuitiva e adaptada para fácil navegação para usuários com baixa familiaridade com tecnologia, permitindo o acesso às dicas de forma rápida e clara. | ALTA | 
| RNF-06 | O sistema deve ser compatível em navegadores web (Chrome, Firefox, Edge). | ALTA | 
| RNF-07 | O sistema deve apresentar o impacto ambiental estimado com base no consumo registrado. | MÉDIA | 
| RNF-08 | O sistema deve ser desenvolvido utilizando padrões de usabilidade e manutenção, facilitando futuras atualizações. | ALTA | 
| RNF-09 | Os dados do usuário devem ser armazenados de forma segura, utilizando protocolos de criptografia (ex.: HTTPS). | ALTA | 
| RNF- 10 | A aplicação deve ser responsiva. | ALTA |
| RNF- 11 | Permitir o armazenamento de dados em localStorage. | ALTA | 


**Prioridade: Alta / Média / Baixa.
