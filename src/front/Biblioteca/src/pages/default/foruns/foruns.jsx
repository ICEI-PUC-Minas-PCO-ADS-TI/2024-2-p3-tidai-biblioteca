import React, { useState, useEffect } from "react";
import styles from "./foruns.module.css";

export default function Foruns() {
  const [topics, setTopics] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [comment, setComment] = useState({});
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchTopicosEMensagens() {
      try {
        const topicosResponse = await fetch(
          "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/topico",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!topicosResponse.ok) {
          throw new Error(
            `Erro ao buscar tópicos. Status: ${topicosResponse.status}`
          );
        }

        const topicosData = await topicosResponse.json();
        setTopics(topicosData);
        console.log(topicosData);
        const mensagensResponse = await fetch(
          "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/mensagens",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!mensagensResponse.ok) {
          throw new Error(
            `Erro ao buscar mensagens. Status: ${mensagensResponse.status}`
          );
        }

        const mensagensData = await mensagensResponse.json();
        setMensagens(mensagensData);
        console.log(mensagensData);
      } catch (error) {
        console.error("Erro ao buscar tópicos e mensagens:", error);
      }
    }

    fetchTopicosEMensagens();
  }, [token]);

  const addComment = async (topicId, conteudo) => {
    const commentContent = conteudo || "";

    if (!commentContent.trim()) {
      console.error("Comentário vazio não pode ser enviado.");
      return;
    }

    try {
      const response = await fetch(
        "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/mensagens",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conteudo: commentContent,
            topicoId: topicId,
            usuarioId: userId,
          }),
        }
      );

      console.log("Comment Content:", commentContent);
      console.log("Topic ID:", topicId);
      console.log("User ID:", userId);

      if (!response.ok) {
        throw new Error(
          `Erro ao adicionar comentário. Status: ${response.status}`
        );
      }
      
      const novaMensagem = await response.json();
      setMensagens((prevMensagens) => [...prevMensagens, novaMensagem]);
      setComment((prevComments) => ({ ...prevComments, [topicId]: "" }));
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  const addTopic = async (topico) => {
    const topicoTitulo = topico.trim();

    if (!topicoTitulo) {
      console.error("Título do tópico não pode ser vazio.");
      return;
    }

    try {
      const response = await fetch(
        "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/topico",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ titulo: topicoTitulo, usuarioId: userId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao adicionar tópico. Status: ${response.status}`);
      }

      const novoTopico = await response.json();
      setTopics((prevTopics) => [...prevTopics, novoTopico]);
      setNewTopic("");
    } catch (error) {
      console.error("Erro ao adicionar tópico:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Fórum da Biblioteca</h1>

      <div className={styles.topicList}>
        {topics.map((topic) => (
          <div key={topic.id} className={styles.topic}>
            <h3>{topic.titulo}</h3>
            <p>
              Data criação:{" "}
              {new Date(topic.dataCriacao).toLocaleDateString("pt-BR")}
            </p>

            <div className={styles.commentsSection}>
              {mensagens
                .filter((mensagem) => mensagem.topicoId === topic.id)
                .map((mensagem) => (
                  <div key={mensagem.id} className={styles.comment}>
                    <p>{mensagem.conteudo}</p>
                    <div className={styles.commentContent}>
                      <p>Criado por: {mensagem.nomeUsuario}</p>
                      <p>
                        Data criação:{" "}
                        {new Date(mensagem.dataCriacao).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Escreva um comentário..."
                value={comment[topic.id] || ""}
                onChange={(e) =>
                  setComment({
                    ...comment,
                    [topic.id]: e.target.value,
                  })
                }
                className={styles.input}
              />
              <button
                onClick={() => addComment(topic.id, comment[topic.id] || "")}
                className={styles.button}
              >
                Comentar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Escreva o título do tópico..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className={styles.input}
        />
        <button onClick={() => addTopic(newTopic)} className={styles.button}>
          Adicionar Tópico
        </button>
      </div>
    </div>
  );
}
