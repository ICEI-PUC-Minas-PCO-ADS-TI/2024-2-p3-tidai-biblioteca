import React, { useState, useEffect } from 'react';
import styles from './foruns.module.css';
import { mostrarSucesso, mostrarErro } from '../../../components/notificacao/notificacao.jsx';
import Notificacao from '../../../components/notificacao/notificacao.jsx';

export default function Foruns() {
  const [topics, setTopics] = useState([]); 
  const [newTopic, setNewTopic] = useState('');
  const [commentInput, setCommentInput] = useState({}); 
  const [newMessages, setNewMessages] = useState({}); 


  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("https://localhost:7016/mensagens", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);

        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        mostrarErro("Erro ao carregar os tópicos.");
      }
    }

    fetchTopics();
  }, [token]);


const addTopic = async () => {
  if (newTopic.trim()) {
    try {
      const response = await fetch("https://localhost:7016/topico", {
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

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Erro ao criar tópico.");
      }

      const result = await response.json();
      setTopics([...topics, result]);
      setNewTopic("");

      await addMessage(result.id);

    } catch (error) {
      console.error("Erro ao criar tópico:", error.message);
      mostrarErro("Erro ao criar o tópico.");
    }
  }
};

const addMessageToTopic = async (topicoId) => {
  const message = newMessages[topicoId];

  if (message.trim()) {
    try {
      const response = await fetch("https://localhost:7016/mensagens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conteudo: message,
          topicoId: topicoId,  
          usuarioId: 1,        
          dataCriacao: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Erro ao adicionar mensagem.");
      }

      const result = await response.json();

      const updatedTopics = topics.map((topic) =>
        topic.id === topicoId
          ? { ...topic, mensagens: [...topic.mensagens, result] }
          : topic
      );

      setTopics(updatedTopics); 
      setNewMessages({ ...newMessages, [topicoId]: "" }); 

    } catch (error) {
      console.error("Erro ao adicionar mensagem:", error.message);
      mostrarErro("Erro ao adicionar a mensagem.");
    }
  }
};

  const deleteTopic = async (id) => {
    try {
      const response = await fetch(`https://localhost:7016/mensagens/${id}`, {
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

  const renderTopic = (topic) => (
    <div key={topic.id} className={styles.topic}>
      <h3>{topic.titulo}</h3>

      <div className={styles.messagesSection}>
        {topic.mensagens?.length > 0 ? (
          topic.mensagens.map((message, index) => (
            <div key={index} className={styles.message}>
              <p>{message.conteudo}</p>
            </div>
          ))
        ) : (
          <p className={styles.noMessages}>Nenhuma mensagem ainda.</p>
        )}
      </div>
  
      <div className={styles.addMessageContainer}>
        <input
          type="text"
          placeholder="Escreva sua mensagem..."
          value={newMessages[topic.id] || ""} 
          onChange={(e) => setNewMessages({ ...newMessages, [topic.id]: e.target.value })}
          className={styles.inputMessage}
        />
        <button onClick={() => addMessageToTopic(topic.id)} className={styles.button}>
          Adicionar Mensagem
        </button>
      </div>

      <button onClick={() => deleteTopic(topic.id)} className={styles.deleteButton}>
        Excluir
      </button>
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
          placeholder="Escreva o título do tópico..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className={styles.input}
        />
        <button onClick={addTopic} className={styles.button}>
          Adicionar Tópico
        </button>
      </div>
    </div>
  );
}
