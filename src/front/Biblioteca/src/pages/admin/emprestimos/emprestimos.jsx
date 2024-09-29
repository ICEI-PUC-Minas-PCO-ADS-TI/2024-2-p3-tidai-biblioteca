import style from '../emprestimos/emprestimos.module.css'
import React from 'react';


export default function Emprestimos (){
    return(
        <>
        <form className={style.search}>
         <div className={style.searchem}>
            <input className={style.inputem} type='search' placeholder='Pesquisar'></input>
         </div>
         </form>
        <h1 class className={style.tituloEm}>Histórico</h1>
        

         <main className={style.livrosEm}>

            <div className={style.conteudoEm}>

         <div className={style.livroEm}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivroEm}></img>
        <h3 className={style.tituloliEm}>Harry Potter e a pedra fisolofal</h3>
        <h4 className={style.tempoEm}>Tempo restante: 2 dias</h4>
        </div>

        <div className={style.livroEm}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivroEm}></img>
        <h3 className={style.tituloliEm}>Harry Potter e a pedra fisolofal</h3>
        <h4 className={style.tempoEm}>Tempo restante: 2 dias</h4>
        </div>

        <div className={style.livroEm}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivroEm}></img>
        <h3 className={style.tituloliEm}>Harry Potter e a pedra fisolofal</h3>
        <h4 className={style.tempoEm}>Tempo restante: 2 dias</h4>
        </div>

        <div className={style.livroEm}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivroEm}></img>
        <h3 className={style.tituloliEm}>Harry Potter e a pedra fisolofal</h3>
        <h4 className={style.tempoEm}>Tempo restante: 2 dias</h4>
        </div>

        <div className={style.livroEm}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivroEm}></img>
        <h3 className={style.tituloliEm}>Harry Potter e a pedra fisolofal</h3>
        <h4 className={style.tempoEm}>Tempo restante: 2 dias</h4>
        </div>

        <div className={style.livroEm}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivroEm}></img>
        <h3 className={style.tituloliEm}>Harry Potter e a pedra fisolofal</h3>
        <h4 className={style.tempoEm}>Tempo restante: 2 dias</h4>
        </div>

        <div className={style.livroEm}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivroEm}></img>
        <h3 className={style.tituloliEm}>Harry Potter e a pedra fisolofal</h3>
        <h4 className={style.tempoEm}>Tempo restante: 2 dias</h4>
        </div>

        <div className={style.livroEm}>
        <img src="src/pages/admin/gerenciamentoAcervo/HarryPotter.jpg" className={style.imglivroEm}></img>
        <h3 className={style.tituloliEm}>Harry Potter e a pedra fisolofal</h3>
        <h4 className={style.tempoEm}>Tempo restante: 2 dias</h4>
        </div>

        </div>


         </main>
        </>

    )
}

