import React from "react"; 
import style from '../gerenciamentoAcervo/acervo.module.css';

export function Acervo() {
  return (
    <>
      <main className='content'>
      <div className={style.filtrospesquisa}>
        <div className={style.pesquisa}>
          <div className={style.conteudopesquisa}>
            <div className={style.elemento}>
              <input className={style.inputge} type='text' required></input>
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
        <div className={style.livro}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivro}></img>
        <button className={style.edit}>Editar</button>
        </div>

        <div className={style.livro}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivro}></img>
        <button className={style.edit}>Editar</button>
        </div>

        <div className={style.livro}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivro}></img>
        <button className={style.edit}>Editar</button>
        </div>


        <div className={style.livro}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivro}></img>
        <button className={style.edit}>Editar</button>
        </div>

        <div className={style.livro}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivro}></img>
        <button className={style.edit}>Editar</button>
        </div>

        <div className={style.livro}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivro}></img>
        <button className={style.edit}>Editar</button>
        </div>

        <div className={style.livro}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivro}></img>
        <button className={style.edit}>Editar</button>
        </div>

        <div className={style.livro}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivro}></img>
        <button className={style.edit}>Editar</button>
        </div>
        
        </div>
        </section>
      </main>
      
    </>
  );
}

export default Acervo;
