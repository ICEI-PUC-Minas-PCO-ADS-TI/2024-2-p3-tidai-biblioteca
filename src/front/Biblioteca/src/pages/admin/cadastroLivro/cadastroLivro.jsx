import style from '../cadastroLivro/cadastroLivro.module.css';
import { useState } from 'react';

export default function CadastroLivro() {
  const [nomeLivro, setNomeLivro] = useState('');
  const [autor, setAutor] = useState('');
  const [anoDoLivro, setAnoDoLivro] = useState('');
  const [edicao, setEdicao] = useState('');
  const [editora, setEditora] = useState('');
  const [descricao, setDescricao] = useState('');
  const [numeroPaginas, setNumeroPaginas] = useState('');
  const [capa, setCapa] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Livro cadastrado com sucesso!');
  };

  return (
    <div className={style.containerForms}>
      <p className={style.titleForm}>Cadastro de Livro</p>
      <form onSubmit={handleSubmit}>
        
        <div className={style.doubleInputs}>
              <label htmlFor="nomeLivro">
                Nome
                <input
                  type="text"
                  name="nomeLivro"
                  value={nomeLivro}
                  onChange={(e) => setNomeLivro(e.target.value)}
                />
              </label>

              <label htmlFor="autor">
                Autor
                <input
                  type="text"
                  name="autor"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />
              </label> 
        </div>
       
        <div className={style.doubleInputs}>
              <label htmlFor="anoDoLivro">
                Ano do Livro
                <input
                  type="number"
                  name="anoDoLivro"
                  value={anoDoLivro}
                  onChange={(e) => setAnoDoLivro(e.target.value)}
                />
              </label>

              <label htmlFor="edicao">
                Edição
                <input
                  type="text"
                  name="edicao"
                  value={edicao}
                  onChange={(e) => setEdicao(e.target.value)}
                />
              </label>
        </div>

        <div className={style.doubleInputs}>
              <label htmlFor="editora">
                Editora
                <input
                  type="text"
                  name="editora"
                  value={editora}
                  onChange={(e) => setEditora(e.target.value)}
                />
              </label>

              <label htmlFor="numeroPaginas">
                Número de Páginas
                <input
                  type="number"
                  name="numeroPaginas"
                  value={numeroPaginas}
                  onChange={(e) => setNumeroPaginas(e.target.value)}
                />
              </label>
        </div>
        <label htmlFor="descricao">
                Descrição
                <textarea
                  name="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </label>

              <label htmlFor="capa">
                Capa do Livro
                <input
                  type="file"
                  accept="image/*"
                  name="capa"
                  onChange={e => {setCapa(e.target.value)}}
                />
              </label>

           <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}