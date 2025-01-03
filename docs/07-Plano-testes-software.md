# Plano de testes de software

O plano de testes de software é essencial para garantir a qualidade do software. Isso porque, o plano garante que o software seja testado de forma completa e ampla, passando por todas as funcionalidades do produto.

O plano de testes também ajuda na identificação de erros de programação, problemas de usabilidade e até mesmo de desempenho inadequado.

| **Caso de teste**  | **CT-001 – Cadastro de livros**  |
|:---: |:---: |
| Requisito associado | RF-01 - A aplicação deve apresentar, em uma página relacionada, a possibilidade do cadastro completo de livros |
| Objetivo do teste | Verificar se o usuário consegue cadastrar um livro na aplicação |
| Passos | - Realizar login no sistema com o nível de acesso administrador <br>- Clicar na opção "Cadastrar livro"<br> - Preencher todas as informações necessarias. |
| Critério de êxito | - O livro foi cadastrado. |
| Responsável pela elaboração do caso de teste | Alessandro Gomes Pereira |

<br>

| **Caso de teste**  | **CT-002 – Gerenciamento de acervo**  |
|:---: |:---: |
| Requisito associado | RF-02 - O administrador deve ser capaz de gerenciar completamente o acervo. |
| Objetivo do teste | Verificar se o administrador consegue realizar o CRUD. |
| Passos | - Acessar o navegador <br> - Realizar login no sistema com nível de acesso administrador <br> -Na página inicial ser capaz de atualizar e remover livros do acervo <br> - Na página "Cadastro de livros" ser capaz de cadastrar um livro (RF-01)                                                 |
| Critério de êxito | - Operação CRUD realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Alessandro Gomes Pereira |


| **Caso de teste**  | **CT-003 – Renovar emprestimo**  |
|:---: |:---: |
| Requisito associado | RF-03 - O usuário deve ser capaz de renovar um livro. |
| Objetivo do teste | Verificar se o usuário é capaz de relizar a renovação de um livro. |
| Passos | - Acessar o navegador <br> - Realizar login no sistema <br> -Navegar até a página de renovação <br> - A renovação só pode ser feita se o livro não estiver reservado por nenhum outro usuário                                                                                           |
| Critério de êxito | - Renovação realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Alessandro Gomes Pereira |


| **Caso de teste**  | **CT-004 – Emprestimo de livros**  |
|:---: |:---: |
| Requisito associado | RF-04 - Emprestar livro. |
| Objetivo do teste | O usuário deve ser capaz de solicitar o emprestimo de um livro. |
| Passos | - Acessar o navegador <br> - Realizar login no sistema <br> -Na página inicial o usuário poderá ver todo o acervo <br> - Para solicitar o emprestimo do livro basta clicar no botão "Emprestimo"                                                                                           |
| Critério de êxito | - Emprestimo realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Alessandro Gomes Pereira |



| **Caso de teste**  | **CT-005 – Cadastro de usuários**  |
|:---: |:---: |
| Requisito associado | RF-05 - Cadastrar usuários. |
| Objetivo do teste | O sistema deve permitir que o usuário realize o cadastro. |
| Passos | - Acessar o navegador <br> - Na tela de login, clicar no botão "Criar conta usuário" <br> -Colocar todas as informaões necessarias para o cadastro |
| Critério de êxito | - Cadastro realizao com sucesso.                                                                             |
| Responsável pela elaboração do caso de teste | Alessandro Gomes Pereira |


