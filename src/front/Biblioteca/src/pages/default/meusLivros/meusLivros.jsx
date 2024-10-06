import React, { useState, useEffect } from 'react';
import styles from './meusLivros.module.css'; 
import Card from '../../../components/card/card'; 
import Buttons from '../../../components/buttons/buttons';

const livrosExemplo = [
  { id: 1, titulo: 'O Alquimista', autor: 'Paulo Coelho', editora: 'A Girafa', lido: true, tipo: 'fisico', img: 'https://a-static.mlcdn.com.br/800x560/livro-o-alquimista/magazineluiza/222802300/37882f0e29de6fbea589fc2b31a26907.jpg' },
  { id: 2, titulo: '1984', autor: 'George Orwell', editora: 'Agir', lido: true, tipo: 'virtual', img: 'https://cdl-static.s3-sa-east-1.amazonaws.com/covers/gg/9788535932966/1984-edicao-especial.jpg' },
  { id: 3, titulo: 'Dom Casmurro', autor: 'Machado de Assis', editora: 'Alameda Editorial', lido: false, tipo: 'fisico', tipo: 'reservado', img: 'https://http2.mlstatic.com/D_NQ_NP_996781-MLB49524854253_032022-O.webp' },
  { id: 4, titulo: 'A Odisseia', autor: 'Homero', lido: true, editora: 'Alta Life', tipo: 'virtual', img: 'https://a-static.mlcdn.com.br/800x560/livro-odisseia/livrariamartinsfontespaulista/807086/2cd1e0e81b20cf1284ca775d1d0c0ca7.jpg' },
  { id: 5, titulo: 'Senhor dos Anéis', autor: 'J.R.R. Tolkien', lido: false, tipo: 'emprestado', diasParaDevolucao: 5, img: 'https://th.bing.com/th/id/OIP.9-531jr1Sn12ZHvLtivqhQHaK_?rs=1&pid=ImgDetMain' },
  { id: 6, titulo: 'Harry Potter', autor: 'J.K. Rowling', editora: 'Academia', lido: false, tipo: 'emprestado', diasParaDevolucao: 3, img: 'https://i.pinimg.com/originals/b8/7a/d7/b87ad786fe9ed85d25715be4f942fc23.jpg' },
  { id: 7, titulo: 'Cem Anos de Solidão', autor: 'Gabriel Garcia Marquez', editora:'Record', lido: false, tipo: 'reservado', img: 'https://m.media-amazon.com/images/I/81SQPrWU7SL._AC_UF1000,1000_QL80_.jpg' }
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
    if (filtro === 'emprestimos') return livro.tipo === 'emprestado';
    if (filtro === 'reservado') return livro.tipo === 'reservado';
    if (filtro === 'lido') return livro.lido;
    return false;
  });

  return (
    
    
    <div className={styles.acervoContainer}>
    
      <div className={styles.sidebar}>
        <h2>Filtros</h2>
        <form>
          {['todos', 'emprestimos', 'reservado', 'lido'].map(tipo => (
            <div key={tipo}>
              <label>
                <input
                  type="radio"
                  name="filtro"
                  value={tipo}
                  checked={filtro === tipo}
                  onChange={handleFiltroChange}
                />
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)} 
              </label>
            </div>
          ))}
        </form>
      </div>

      
      <div className={styles.cardContainer}>
        {livrosFiltrados.length === 0 ? (
          <p>Nenhum livro encontrado.</p>
        ) : (
          livrosFiltrados.map((livro) => (
            <Card key={livro.id} img={livro.img} titulo={livro.titulo} autor={livro.autor} editora={livro.editora}>
              <p>{livro.tipo === 'emprestado' ? `Faltam ${livro.diasParaDevolucao} dias para devolver` : (livro.lido ? 'Já lido' : 'Reservado')}</p>
              <Buttons title='Ver mais' variant='info' />
              {livro.tipo === 'emprestado' && <Buttons title='Devolver' variant='confirmacao' />}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Acervo;
