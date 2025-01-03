# Arquitetura da solução

Para a arquitetura do sistema web de gerenciamento de biblioteca, projetamos um ambiente capaz de atender múltiplos usuários com uma aplicação leve e acessível pela internet. A seguir, detalhamos a arquitetura, os componentes principais e a infraestrutura de rede e hardware.

Arquitetura da Aplicação:

O frontend foi desenvolvido utilizando o React, com suporte de JavaScript, CSS e HTML para a interface de usuário. O React permite que o sistema seja modular, reativo e com uma experiência de usuário responsiva, enquanto o CSS e HTML são utilizados para estilizar e estruturar a interface visual.
O backend foi implementado em ASP.NET Core, que fornece uma API RESTful para que o frontend se comunique com o banco de dados. A API é documentada e testada utilizando o Swagger, permitindo fácil visualização dos endpoints disponíveis e simplificando a manutenção. O backend gerencia a lógica de negócios, autenticação e integrações de dados.

Banco de Dados:

Para o armazenamento dos dados, utilizamos o MySQL, que é escalável e compatível com aplicações de grande volume. O banco de dados armazena todas as informações necessárias, incluindo dados de usuários, livros, empréstimos e reservas.

Hospedagem:

Toda a aplicação será hospedada em um ambiente com suporte à web, permitindo que os usuários acessem o sistema de qualquer lugar pela internet. O serviço pode ser configurado em um servidor cloud (AWS, Azure ou DigitalOcean) ou em um servidor dedicado, com HTTPS para segurança de dados e um balanceamento de carga para otimizar o desempenho.

Infraestrutura de Rede e Hardware

Servidor de Aplicação (Frontend e Backend):

CPU: Processador Intel Xeon E3/E5 ou AMD EPYC com pelo menos 4 núcleos.
Memória RAM: 8 GB (mínimo) a 16 GB (para carga mais elevada).
Armazenamento: SSD de 128 GB para armazenamento rápido, com backup diário automático.
Sistema Operacional: Linux (Ubuntu ou CentOS) ou Windows Server, dependendo do suporte ao ASP.NET.
Outros: Servidor com acesso SSH para gerenciamento remoto e configuração de balanceamento de carga, caso haja picos de acessos simultâneos.
Servidor de Banco de Dados (MySQL):

CPU: Processador Intel Xeon com pelo menos 4 núcleos.
Memória RAM: 16 GB para garantir boa resposta em consultas simultâneas.
Armazenamento: SSD de 256 GB ou mais, para desempenho nas operações de leitura/escrita.
Sistema Operacional: Linux (por sua performance com MySQL).
Segurança: Configuração de acesso restrito por IP e replicação de dados em tempo real para um servidor secundário.

Infraestrutura de Rede

Switches: Um switch gerenciável de 24 portas Gigabit Ethernet para alta velocidade de transmissão entre servidores e outros dispositivos.
Roteador: Roteador com VPN integrada para comunicação segura com a infraestrutura interna.
Firewall: Um firewall de camada de aplicação com detecção de intrusões (IPS), proteção contra ataques DDoS e políticas de segurança que restrinjam o acesso apenas às portas necessárias, como 80/443 (HTTP/HTTPS) para a aplicação web e 3306 para o banco de dados, acessível apenas pela rede interna.

Máquinas Cliente

CPU: Processador Dual Core (Intel Core i3 ou AMD equivalente).
Memória RAM: 4 GB (mínimo).
Sistema Operacional: Windows, macOS ou Linux, com navegador compatível (Chrome, Firefox, Edge).
Navegador: De preferência atualizado, compatível com PWA (Progressive Web App) para que o sistema funcione como um aplicativo web moderno.

Comunicação entre os Componentes
   
A comunicação entre o frontend (React) e o backend (ASP.NET) se dá via API REST, com o Swagger documentando todos os endpoints para fácil integração e testes. O backend realiza as operações CRUD (Create, Read, Update, Delete) no banco de dados MySQL, onde os dados dos usuários e livros são armazenados. Todo o tráfego entre frontend e backend é protegido por HTTPS.

Segurança e Backup
   
A segurança é reforçada com SSL/TLS para a comunicação externa. A autenticação de usuários utiliza tokens JWT (JSON Web Tokens) para sessões seguras. Há também um sistema de backup automatizado configurado no servidor de banco de dados e no servidor de aplicação para garantir a recuperação de dados em caso de falhas.

Essa infraestrutura garante que o sistema seja robusto, seguro e escalável, atendendo à demanda dos usuários com eficiência e segurança, enquanto o hardware e a rede garantem um desempenho consistente e seguro.



##  Modelo de dados

Este modelo de dados representa uma estrutura de banco de dados para uma aplicação de gerenciamento de fórum e biblioteca, composta por seis tabelas principais: Usuarios, Topicos, Mensagens, Livros, Reservas e Emprestimos.

