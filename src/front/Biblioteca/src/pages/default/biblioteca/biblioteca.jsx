import React, { useState, useEffect } from 'react';
import styles from './biblioteca.module.css';
import Card from '../../../components/card/card';
import Buttons from '../../../components/buttons/buttons';
import BarraDePesquisa from '../../../components/barraPesquisa/barraPesquisa';

const LivrosComFiltro = () => {
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [selectedAutores, setSelectedAutores] = useState([]);
  const [selectedEditoras, setSelectedEditoras] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchLivros() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7016/livros", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        setLivros(data);

        const uniqueAutores = [...new Set(data.map(livro => livro.autor))];
        const uniqueEditoras = [...new Set(data.map(livro => livro.editora))];
        setAutores(uniqueAutores);
        setEditoras(uniqueEditoras);

      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }
    fetchLivros();
  }, []);

  const toggleAutor = (autor) => {
    setSelectedAutores((prev) => 
      prev.includes(autor) ? prev.filter(a => a !== autor) : [...prev, autor]
    );
  };

  const toggleEditora = (editora) => {
    setSelectedEditoras((prev) => 
      prev.includes(editora) ? prev.filter(e => e !== editora) : [...prev, editora]
    );
  };

  const livrosFiltrados = livros.filter((livro) => {
    const autorMatch = selectedAutores.length === 0 || selectedAutores.includes(livro.autor);
    const editoraMatch = selectedEditoras.length === 0 || selectedEditoras.includes(livro.editora);
    const searchMatch = livro.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    return autorMatch && editoraMatch && searchMatch;
  });

  return (
    <div className={styles.livrosComFiltroContainer}>
      <h1 className={styles.titulo}>Bem-vindo</h1>
      <div className={styles.barraDePesquisa}>
        <BarraDePesquisa value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <h3 className={styles.tituloFiltro}>Autores</h3>
          <div>
            {autores.map((autor) => (
              <div key={autor}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedAutores.includes(autor)}
                    onChange={() => toggleAutor(autor)}
                  />
                  {autor}
                </label>
              </div>
            ))}
          </div>

          <h3 className={styles.tituloFiltro}>Editoras</h3>
          <div>
            {editoras.map((editora) => (
              <div key={editora}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedEditoras.includes(editora)}
                    onChange={() => toggleEditora(editora)}
                  />
                  {editora}
                </label>
              </div>
            ))}
          </div>
        </div>

        {livrosFiltrados.map((livro) => (
          <Card
            key={livro.id}
            img={livro.capaUrl} 
            titulo={livro.titulo}
            autor={livro.autor}
            editora={livro.editora}
            qtd={livro.quantidade}
          >
            <Buttons title='Ver mais' variant='info' />
            <Buttons title='Reservar' variant='confirmacao' />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LivrosComFiltro;
