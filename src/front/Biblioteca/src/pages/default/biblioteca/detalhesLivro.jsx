import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importando useNavigate
import { mostrarSucesso, mostrarErro } from "../../../components/notificacao/notificacao.jsx";
import Buttons from "../../../components/buttons/buttons";
import Notificacao from "../../../components/notificacao/notificacao.jsx";
import styles from "./detalhesLivro.module.css";

const LivroDetalhes = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [notificacao, setNotificacao] = useState(null);
  const navigate = useNavigate(); // Inicializando o useNavigate
  const [searchTerm, setSearchTerm] = useState("");

  const reserva = async (idLivro) => {
    const confirmarReserva = window.confirm("Você tem certeza que deseja reservar este livro?");
    if (!confirmarReserva) return;

    try {
      const idUsuario = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/reserva",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usuarioId: idUsuario, livroId: idLivro }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        mostrarErro(data.mensagem || "Erro ao realizar a reserva.");
      } else {
        mostrarSucesso(data.mensagem || "Reserva realizada com sucesso!");
        setTimeout(() => window.location.reload(), 3000);
      }
    } catch (error) {
      console.error("Erro ao realizar a reserva:", error);
      mostrarErro("Erro inesperado ao realizar a reserva.");
    }
  };

  useEffect(() => {
    async function fetchLivroDetalhes() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/livros/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setLivro(data);
        } else {
          console.error(data.mensagem || "Erro ao carregar os detalhes do livro.");
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do livro:", error);
      }
    }

    fetchLivroDetalhes();
  }, [id]);

  if (!livro) {
    return <p>Carregando detalhes do livro...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      {/* Botão para voltar fora do bloco da descrição do livro */}
      <Notificacao />
      <div className={styles.backButton}>
        <button onClick={() => navigate("/")} className={styles.voltarBtn}>
          Voltar para a página inicial
        </button>
      </div>

      <div className={styles.mainContainer}>
        {/* Imagem do livro */}
        <div className={styles.imageContainer}>
          <img
            src={livro.capaUrl}
            alt={`Capa do livro ${livro.titulo}`}
            className={styles.bookImage}
          />
        </div>

        {/* Informações do livro */}
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{livro.titulo}</h1>
          <p className={styles.author}>
            <strong>Autor:</strong> {livro.autor}
          </p>
          <p className={styles.publisher}>
            <strong>Editora:</strong> {livro.editora}
          </p>
          <p className={styles.description}>
            <strong>Descrição:</strong> {livro.descricao}
          </p>
          <div className={styles.actions}>
            {/* Botão de reserva */}
            <Buttons
              title="Reservar"
              variant="confirmacao"
              onClick={() => reserva(livro.id)}
            />
          </div>
        </div>
      </div>

      {/* Exibindo notificações */}
      {notificacao && (
        <Notificacao tipo={notificacao.tipo} mensagem={notificacao.mensagem} />
      )}
    </div>
  );
};

export default LivroDetalhes;
