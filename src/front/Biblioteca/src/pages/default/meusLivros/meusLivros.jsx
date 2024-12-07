import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./meusLivros.module.css";
import Card from "../../../components/card/card";
import Buttons from "../../../components/buttons/buttons";
import {
  mostrarSucesso,
  mostrarErro,
} from "../../../components/notificacao/notificacao.jsx";
import Notificacao from "../../../components/notificacao/notificacao.jsx";

const Acervo = () => {
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

     
        const [emprestimosResponse, reservasResponse, historicoResponse] =
          await Promise.all([
            axios.get(
              `https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/usuarios/emprestimos?id=${userId}`,
              config
            ),
            axios.get(
              `https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/usuarios/reservas?id=${userId}`,
              config
            ),
            axios.get(
              `https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/historico/usuario/${userId}`,
              config
            ),
          ]);

        const emprestimos = emprestimosResponse.data.map((item) => ({
          id: item.id,
          idEmprestimo: item.idEmprestimo,
          titulo: item.nomeLivro,
          autor: item.autor,
          editora: item.editora,
          tipo: "emprestado",
          data: item.dataDevolucao,
          img: item.capaUrl,
        }));

        const reservas = reservasResponse.data.map((item) => {
          const dataReserva = new Date(item.dataReserva);
          dataReserva.setDate(dataReserva.getDate() + 3);
          return {
            id: item.id,
            titulo: item.nomeLivro,
            autor: item.autor,
            editora: item.editora,
            tipo: "reservado",
            data: dataReserva.toISOString(),
            img: item.capaUrl,
          };
        });

        const historico = historicoResponse.data.map((item) => ({
          id: item.id,
          titulo: item.nomeLivro,
          autor: item.nomeAutor,
          editora: item.editora,
          tipo: "lido",
          data: item.dataHistorico,
          img: item.capaLivro,
        }));

        setLivros([...emprestimos, ...reservas, ...historico]);
      } catch (error) {
        console.error("Erro ao carregar os livros:", error.response || error);
        mostrarErro("Erro ao carregar os livros. Tente novamente.");
      }
    };

    fetchLivros();
  }, [userId, token]);

  const filtros = {
    todos: () => true,
    emprestimos: (livro) => livro.tipo === "emprestado",
    reservado: (livro) => livro.tipo === "reservado",
    lido: (livro) => livro.tipo === "lido",
  };

  
  const livrosFiltrados = livros.filter(filtros[filtro]);

  const renovacao = async (idEmprestimo) => {
    try {
      const response = await fetch(
        `https://localhost:7016/emprestimos/${idEmprestimo}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro na renovação:", errorData);
        mostrarErro(`Erro ao renovar empréstimo: ${errorData.message || "Erro desconhecido"}`);
        return;
      }

      mostrarSucesso("Empréstimo renovado por mais 7 dias");
    } catch (error) {
      console.error("Erro ao realizar a renovação do empréstimo:", error);
      mostrarErro("Erro inesperado ao renovar o empréstimo.");
    }
  };

  return (
    <div className={styles.acervoContainer}>
      <div className={styles.sidebar}>
        <h2>Filtros</h2>
        <form>
          {["todos", "emprestimos", "reservado", "lido"].map((tipo) => (
            <div key={tipo}>
              <label>
                <input
                  type="radio"
                  name="filtro"
                  value={tipo}
                  checked={filtro === tipo}
                  onChange={(e) => setFiltro(e.target.value)}
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
            <Card
              key={livro.id}
              img={livro.img}
              titulo={livro.titulo}
              autor={livro.autor}
              editora={livro.editora}
            >
              <p className={styles.contentCard}>
                {livro.tipo === "emprestado"
                  ? `Data devolução: ${new Date(livro.data).toLocaleDateString("pt-BR")}`
                  : livro.tipo === "reservado"
                  ? `Data limite p/ retirada: ${new Date(livro.data).toLocaleDateString("pt-BR")}`
                  : `Lido em: ${new Date(livro.data).toLocaleDateString("pt-BR")}`}
              </p>
              {livro.tipo === "emprestado" && (
                <Buttons
                  title="Renovação"
                  variant="confirmacao"
                  onClick={() => renovacao(livro.idEmprestimo)}
                />
              )}
            </Card>
          ))
        )}
      </div>
      <Notificacao />
    </div>
  );
};

export default Acervo;
