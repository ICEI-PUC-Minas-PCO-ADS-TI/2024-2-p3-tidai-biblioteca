# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="04-Projeto-interface.md"> Projeto de interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](images/arquitetura.png)

## Diagrama de classes

O diagrama de classes ilustra graficamente a estrutura do software e como cada uma das classes estará interligada. Essas classes servem de modelo para materializar os objetos que serão executados na memória.

> **Links úteis**:
> - [Diagramas de classes - documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.7.0?topic=diagrams-class)
> - [O que é um diagrama de classe UML?](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

##  Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam realizar o cadastro de dados e os controles associados aos processos identificados, assim como suas recuperações.

Utilizando a notação do DER (Diagrama Entidade-Relacionamento), elabore um modelo, usando alguma ferramenta, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar também o controle de acesso dos usuários (partes interessadas nos processos) de acordo com os papéis definidos nos modelos do processo de negócio.

Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos.

### Modelo ER

O Modelo ER representa, por meio de um diagrama, como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

> **Links úteis**:
> - [Como fazer um diagrama entidade relacionamento](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

### Esquema relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 

![Exemplo de um modelo relacional](images/modelo_relacional.png "Exemplo de modelo relacional.")
---

> **Links úteis**:
> - [Criando um modelo relacional - documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/12.0.0?topic=designer-creating-relational-model)

### Modelo físico

Insira aqui o script de criação das tabelas do banco de dados.

Veja um exemplo:

```sql
CREATE DATABASE Biblioteca;

CREATE TABLE topicos (
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(255) NOT NULL,
descricao TEXT,
usuario_id INT,
data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE mensagens (
id INT AUTO_INCREMENT PRIMARY KEY,
topico_id INT,
mensagem_id INT NULL, -- Referencia uma mensagem anterior (resposta)
conteudo TEXT NOT NULL,
usuario_id INT,
data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (topico_id) REFERENCES topicos(id),
FOREIGN KEY (mensagem_id) REFERENCES mensagens(id),
FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE Usuarios (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
cpf CHAR(11) NOT NULL UNIQUE,
cep CHAR(8) NOT NULL,
rua VARCHAR(50) NOT NULL,
bairro VARCHAR(50) NOT NULL,
cidade VARCHAR(50) NOT NULL,
uf CHAR(2) NOT NULL,
numero_casa INT NOT NULL,
telefone VARCHAR(15) NOT NULL,
data_nascimento DATE,
senha VARCHAR(255) NOT NULL
);
create table Livros (
id int primary key auto_increment,
titulo varchar(255) not null,
autor varchar(100) not null,
editora varchar(50) not null,
edicao int not null,
numero_paginas bigint(10) not null,
genero varchar(255) not null,
quantidade int not null,
descricao text,
capa_url varchar(255) not null,
ano_livro date
);
create table Reservas(
id int primary key auto_increment,
usuario_id int,
livro_id int,
data_reserva date not null,
foreign key (usuario_id) references Usuarios(id),
foreign key (livro_id) references Livros(id)
);
create table Emprestimos(
id int primary key auto_increment,
usuario_id int,
livro_id int,
data_emprestimo date not null,
data_devolucao date not null,
status varchar(50) default 'Em dia',
foreign key (usuario_id) references Usuarios(id),
foreign key (livro_id) references Livros(id)
);

```
Esse script deverá ser incluído em um arquivo .sql na pasta [de scripts SQL](../src/db).


## Tecnologias

Descreva qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end      | HTML + CSS + JS + React |
| Back-end       | Node.js         |
| SGBD           | MySQL           |
| Deploy         | Vercel          |


## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foram realizados.

> **Links úteis**:
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando seu site no Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de software

A norma ISO/IEC 25010 é um padrão internacional que oferece um modelo de qualidade para produtos de software, estruturando-o em oito características e suas subcaracterísticas. Com base nesse modelo, nossa equipe selecionará algumas subcaracterísticas como referência para nortear o desenvolvimento do projeto, assegurando que o produto atenda aos requisitos de qualidade necessários. Abaixo, destaco as características e subcaracterísticas relevantes para o nosso projeto:

1-Funcionalidade:

Adequação Funcional: Garantia de que as funções oferecidas pelo software são apropriadas às necessidades dos usuários.
Acurácia Funcional: Precisão dos resultados e informações fornecidas pelo sistema.

2-Confiabilidade:

Maturidade: Capacidade do software de minimizar falhas e interrupções.
Disponibilidade: Garantia de que o sistema estará operacional e acessível quando necessário.

3-Usabilidade:

Aprendizagem: Facilidade com que novos usuários podem aprender a usar o sistema.
Acessibilidade: Recursos e funcionalidades que garantem a acessibilidade para diferentes tipos de usuários.

4-Eficiência de Desempenho:

Tempo de Resposta: Tempo necessário para o sistema responder às ações do usuário.
Utilização de Recursos: Capacidade do software de operar sem sobrecarregar o hardware.

5-Segurança:

Confidencialidade: Proteção dos dados de acesso não autorizado.
Integridade: Proteção contra modificações não autorizadas e controle de versão de dados.

6-Compatibilidade:

Interoperabilidade: Capacidade de integração e comunicação com outros sistemas.
Coexistência: Capacidade de coexistir com outros produtos, sem interferência.

7-Manutenibilidade:

Modularidade: Facilidade de alterar ou modificar partes do sistema sem afetar o todo.
Analisabilidade: Capacidade de diagnosticar problemas e de prever o impacto das mudanças.

8-Portabilidade:

Adaptabilidade: Flexibilidade do sistema para ser usado em diferentes ambientes.
Instalabilidade: Facilidade e velocidade com que o sistema pode ser instalado em diferentes dispositivos.
Essas subcaracterísticas servirão como base para avaliar e orientar o desenvolvimento de nosso projeto, visando a construção de um software robusto, confiável e adaptado às necessidades do usuário final.
