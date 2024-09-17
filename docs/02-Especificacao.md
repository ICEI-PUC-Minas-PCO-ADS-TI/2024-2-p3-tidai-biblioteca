# Especificação do projeto

O presente projeto será desenvolvido utilizando React no frontend e Node.js no backend. O React, sendo uma biblioteca JavaScript popular para a criação de interfaces de usuário dinâmicas e componentes reutilizáveis, permitirá a construção de um aplicativo de biblioteca interativo e eficiente. A separação da lógica visual e funcional será gerenciada por CSS para estilizar os componentes React, mantendo a organização entre a estrutura e a aparência do aplicativo.No backend, utilizaremos Node.js, uma plataforma JavaScript que permite construir aplicativos escaláveis e eficientes no lado do servidor. Node.js será responsável pelo gerenciamento das operações de persistência de dados, interações com banco de dados e APIs, garantindo uma comunicação fluida entre o frontend e o backend.

## Personas

Exemplo: _Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente por meio de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros._

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links úteis**:
> - [Rock content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`               | QUERO/PRECISO ... `FUNCIONALIDADE`                                  |PARA ... `MOTIVO/VALOR`                                       |
|-----------------------------------|---------------------------------------------------------------------|--------------------------------------------------------------|
|Eu como estudante Universitario    | Quero encontrar rapidamente os livros relacionados ao meu curso     | para otimizar meus estudos em assuntos específicos.          |
|Eu, como professor  | Desejo reservar livros para minhas | Para lecionar minhas aulas             |
|                    | aulas                              |                                        |
|Eu, como unidade    | Desejo monitorar a                 | Para garantir que o acervo esteja      |
|de ensino           | disponibilidade dos livros         | sempre atualizado                      |
|Eu como estudante   | Quero renovar meus livros sem ter  | Para economizar tempo e diminuir       |
|                    | que comparecer a biblioteca        | a burocracia                           |
|Eu como estudante   | Quero receber notificações quando  | para otimizar meus estudos em          |
|                    | os livros que reservei estiverem   | assuntos específicos.                  |
|                    | disponiveis                        |                                        |
|Eu como professor   | Desejo poder recomendar leituras   | Para facilitar o acesso ao material    |
|                    |                                    | complementar que considero importante  |
|Eu, como unidade    | Quero poder acompanhar as          | Para assim poder ajustar o acervo      |
|de ensino           | solicitações de novos títulos      | de acordo com as necessidades          |
|Eu como estudante   | Desejo poder acessar artigos       | Preciso de fontes confiáveis           |
|                    | acadêmicos diretamente pela app    | e atualizadas para minhas pesquisas    |
|Eu como estudante   | Quero encontrar rapidamente os     | para otimizar meus estudos em          |
|Universitario       | livros relacionados ao meu curso   | assuntos específicos.                  |


## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |

### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em dispositivos móveis | MÉDIA | 
|RNF-002| Deve processar as requisições do usuário em no máximo 3 segundos |  BAIXA | 

Com base nas histórias de usuários, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos não funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).

Lembre-se de que cada requisito deve corresponder a uma e somente uma característica-alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas histórias de usuários foram cobertos.

> **Links úteis**:
> - [O que são requisitos funcionais e requisitos não funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [Entenda o que são requisitos de software, a diferença entre requisito funcional e não funcional, e como identificar e documentar cada um deles](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre |
|002| O custo total do projeto não deve exceder o orçamento definido       |

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.

> **Links úteis**:
> - [Criando casos de uso](https://www.ibm.com/docs/pt-br/engineering-lifecycle-management-suite/design-rhapsody/10.0?topic=cases-creating-use)
> - [Como criar diagrama de caso de uso: tutorial passo a passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
