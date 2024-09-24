import React, { useState, useEffect } from 'react';
import styles from './meusLivros.module.css'; 

const livrosExemplo = [
  { id: 1, titulo: 'O Alquimista', autor: 'Paulo Coelho', disponivel: true, tipo: 'fisico' },
  { id: 2, titulo: '1984', autor: 'George Orwell', disponivel: true, tipo: 'virtual' },
  { id: 3, titulo: 'Dom Casmurro', autor: 'Machado de Assis', disponivel: false, tipo: 'fisico' },
  { id: 4, titulo: 'A Odisseia', autor: 'Homero', disponivel: true, tipo: 'virtual' },
  { id: 5, titulo: 'Senhor dos Anéis', autor: 'J.R.R. Tolkien', disponivel: false, tipo: 'emprestado', tipoFisicoVirtual: 'fisico' },
  { id: 6, titulo: 'Harry Potter', autor: 'J.K. Rowling', disponivel: false, tipo: 'emprestado', tipoFisicoVirtual: 'virtual' }
];

const Acervo = () => {
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // Estado para armazenar o filtro selecionado

  useEffect(() => {
    // Simulação de busca de livros (pode ser substituído por uma chamada de API)
    setLivros(livrosExemplo);
  }, []);

  // Função para lidar com a mudança de filtro
  const handleFiltroChange = (e) => {
    setFiltro(e.target.value); // Atualiza o filtro com o valor selecionado
  };

  // Função para filtrar os livros de acordo com o filtro selecionado
  const livrosFiltrados = livros.filter((livro) => {
    if (filtro === 'todos') return true;
    if (filtro === 'fisicos') {
      return livro.tipo === 'fisico' || (livro.tipo === 'emprestado' && livro.tipoFisicoVirtual === 'fisico');
    }
    if (filtro === 'virtuais') {
      return livro.tipo === 'virtual' || (livro.tipo === 'emprestado' && livro.tipoFisicoVirtual === 'virtual');
    }
    if (filtro === 'emprestados') return livro.tipo === 'emprestado';
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
              Emprestados
            </label>
          </div>
        </form>
      </div>

      {/* Cards de Livros */}
      <div className={styles.cardContainer}>
        {livrosFiltrados.map((livro) => (
          <div key={livro.id} className={styles.card}>
            <div className={styles.cardImage}>
              {/* Imagem genérica do livro */}
              <img src="https://via.placeholder.com/150" alt={`Capa do livro ${livro.titulo}`} />
            </div>
            <div className={styles.cardContent}>
              <h3>{livro.titulo}</h3>
              <p>{livro.autor}</p>
              <p>{livro.disponivel ? 'Disponível' : 'Indisponível'}</p>
              <button className={styles.editButton}>Editar Livro</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acervo;
