import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./meusLivros.module.css";
import Card from "../../../components/card/card";
import Buttons from "../../../components/buttons/buttons";
import { mostrarSucesso, mostrarErro } from '../../../components/notificacao/notificacao.jsx';
import Notificacao from '../../../components/notificacao/notificacao.jsx';
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

        const [emprestimosResponse, reservasResponse] = await Promise.all([
          axios.get(
            `https://localhost:7016/usuarios/emprestimos?id=${userId}`,
            config
          ),
          axios.get(
            `https://localhost:7016/usuarios/reservas?id=${userId}`,
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
          dataDevolucao: item.dataDevolucao,
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
            dataRetida: dataReserva.toISOString(),
            tipo: "reservado",
            img: item.capaUrl,
          };
        });

        setLivros([...emprestimos, ...reservas]);
      } catch (error) {
        console.error("Erro ao carregar os livros:", error);
      }
    };

    fetchLivros();
  }, [userId, token]);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const livrosFiltrados = livros.filter((livro) => {
    if (filtro === "todos") return true;
    if (filtro === "emprestimos") return livro.tipo === "emprestado";
    if (filtro === "reservado") return livro.tipo === "reservado";
    if (filtro === "lido") return livro.lido;
    return false;
  });

  const renovacao = async function Renovacao(idEmprestimo) {
    console.log("Função renovação sendo chamado");
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
        // Exibindo o status da resposta para entender o erro
        const errorData = await response.json();
        console.error("Erro na renovação:", errorData);
        mostrarErro(
          `Erro ao renovar empréstimo: ${
            errorData.message || "Erro desconhecido"
          }`
        );
        return;
      }

      mostrarSucesso("Empréstimo renovado por mais 7 dias");
      console.log("Empréstimo renovado com sucesso!");
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
            <Card
              key={`${livro.idEmprestimo}-${livro.id}`}
              img={livro.img}
              titulo={livro.titulo}
              autor={livro.autor}
              editora={livro.editora}
            >
              <p className={styles.contentCard}>
                {livro.tipo === "emprestado"
                  ? `Data devolução: ${new Date(
                      livro.dataDevolucao
                    ).toLocaleDateString("pt-BR")}`
                  : `Data limite p/ retirada: ${new Date(
                      livro.dataRetida
                    ).toLocaleDateString("pt-BR")}`}
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
      <Notificacao/>
    </div>
    
  );
};

export default Acervo;