Usuarios: Contém informações dos usuários, como id, nome, email, cpf, endereço (detalhado por campos como cep, rua, bairro, etc.), data_nascimento, telefone e senha. Cada usuário possui um identificador único (id) e outras restrições de unicidade para os campos email e cpf.

Topicos: Armazena tópicos de discussão no fórum, com campos para id, titulo, descricao, usuario_id (que referencia o usuário que criou o tópico) e data_criacao (registrada automaticamente com o horário de criação). A relação com a tabela Usuarios é feita pelo campo usuario_id, como chave estrangeira.

Mensagens: Armazena mensagens dentro dos tópicos, com um id único, conteudo da mensagem, usuario_id (quem postou a mensagem), topico_id (tópico ao qual pertence) e data_criacao. Além disso, mensagem_id permite referenciar outra mensagem, criando uma estrutura hierárquica para respostas. A tabela utiliza chaves estrangeiras para os campos usuario_id, topico_id e mensagem_id.

Livros: Tabela destinada ao armazenamento de informações sobre os livros, incluindo id, titulo, autor, editora, edicao, numero_paginas, genero, quantidade disponível, descricao, capa_url (link da capa) e ano_livro (data de publicação).

Reservas: Registra as reservas de livros pelos usuários. Inclui id, usuario_id, livro_id e data_reserva. As chaves estrangeiras usuario_id e livro_id referenciam, respectivamente, as tabelas Usuarios e Livros.

Emprestimos: Registra os empréstimos de livros, contendo id, usuario_id, livro_id, data_emprestimo, data_devolucao e status (com o valor padrão “Em dia”). Assim como na tabela de reservas, usuario_id e livro_id referenciam as tabelas de Usuarios e Livros.

Esse modelo permite a organização de um sistema de fórum e biblioteca, com controle de usuários, tópicos, mensagens hierárquicas, além do gerenciamento de livros, reservas e empréstimos.

### Modelo ER

### Esquema relacional

![ER](images/DataBase.PNG).


### Modelo físico

Script utilizado na criação do banco de dados:

```sql
CREATE TABLE Categoria (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL
);

CREATE TABLE Livro (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Título VARCHAR(255) NOT NULL,
    Autor VARCHAR(255) NOT NULL,
    ISBN VARCHAR(20) NOT NULL UNIQUE,
    Ano_Publicação INT,
    ID_Categoria INT,
    FOREIGN KEY (ID_Categoria) REFERENCES Categoria(ID)
);

CREATE TABLE Usuário (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Telefone VARCHAR(20),
    Data_Registro DATE
);

CREATE TABLE Empréstimo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Data_Empréstimo DATE NOT NULL,
    Data_Devolução DATE,
    ID_Usuário INT,
    ID_Livro INT,
    FOREIGN KEY (ID_Usuário) REFERENCES Usuário(ID),
    FOREIGN KEY (ID_Livro) REFERENCES Livro(ID)
);
```

## Tecnologias


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end      | HTML + CSS + JS + React |
| Back-end       | Node.js         |
| SGBD           | MySQL           |
| Deploy         | Vercel          |


## Hospedagem

Para hospedar uma API ASP.NET com Swagger no GitHub Pages, consideramos que o GitHub Pages serve apenas conteúdo estático, como HTML, CSS e JavaScript, enquanto a API ASP.NET normalmente requer um servidor backend para executar operações no lado do servidor. No entanto, encontramos uma maneira de simular a documentação interativa da API com Swagger no GitHub Pages, onde podemos mostrar as definições da API de forma prática.

Primeiro, configuramos o Swagger no projeto ASP.NET para gerar um arquivo de especificação da API em JSON. O Swagger cria uma interface gráfica útil para documentar e testar a API, e essa interface pode ser exportada para uso estático. Com o Swagger UI, geramos uma versão estática em HTML da documentação da API.

Com os arquivos HTML estáticos prontos, criamos um repositório no GitHub para hospedar essa documentação. Colocamos os arquivos gerados na raiz do repositório, mas também poderíamos ter usado uma pasta "docs" para isso. Em seguida, ativamos o GitHub Pages nas configurações do repositório, definindo o branch principal ou a pasta "docs" como a fonte de publicação. Assim, o GitHub Pages gera automaticamente um link para acessar a documentação, permitindo que os usuários explorem todos os endpoints disponíveis e visualizem exemplos de requisições e respostas diretamente na interface do Swagger UI.

Essa solução funciona bem para exibir uma visão geral dos endpoints e da estrutura da API, mas como o GitHub Pages não oferece suporte para execução de backends, as chamadas reais para os endpoints da API não funcionam. Para que os usuários possam testar a API de forma completa, seria necessário hospedá-la em outro serviço de nuvem, como Azure ou AWS, e então vincular o Swagger para acessar essa instância online da API. Dessa forma, a interface do Swagger UI no GitHub Pages proporciona uma experiência completa de documentação e interação, enquanto a API real fica hospedada externamente.

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
