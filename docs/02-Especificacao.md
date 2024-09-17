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
|Eu, como professor                 | Desejo reservar livros para minhas aulas                            | Para lecionar minhas aulas                                   |
|Eu, como unidade de ensino         | Desejo monitorar a disponibilidade dos livros                       | Para garantir que o acervo esteja sempre atualizado          |  
|Eu como estudante                  | Quero renovar meus livros sem ter que comparecer a biblioteca       | Para economizar tempo e diminuir a burocracia                |
|Eu como estudante                  | Quero receber notificações quando os livros que reservei estiverem disponiveis  | para otimizar meus estudos em assuntos específicos.|
|Eu como professor                  | Desejo poder recomendar leituras                                    | Para facilitar o acesso ao material complementar que considero importante|
|Eu, como unidade de ensino         | Quero poder acompanhar as solicitações de novos títulos             | Para assim poder ajustar o acervo de acordo com as necessidades       |
|Eu como estudante   | Desejo poder acessar artigos acadêmicos diretamente pela app       | Preciso de fontes confiáveis e atualizadas para minhas pesquisas           |
|Eu como estudante   | Quero encontrar rapidamente os     | para otimizar meus estudos em          |
|Universitario       | livros relacionados ao meu curso   | assuntos específicos.                  |


## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Cadastro de livros | ALTA | 
|RF-002| Gerenciamento de acervos   | ALTA |
|RF-003| Renovação de empréstimo   | ALTA |
|RF-004| Emprestimo de livros   | ALTA |
|RF-005| Pagamento de multas   | BAIXA |
|RF-006| Notificações de prazo   | MEDIA |
|RF-007| Reserva de livros  | ALTA |
|RF-008| Devolução de livros  | ALTA |
|RF-009| Fóruns  | BAIXA |
|RF-010| Favoritos  | BAIXA |
|RF-011| Acesso a conteudos digitais  | ALTA |
|RF-012| Cadastro de usuários  | ALTA |
|RF-013| Histórico de leitura e emprestimos  | BAIXA |



### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Disponibilidade: O sistema deve ter uma disponibilidade, garantindo que os usuários possam acessar o aplicativo a qualquer momento. | MÉDIA | 
|RNF-002| Usabilidade: A interface do aplicativo deve ser intuitiva e fácil de usar, independentemente do nível de habilidade do usuário com tecnologia. |  ALTA |
|RNF-003| Confiabilidade: O sistema deve garantir a integridade dos dados, prevenindo a perda ou corrupção de informações, especialmente em operações críticas como empréstimos e reservas de livros. |  ALTA |
|RNF-004| Desempenho: O sistema deve ser capaz de responder às solicitações dos usuários em no máximo 5 segundos, garantindo uma navegação fluida e sem atrasos, mesmo em momentos de pico de acessos. |  MÉDIA |
|RNF-005| Manutenção: O código deve ser modular e bem documentado para facilitar futuras manutenções, atualizações e possíveis expansões de funcionalidades, permitindo que desenvolvedores possam facilmente compreender e modificar o sistema. |  BAIXA |


## Restrições

As questões que limitam a execução desse projeto e que se configuram como obrigações claras para o desenvolvimento do projeto em questão são apresentadas na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001|O projeto deverá ser entregue no final do semestre letivo, não podendo extrapolar a data de 09/12/2024. |
|002|A equipe não pode subcontratar o desenvolvimento do trabalho.       |
|003|Todos da equipe devem desenvolver.       |

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.

> **Links úteis**:
> - [Criando casos de uso](https://www.ibm.com/docs/pt-br/engineering-lifecycle-management-suite/design-rhapsody/10.0?topic=cases-creating-use)
> - [Como criar diagrama de caso de uso: tutorial passo a passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
