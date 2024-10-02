import React from "react";
import style from "../gerenciamentoAcervo/acervo.module.css";
import Card from "../../../components/card/card";
import Buttons from "../../../components/buttons/buttons";



export function Acervo() {
  const livros = [
    {
      id: 1,
      titulo: "O Alquimista",
      autor: "Paulo Coelho",
      editora: "A Girafa",
      lido: true,
      tipo: "fisico",
      img: "https://a-static.mlcdn.com.br/800x560/livro-o-alquimista/magazineluiza/222802300/37882f0e29de6fbea589fc2b31a26907.jpg",
      qtd: 4,
    },
    {
      id: 2,
      titulo: "1984",
      autor: "George Orwell",
      editora: "Agir",
      lido: true,
      tipo: "virtual",
      img: "https://cdl-static.s3-sa-east-1.amazonaws.com/covers/gg/9788535932966/1984-edicao-especial.jpg",
      qtd: 4,
    },
    {
      id: 3,
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      editora: "Alameda Editorial",
      lido: false,
      tipo: "fisico",
      img: "https://http2.mlstatic.com/D_NQ_NP_996781-MLB49524854253_032022-O.webp",
      qtd: 4,
    },
    {
      id: 4,
      titulo: "A Odisseia",
      autor: "Homero",
      editora: "Alta Life",
      lido: true,
      tipo: "virtual",
      img: "https://a-static.mlcdn.com.br/800x560/livro-odisseia/livrariamartinsfontespaulista/807086/2cd1e0e81b20cf1284ca775d1d0c0ca7.jpg",
      qtd: 4,
    },
    {
      id: 5,
      titulo: "Senhor dos Anéis",
      autor: "J.R.R. Tolkien",
      editora: "Academia",
      lido: false,
      tipo: "emprestado",
      tipoFisicoVirtual: "fisico",
      img: "https://th.bing.com/th/id/OIP.9-531jr1Sn12ZHvLtivqhQHaK_?rs=1&pid=ImgDetMain",
      qtd: 4,
    },
    {
      id: 6,
      titulo: "Harry Potter",
      autor: "J.K. Rowling",
      editora: "Acess Editora",
      lido: false,
      tipo: "emprestado",
      tipoFisicoVirtual: "virtual",
      img: "https://i.pinimg.com/originals/b8/7a/d7/b87ad786fe9ed85d25715be4f942fc23.jpg",
      qtd: 4,
    },
  ];

  return (
    <>
      <main className="content">
        <div className={style.filtrospesquisa}>
          <div className={style.pesquisa}>
            <div className={style.conteudopesquisa}>
              <div className={style.elemento}>
                <input className={style.inputge} type="text" required></input>
                <div className={style.label}>Pesquisar</div>
              </div>
            </div>
          </div>
          <div className={style.filtros}>
            <div className={style.conteudofiltros}>
              <div className={style.generos}>Romance</div>
              <div className={style.generos}>Ciência</div>
              <div className={style.generos}>Terror</div>
              <div className={style.generos}>Classicos</div>
              <div className={style.generos}>Ficção Cientifica</div>
              <a scr="src/pages/default/foruns.jsx"></a>
            </div>
          </div>
        </div>
        <section className={style.livros}>
          <h1 className={style.tConteudo}>Coleção</h1>
          <div className={style.content}>
            {livros.map((livros) =>(
              <>
             <Card
              img={livros.img}
              titulo={livros.titulo}
              autor={livros.autor}
              editora={livros.editora}
              qtd={livros.qtd}
              > 
              <Buttons title='Atualizar' variant='update'/>
              <Buttons title='Remover' variant='delete'/>

              </Card>
              </>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Acervo;
