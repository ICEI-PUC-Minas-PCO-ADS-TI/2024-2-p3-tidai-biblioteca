
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A metodologia adotada pelo nosso grupo para o desenvolvimento deste projeto baseou-se nas práticas ágeis, uma abordagem que valoriza a flexibilidade, a colaboração e a entrega contínua. Optamos por utilizar o Scrum, um dos métodos ágeis mais reconhecidos, para guiar nosso processo de trabalho. A metodologia enfatiza a entrega incremental, permitindo que as funcionalidades do projeto sejam desenvolvidas e disponibilizadas em ciclos curtos, conhecidos como sprints. Cada sprint teve uma duração fixa, proporcionando oportunidades frequentes de revisão e adaptação do trabalho realizado. Para facilitar a comunicação e colaboração, utilizamos ferramentas colaborativas, como o discord para comunicação em tempo real e o Trello para gerenciar as tarefas em um formato visual e interativo. Essas ferramentas foram essenciais para manter todos os membros da equipe alinhados com os objetivos e progressos do projeto.

## Relação de ambientes de trabalho

O Trello é uma ferramenta de gerenciamento de projetos baseada em quadros, listas e cartões. Cada cartão representa uma tarefa ou demanda, e as listas organizam essas tarefas em diferentes estágios do projeto, isso facilita a visualização do fluxo de trabalho, permite atribuir responsabilidades a membros da equipe, acompanhar o progresso em tempo real e identificar possíveis gargalos. Além disso, sua interface intuitiva promove a colaboração eficiente entre os membros da equipe.

VisualStudio - Desenvolvimento de React:
VisualStudio é um ambiente de desenvolvimento integrado poderoso. Suporta uma ampla gama de linguagens de programação, oferecendo recursos avançados como realce de sintaxe, depuração e controle de versão integrado. A eficiência do VisualStudio reside na sua extensibilidade e na integração perfeita com ferramentas populares. Oferece sugestões inteligentes de código, facilita a navegação no projeto e proporciona uma experiência de desenvolvimento fluida.

Discord - Reuniões de Alinhamento:
Discord é uma plataforma de comunicação por voz, vídeo e texto. Foi utilizado para reuniões de alinhamento entre os membros da equipe, proporcionando uma comunicação rápida e eficaz. Foram realizadas reuniões síncronas, promovendo a interação instantânea entre os membros da equipe, facilita a comunicação informal e oferece recursos como compartilhamento de tela para apresentações mais claras.

GitHub - Controle de versão do software e repositório de documentação:
GitHub é uma plataforma de hospedagem de código-fonte que utiliza o sistema de controle de versão Git. Ele fornece um ambiente colaborativo para desenvolvedores compartilharem, colaborarem e controlarem as alterações em seu código. O repositório oferece um histórico detalhado de alterações no código, facilita a colaboração simultânea de várias equipes, fornece recursos de rastreamento de problemas (issues) e permite a integração contínua para garantir uma entrega contínua e estável. Em conjunto, essas ferramentas criaram um ambiente de desenvolvimento integrado e colaborativo. O Trello ajudou na organização das tarefas, o VSCode facilitou o desenvolvimento do código, o Discord promoveu a comunicação eficiente, e o GitHub garantiu o controle de versão e a gestão centralizada do código-fonte.


## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gestão de tags, merges, commits e branches é realizada. Discuta também como a gestão de issues foi feita.

> **Links úteis**:
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e GitHub](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
> - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Planejamento do projeto

###  Divisão de papéis

A equipe foi dividida em papéis distintos, cada membro contribuindo para o desenvolvimento do projeto de maneira específica. Abaixo estão detalhadas as responsabilidades e realizações de cada integrante:

#### Sprint 1
- _Scrum master_: Alessandro Gomes Pereira
- Protótipos: Matheus Henrique Alvim
- Testes: Bernardo Azevedo Estrela
- Documentação: Alessandro/Matheus/Bernardo

#### Sprint 2
- _Scrum master_: Alessandro Gomes Pereira
- Desenvolvedor: Alessandro Gomes Pereira
- Desenvolvedor: Bernardo Azevedo Estrela
- Desenvolvedor: Matheus Henrique Alvim
- Desenvolvedor: Luiza Sampaio Ribeiro

###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

#### Sprint 1

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| AlunaX        | Introdução | 01/02/2024     | 07/02/2024 | ✔️    | 05/02/2024      |
| AlunaZ        | Objetivos    | 03/02/2024     | 10/02/2024 | 📝    |                 |
| AlunoY        | Histórias de usuário  | 01/01/2024     | 07/01/2005 | ⌛     |                 |
| AlunoK        | Personas 1  |    01/01/2024        | 12/02/2005 | ❌    |       |

#### Sprint 2

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| AlunaX        | Página inicial   | 01/02/2024     | 07/03/2024 | ✔️    | 05/02/2024      |
| AlunaZ        | CSS unificado    | 03/02/2024     | 10/03/2024 | 📝    |                 |
| AlunoY        | Página de login  | 01/02/2024     | 07/03/2024 | ⌛     |                 |
| AlunoK        | Script de login  |  01/01/2024    | 12/03/2024 | ❌    |       |


Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado


> **Links úteis**:
> - [11 passos essenciais para implantar Scrum no seu projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
> - [Os papéis do Scrum e a verdade sobre cargos nessa técnica](https://www.atlassian.com/br/agile/scrum/roles)

### Processo

Coloque informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
> **Links úteis**:
> - [Planejamento e gestão ágil de projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Como criar backlogs no GitHub](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial slack](https://slack.com/intl/en-br/)

### Ferramentas

Liste todas as ferramentas que foram empregadas no projeto, justificando a escolha delas, sempre que possível.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | http://....                            |
| Documentos do projeto               | GitHub                             | http://....                            |
| Projeto de interface                | Figma                              | http://....                            |
| Gerenciamento do projeto            | Trello                             | http:[//....](https://trello.com/invite/b/66e72dc7e87edb7c44ba5a8a/ATTI0521c38aa2fcd32fd5ebe6e341310a302620BC73/kanban-quadro-modelo)                            |
| Hospedagem                          | Vercel                             | http://....                            |
 
