import React, { useState } from 'react';
import styles from './usuario.module.css';

const Usuario = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    matricula: '202200001',
    nome: 'João da Silva',
    curso: 'Engenharia de Software',
    telefone: '(11) 91234-5678',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleSave = () => setEditMode(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Dados Pessoais</h1>
      {!editMode ? (
        <>
          <div className={styles.informacao}>
            <span>Matrícula:</span>
            <span className={styles.valor}>{formData.matricula}</span>
          </div>
          <div className={styles.informacao}>
            <span>Nome:</span>
            <span className={styles.valor}>{formData.nome}</span>
          </div>
          <div className={styles.informacao}>
            <span>Curso:</span>
            <span className={styles.valor}>{formData.curso}</span>
          </div>
          <div className={styles.informacao}>
            <span>Telefone:</span>
            <span className={styles.valor}>{formData.telefone}</span>
          </div>
          <button className={styles.botaoEditar} onClick={handleEdit}>
            Editar Dados
          </button>
        </>
      ) : (
        <>
          <div className={styles.formulario}>
            <label className={styles.label}>Matrícula</label>
            <input
              className={styles.input}
              type="text"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
            />
            <label className={styles.label}>Nome</label>
            <input
              className={styles.input}
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <label className={styles.label}>Curso</label>
            <input
              className={styles.input}
              type="text"
              name="curso"
              value={formData.curso}
              onChange={handleChange}
            />
            <label className={styles.label}>Telefone</label>
            <input
              className={styles.input}
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
            <button className={styles.botaoSalvar} onClick={handleSave}>
              Salvar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Usuario;
