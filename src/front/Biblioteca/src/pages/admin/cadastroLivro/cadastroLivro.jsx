import Buttons from "../../../components/buttons/buttons";
import style from "../cadastroLivro/cadastroLivro.module.css";
import { useState } from "react";

export default function CadastroLivro() {
  const [nomeLivro, setNomeLivro] = useState("");
  const [autor, setAutor] = useState("");
  const [anoDoLivro, setAnoDoLivro] = useState("");
  const [edicao, setEdicao] = useState("");
  const [editora, setEditora] = useState("");
  const [descricao, setDescricao] = useState("");
  const [numeroPaginas, setNumeroPaginas] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [genero, setGenero] = useState("");
  const [capa, setCapa] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Livro cadastrado com sucesso!");
    // Aqui você pode adicionar a lógica para enviar os dados do livro para um servidor ou API.
  };

  return (
    <>
      <div className={style.mainForms}>
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

            <div className={style.doubleInputs}>
              <label htmlFor="quantidade">
                Quantidade
                <input
                  type="number"
                  name="quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </label>

              <label htmlFor="genero">
                Gênero
                <input
                  type="text"
                  name="genero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
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
                onChange={(e) => {
                  setCapa(e.target.files[0]);
                }}
              />
            </label>

            <div className={style.buttonCadastroLivro}>
              <Buttons title="Enviar" variant="info" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
