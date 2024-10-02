import React, { useState, useEffect } from 'react';
import styles from './meusLivros.module.css'; 

const livrosExemplo = [
  { id: 1, titulo: 'O Alquimista', autor: 'Paulo Coelho', lido: true, tipo: 'fisico' },
  { id: 2, titulo: '1984', autor: 'George Orwell', lido: true, tipo: 'virtual' },
  { id: 3, titulo: 'Dom Casmurro', autor: 'Machado de Assis', lido: false, tipo: 'fisico' },
  { id: 4, titulo: 'A Odisseia', autor: 'Homero', lido: true, tipo: 'virtual' },
  { id: 5, titulo: 'Senhor dos Anéis', autor: 'J.R.R. Tolkien', lido: false, tipo: 'emprestado', tipoFisicoVirtual: 'fisico', diasParaDevolucao: 5 },
  { id: 6, titulo: 'Harry Potter', autor: 'J.K. Rowling', lido: false, tipo: 'emprestado', tipoFisicoVirtual: 'virtual', diasParaDevolucao: 3 },
  { id: 7, titulo: 'Cem Anos de Solidão', autor: 'Gabriel Garcia Marquez', lido: false, tipo: 'reservado' }
];

const Acervo = () => {
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    setLivros(livrosExemplo);
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const livrosFiltrados = livros.filter((livro) => {
    if (filtro === 'todos') return true;
    if (filtro === 'fisicos') {
      return livro.tipo === 'fisico' || (livro.tipo === 'emprestado' && livro.tipoFisicoVirtual === 'fisico');
    }
    if (filtro === 'virtuais') {
      return livro.tipo === 'virtual' || (livro.tipo === 'emprestado' && livro.tipoFisicoVirtual === 'virtual');
    }
    if (filtro === 'emprestados') return livro.tipo === 'emprestado';
    if (filtro === 'reservados') return livro.tipo === 'reservado';
    if (filtro === 'lidos') return livro.lido;
    return true;
  });

  return (
    <div className={styles.acervoContainer}>
      {/* Barra lateral */}
      <div className={styles.sidebar}>
        <h2>Filtros</h2>
        <form>
          <div>
            <label>
              <input
                type="radio"
                name="filtro"
                value="todos"
                checked={filtro === 'todos'}
                onChange={handleFiltroChange}
              />
              Todos os livros
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="filtro"
                value="fisicos"
                checked={filtro === 'fisicos'}
                onChange={handleFiltroChange}
              />
              Físicos
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="filtro"
                value="virtuais"
                checked={filtro === 'virtuais'}
                onChange={handleFiltroChange}
              />
              Virtuais
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="filtro"
                value="emprestados"
                checked={filtro === 'emprestados'}
                onChange={handleFiltroChange}
              />
              Empréstimos
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="filtro"
                value="reservados"
                checked={filtro === 'reservados'}
                onChange={handleFiltroChange}
              />
              Reservados
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="filtro"
                value="lidos"
                checked={filtro === 'lidos'}
                onChange={handleFiltroChange}
              />
              Já lidos
            </label>
          </div>
        </form>
      </div>

      {/* Cards de Livros */}
      <div className={styles.cardContainer}>
        {livrosFiltrados.map((livro) => (
          <div key={livro.id} className={styles.card}>
            <div className={styles.cardImage}>
              <img src="https://via.placeholder.com/150" alt={`Capa do livro ${livro.titulo}`} />
            </div>
            <div className={styles.cardContent}>
              <h3>{livro.titulo}</h3>
              <p>{livro.autor}</p>
              {livro.tipo === 'emprestado' ? (
                <p>Faltam {livro.diasParaDevolucao} dias para devolver</p>
              ) : (
                <p>{livro.lido ? 'Já lido' : 'Ainda não lido'}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acervo;
