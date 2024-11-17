import React, { useEffect, useState } from "react";
import style from "../gerenciamentoAcervo/acervo.module.css";
import Card from "../../../components/card/card";
import Buttons from "../../../components/buttons/buttons";

export function Acervo() {
  const [livros, setLivros] = useState([]);
  const [filteredLivros, setFilteredLivros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [filtroAutor, setFiltroAutor] = useState("");
  const [filtroEditora, setFiltroEditora] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    autor: "",
    editora: "",
    quantidade: 0,
    capaUrl: "",
  });

  // Fetch inicial dos livros
  useEffect(() => {
    async function fetchLivros() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7016/livros", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        setLivros(data);
        setFilteredLivros(data);

        // Extraindo autores e editoras únicos
        const uniqueAutores = [...new Set(data.map((livro) => livro.autor))];
        const uniqueEditoras = [...new Set(data.map((livro) => livro.editora))];

        setAutores(uniqueAutores);
        setEditoras(uniqueEditoras);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }

    fetchLivros();
  }, []);

  // Função para filtrar livros
  const filtrarLivros = () => {
    const livrosFiltrados = livros.filter((livro) => {
      const tituloMatch = livro.titulo
        .toLowerCase()
        .includes(pesquisa.toLowerCase());
      const autorMatch = filtroAutor ? livro.autor === filtroAutor : true;
      const editoraMatch = filtroEditora
        ? livro.editora === filtroEditora
        : true;
      return tituloMatch && autorMatch && editoraMatch;
    });
    setFilteredLivros(livrosFiltrados);
  };

  // Atualiza os resultados ao mudar os filtros
  useEffect(() => {
    filtrarLivros();
  }, [pesquisa, filtroAutor, filtroEditora, livros]);

  // Função para editar um livro
  const handleEdit = (livro) => {
    setFormData(livro);
    setEditMode(true);
  };

  // Função para salvar as alterações
  
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`https://localhost:7016/livros/${formData.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error("Erro da API:", errorText);
        throw new Error(`Erro HTTP! Status: ${response.status} - ${errorText}`);
      }
  
      try {
        const data = await response.json();
        console.log("Resposta da API:", data);
      } catch (err) {
        console.log("Resposta não é JSON, mas foi bem-sucedida.");
      }
  
      alert("Livro atualizado com sucesso!");
      setEditMode(false);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error.message);
      alert("Não foi possível salvar as alterações. Verifique os dados e tente novamente.");
    }
  };
  

  // Função para remover um livro
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:7016/livros/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== id));
    } catch (error) {
      console.error("Erro ao remover livro:", error);
    }
  };

  return (
    <>
      <main className="content">
        <div className={style.filtrospesquisa}>
          <div className={style.pesquisa}>
            <div className={style.conteudopesquisa}>
              <div className={style.elemento}>
                <input
                  className={style.inputge}
                  type="text"
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                  placeholder="Pesquisar por título"
                />
              </div>
            </div>
          </div>
          <div className={style.filtros}>
            <div className={style.contentFiltros}>
              <select
                className={style.inputge}
                value={filtroEditora}
                onChange={(e) => setFiltroEditora(e.target.value)}
              >
                <option value="">Todas as Editoras</option>
                {editoras.map((editora, index) => (
                  <option key={index} value={editora}>
                    {editora}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.contentFiltros01}>
              <select
                className={style.inputge}
                value={filtroAutor}
                onChange={(e) => setFiltroAutor(e.target.value)}
              >
                <option value="">Todos os Autores</option>
                {autores.map((autor, index) => (
                  <option key={index} value={autor}>
                    {autor}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <section className={style.livros}>
          <h1 className={style.tConteudo}>Coleção</h1>
          <div className={style.content}>
            {filteredLivros.map((livro) => (
              <Card
                key={livro.id}
                img={livro.capaUrl}
                titulo={livro.titulo}
                autor={livro.autor}
                editora={livro.editora}
                qtd={livro.quantidade}
              >
                <Buttons
                  title="Atualizar"
                  variant="update"
                  onClick={() => handleEdit(livro)}
                />
                <Buttons
                  title="Remover"
                  variant="delete"
                  onClick={() => handleDelete(livro.id)}
                />
              </Card>
            ))}
          </div>
        </section>
      </main>
      {editMode && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h2>Editar Livro</h2>
            <label>Título:</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
            />
            <label>Autor:</label>
            <input
              type="text"
              value={formData.autor}
              onChange={(e) =>
                setFormData({ ...formData, autor: e.target.value })
              }
            />
            <label>Editora:</label>
            <input
              type="text"
              value={formData.editora}
              onChange={(e) =>
                setFormData({ ...formData, editora: e.target.value })
              }
            />
            <label>Quantidade:</label>
            <input
              type="number"
              value={formData.quantidade}
              onChange={(e) =>
                setFormData({ ...formData, quantidade: e.target.value })
              }
            />
            <button onClick={handleSave}>Salvar</button>
            <button onClick={() => setEditMode(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Acervo;
