import Buttons from "../../../components/buttons/buttons";
import style from "../cadastroLivro/cadastroLivro.module.css";
import { useState } from "react";
import { mostrarSucesso, mostrarErro } from '../../../components/notificacao/notificacao.jsx';
import Notificacao from '../../../components/notificacao/notificacao.jsx';

export default function CadastroLivro() {
  const [formData, setFormData] = useState({
    nomeLivro: '',
    autor: '',
    anoDoLivro: '',
    edicao: '',
    editora: '',
    descricao: '',
    numeroPaginas: '',
    quantidade: '',
    genero: '',
    capa: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!formData.nomeLivro || !formData.autor || !formData.editora || !formData.genero || !formData.capa) {
      mostrarErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    console.log('Dados enviados:', {
      titulo: formData.nomeLivro,
      autor: formData.autor,
      editora: formData.editora,
      edicao: Number(formData.edicao),
      numeroPaginas: Number(formData.numeroPaginas),
      quantidade: Number(formData.quantidade),
      genero: formData.genero,
      descricao: formData.descricao,
      anoLivro: new Date(formData.anoDoLivro).toISOString().split('T')[0], 
      capaUrl: formData.capa,
    });
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/livros", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formData.nomeLivro,
          autor: formData.autor,
          editora: formData.editora,
          edicao: Number(formData.edicao),
          numeroPaginas: Number(formData.numeroPaginas),
          quantidade: Number(formData.quantidade),
          genero: formData.genero,
          descricao: formData.descricao,
          anoLivro: new Date(formData.anoDoLivro).toISOString().split('T')[0],
          capaUrl: formData.capa,
        }),
      });
  
      const text = await response.text();
      console.log("Resposta da API:", text);
  
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status} - ${text}`);
      }
  
      setFormData({
        nomeLivro: '',
        autor: '',
        anoDoLivro: '',
        edicao: '',
        editora: '',
        descricao: '',
        numeroPaginas: '',
        quantidade: '',
        genero: '',
        capa: '',
      });
      
      mostrarSucesso("Livro cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar os dados do livro:", error);
      mostrarErro("Erro ao salvar os dados do livro")
    }
  };
  
  

  return (
    <div className={style.mainForms}>
      <Notificacao/>
      <div className={style.containerForms}>
        <p className={style.titleForm}>Cadastro de Livro</p>
        <form onSubmit={handleSubmit}>
          <div className={style.doubleInputs}>
            <label htmlFor="nomeLivro">
              Nome
              <input
                type="text"
                name="nomeLivro"
                value={formData.nomeLivro}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="autor">
              Autor
              <input
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className={style.doubleInputs}>
            <label htmlFor="anoDoLivro">
              Ano do Livro
              <input
                type="text"
                name="anoDoLivro"
                value={formData.anoDoLivro}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="edicao">
              Edição
              <input
                type="text"
                name="edicao"
                value={formData.edicao}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className={style.doubleInputs}>
            <label htmlFor="editora">
              Editora
              <input
                type="text"
                name="editora"
                value={formData.editora}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="numeroPaginas">
              Número de Páginas
              <input
                type="number"
                name="numeroPaginas"
                value={formData.numeroPaginas}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className={style.doubleInputs}>
            <label htmlFor="quantidade">
              Quantidade
              <input
                type="number"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="genero">
              Gênero
              <input
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className={style.doubleInputs}>
            <label htmlFor="capa">
              Capa do Livro
              <input
                type="text"
                name="capa"
                value={formData.capa}
                onChange={handleChange}
              />
            </label>
          </div>

          <label htmlFor="descricao">
            Descrição
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
            />
          </label>

          <div className={style.buttonCadastroLivro}>
            <Buttons title="Enviar" variant="info" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
