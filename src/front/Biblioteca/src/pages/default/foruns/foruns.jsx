import React, { useState, useEffect } from "react";
import styles from "./foruns.module.css";
import { mostrarSucesso, mostrarErro } from "../../../components/notificacao/notificacao.jsx";
import Notificacao from "../../../components/notificacao/notificacao.jsx";

export default function Foruns() {
  const [topics, setTopics] = useState([]); // Tópicos carregados ou adicionados
  const [newTopic, setNewTopic] = useState(""); // Novo título de tópico
  const [newTopicMessage, setNewTopicMessage] = useState(""); // Mensagem inicial do novo tópico
  const [newMessages, setNewMessages] = useState({}); // Estado para mensagens dos tópicos
  const token = localStorage.getItem("token");

  // Buscar tópicos ao carregar a página
  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/mensagens", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);

        const data = await response.json();
        // Garantir que cada tópico tenha uma lista de comments
        const formattedData = data.map((topic) => ({
          ...topic,
          comments: topic.comments || [],
        }));
        setTopics(formattedData);
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        mostrarErro("Erro ao carregar os tópicos.");
      }
    }
    fetchTopics();
  }, [token]);

  // Adicionar um novo tópico e uma mensagem inicial
  const addTopic = async () => {
    if (newTopic.trim()) {
      try {
        const response = await fetch("https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/topico", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            titulo: newTopic,
            usuarioId: 1,
            dataCriacao: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error("Erro ao criar tópico.");

        const result = await response.json();

        // Adicionar mensagem inicial ao tópico
        let newTopicData = { ...result, comments: [] };
        if (newTopicMessage.trim()) {
          const messageResponse = await addMessageToTopic(result.id, newTopicMessage, true);
          newTopicData.comments.push(messageResponse);
        }

        setTopics([...topics, newTopicData]);
        setNewTopic("");
        setNewTopicMessage("");
        mostrarSucesso("Tópico criado com sucesso!");
      } catch (error) {
        console.error("Erro ao criar tópico:", error.message);
        mostrarErro("Erro ao criar o tópico.");
      }
    }
  };

  // Adicionar mensagem a um tópico
  const addMessageToTopic = async (topicId, messageContent, isInitial = false) => {
    const message = messageContent.trim();

    if (message) {
      try {
        const response = await fetch("https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/mensagens", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            conteudo: message,
            topicoId: topicId,
            usuarioId: 1,
            dataCriacao: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error("Erro ao adicionar mensagem.");

        const result = await response.json();

        setTopics((prevTopics) =>
          prevTopics.map((topic) =>
            topic.id === topicId
              ? { ...topic, comments: [...topic.comments, result] }
              : topic
          )
        );

        if (!isInitial) {
          setNewMessages({ ...newMessages, [topicId]: "" });
        }
        return result;
      } catch (error) {
        console.error("Erro ao adicionar mensagem:", error.message);
        mostrarErro("Erro ao adicionar a mensagem.");
      }
    }
  };

  const deleteTopic = async (id) => {
    try {
      const response = await fetch(`https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/mensagens/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error("Erro ao excluir tópico.");

      setTopics(topics.filter((topic) => topic.id !== id)); 
      mostrarSucesso("Tópico excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir tópico:", error);
      mostrarErro("Erro ao excluir o tópico.");
    }
  };
  
  
  // Renderizar um tópico
  const renderTopic = (topic) => (
    <div key={topic.id} className={styles.topic}>
      <h3>{topic.titulo}</h3>
      <p>{topic.conteudo || "Sem conteúdo"}</p>
  
      {/* Renderizar Comentários */}
      <div className={styles.commentsSection}>
        {Array.isArray(topic.comments) && topic.comments.length > 0 ? (
          topic.comments.map((comment, index) => (
            <div key={comment.id || index} className={styles.comment}>
              <p>{comment.conteudo}</p>
              {comment.usuarioId && (
                <span className={styles.commentUser}>
                  Usuário: {comment.usuarioId}
                </span>
              )}
              {comment.dataCriacao && (
                <span className={styles.commentDate}>
                  Data: {new Date(comment.dataCriacao).toLocaleString()}
                </span>
              )}
            </div>
          ))
        ) : (
          <p className={styles.noComments}>Nenhum comentário ainda.</p>
        )}
      </div>
  
      {/* Adicionar Mensagem */}
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Escreva uma mensagem..."
          value={newMessages[topic.id] || ""}
          onChange={(e) =>
            setNewMessages({ ...newMessages, [topic.id]: e.target.value })
          }
          className={styles.input}
        />
        <button
          onClick={() => addMessageToTopic(topic.id, newMessages[topic.id])}
          className={styles.button}
        >
          Comentar
        </button>
        <button onClick={() => deleteTopic(topic.id)} className={styles.button}>
          Excluir
        </button>
      </div>
    </div>
  );
  

  return (
    <div className={styles.container}>
      <Notificacao />
      <h1 className={styles.header}>Fórum da Biblioteca</h1>

      {/* Lista de Tópicos */}
      <div className={styles.topicList}>
        {topics.length > 0 ? (
          topics.map(renderTopic)
        ) : (
          <p className={styles.empty}>Nenhum tópico criado ainda.</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Título do tópico..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Mensagem inicial..."
          value={newTopicMessage}
          onChange={(e) => setNewTopicMessage(e.target.value)}
          className={styles.input}
        />
        <button onClick={addTopic} className={styles.button}>
          Adicionar Tópico
        </button>
      </div>
    </div>
  );
}
