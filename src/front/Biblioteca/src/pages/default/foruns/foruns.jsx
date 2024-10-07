import React, { useState } from 'react';
import styles from './foruns.module.css';

export default function Foruns() {
  const [topics, setTopics] = useState([]); // Estado para armazenar os tópicos
  const [newTopic, setNewTopic] = useState(''); // Estado para o novo tópico
  const [commentInput, setCommentInput] = useState({}); // Estado para comentários (um por tópico)

  // Função para adicionar um novo tópico
  const addTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, { id: Date.now().toString(), title: newTopic, comments: [] }]);
      setNewTopic(''); // Limpar o campo de texto após adicionar
    }
  };

  // Função para adicionar um comentário a um tópico específico
  const addComment = (topicId) => {
    const comment = commentInput[topicId]?.trim();
    if (comment) {
      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === topicId
            ? { ...topic, comments: [...topic.comments, comment] }
            : topic
        )
      );
      setCommentInput({ ...commentInput, [topicId]: '' }); // Limpar o campo de comentário
    }
  };

  // Função que renderiza cada tópico com seus comentários
  const renderTopic = (topic) => (
    <div key={topic.id} className={styles.topic}>
      <h3>{topic.title}</h3>
      
      {/* Renderizar Comentários */}
      <div className={styles.commentsSection}>
        {topic.comments.length > 0 ? (
          topic.comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <p>{comment}</p>
            </div>
          ))
        ) : (
          <p className={styles.noComments}>Nenhum comentário ainda.</p>
        )}
      </div>

      {/* Campo para adicionar um comentário */}
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Escreva um comentário..."
          value={commentInput[topic.id] || ''}
          onChange={(e) => setCommentInput({ ...commentInput, [topic.id]: e.target.value })}
          className={styles.input}
        />
        <button onClick={() => addComment(topic.id)} className={styles.button}>
          Comentar
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Fórum da Biblioteca</h1>

      {/* Lista de Tópicos */}
      <div className={styles.topicList}>
        {topics.length > 0 ? (
          topics.map(renderTopic)
        ) : (
          <p className={styles.empty}>Nenhum tópico criado ainda.</p>
        )}
      </div>

      {/* Campo para adicionar um novo tópico */}
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
