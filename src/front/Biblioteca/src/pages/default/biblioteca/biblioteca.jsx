import React, { useState, useEffect } from 'react';
import styles from './biblioteca.module.css';
import Card from '../../../components/card/card';
import Buttons from '../../../components/buttons/buttons';

const livrosExemplo = [
  { id: 1, titulo: 'O Alquimista', autor: 'Paulo Coelho', editora: 'A Girafa', lido: true, tipo: 'fisico', img:'https://a-static.mlcdn.com.br/800x560/livro-o-alquimista/magazineluiza/222802300/37882f0e29de6fbea589fc2b31a26907.jpg' ,qtd: 4 },
  { id: 2, titulo: '1984', autor: 'George Orwell', editora: 'Agir', lido: true, tipo: 'virtual' , img:'https://cdl-static.s3-sa-east-1.amazonaws.com/covers/gg/9788535932966/1984-edicao-especial.jpg', qtd: 4},
  { id: 3, titulo: 'Dom Casmurro', autor: 'Machado de Assis', editora: 'Alameda Editorial', lido: false, tipo: 'fisico' , img:'https://http2.mlstatic.com/D_NQ_NP_996781-MLB49524854253_032022-O.webp', qtd: 4},
  { id: 4, titulo: 'A Odisseia', autor: 'Homero', editora: 'Alta Life', lido: true, tipo: 'virtual' , img:'https://a-static.mlcdn.com.br/800x560/livro-odisseia/livrariamartinsfontespaulista/807086/2cd1e0e81b20cf1284ca775d1d0c0ca7.jpg', qtd: 4 },
  { id: 5, titulo: 'Senhor dos Anéis', autor: 'J.R.R. Tolkien', editora: 'Academia', lido: false, tipo: 'emprestado', tipoFisicoVirtual: 'fisico' , img:'https://th.bing.com/th/id/OIP.9-531jr1Sn12ZHvLtivqhQHaK_?rs=1&pid=ImgDetMain', qtd: 4 },
  { id: 6, titulo: 'Harry Potter', autor: 'J.K. Rowling', editora: 'Acess Editora', lido: false, tipo: 'emprestado', tipoFisicoVirtual: 'virtual' , img:'https://i.pinimg.com/originals/b8/7a/d7/b87ad786fe9ed85d25715be4f942fc23.jpg', qtd: 4 }
]

// Lista de autores e editoras
const autores = [
  'Paulo Coelho',
  'George Orwell',
  'Machado de Assis',
  'Homero',
  'J.R.R. Tolkien',
  'J.K. Rowling',
];

const editoras = [
  'A Girafa',
  'Agir',
  'Alameda Editorial',
  'Alta Life',
  'Academia',
  'Acess Editora',
];

const LivrosComFiltro = () => {
  const [livros, setLivros] = useState([]);
  const [selectedAutores, setSelectedAutores] = useState([]);
  const [selectedEditoras, setSelectedEditoras] = useState([]);

  useEffect(() => {
    // Simulação de busca de livros (pode ser substituído por uma chamada de API)
    setLivros(livrosExemplo);
  }, []);

  // Função para alternar seleção de autor
  const toggleAutor = (autor) => {
    setSelectedAutores((prev) => 
      prev.includes(autor) ? prev.filter(a => a !== autor) : [...prev, autor]
    );
  };

  // Função para alternar seleção de editora
  const toggleEditora = (editora) => {
    setSelectedEditoras((prev) => 
      prev.includes(editora) ? prev.filter(e => e !== editora) : [...prev, editora]
    );
  };

  // Função para filtrar os livros
  const livrosFiltrados = livros.filter((livro) => {
    const autorMatch = selectedAutores.length === 0 || selectedAutores.includes(livro.autor);
    const editoraMatch = selectedEditoras.length === 0 || selectedEditoras.includes(livro.editora);
    return autorMatch && editoraMatch;
  });

  return (
    <div className={styles.livrosComFiltroContainer}>
      {/* Título do Acervo */}
      <h1 className={styles.titulo}>Bem-vindo</h1>

      <div className={styles.content}>
        {/* Barra lateral com filtros */}
        <div className={styles.sidebar}>
          
          <h3 className={styles.tituloFiltro}>Autores</h3>
          <div className={styles.tituloFiltro}>
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

        {/* Cards de Livros */}
            {livrosFiltrados.map((livros)=>(
              <>
              <Card
              img={livros.img}
              titulo={livros.titulo}
              autor={livros.autor}
              editora={livros.editora}
              qtd={livros.qtd}
              > 
              <Buttons title='Ver mais' variant='info'/>
              <Buttons title='Reservar' variant='confirmacao'/>

              </Card>
             
              </>
            ))}
        
      </div>
    </div>
  );
};

export default LivrosComFiltro;