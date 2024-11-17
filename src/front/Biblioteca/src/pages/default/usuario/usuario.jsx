import React, { useEffect, useState } from 'react';
import styles from './usuario.module.css';
import { mostrarSucesso, mostrarErro } from '../../../components/notificacao/notificacao.jsx'; 
import Notificacao from '../../../components/notificacao/notificacao.jsx';

const Usuario = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    nome: '',
    email: '',
    cpf: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    uf: '',
    numeroCasa: 0,
    telefone: '',
    dataNascimento: '',
    senha: '',
  });

  useEffect(() => {
    async function infoUsuario() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const response = await fetch(`https://localhost:7016/usuarios/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        setFormData({
          id: data.id,
          nome: data.nome,
          email: data.email,
          cpf: data.cpf,
          cep: data.cep,
          rua: data.rua,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf,
          numeroCasa: data.numeroCasa,
          telefone: data.telefone,
          dataNascimento: data.dataNascimento,
          senha: data.senha, 
        });
        
      } catch (error) {
        console.log("Erro ao buscar usuario:", error);
      }
    }

    infoUsuario();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
  
      const response = await fetch(`https://localhost:7016/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
          nome: formData.nome,
          email: formData.email,
          cpf: formData.cpf,
          cep: formData.cep,
          rua: formData.rua,
          bairro: formData.bairro,
          cidade: formData.cidade,
          uf: formData.uf,
          numeroCasa: formData.numeroCasa,
          telefone: formData.telefone,
          dataNascimento: formData.dataNascimento, 
          senha: formData.senha,
        }),
      });
  
      const text = await response.text();
      console.log('Resposta da API:', text);
  
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status} - ${text}`);
      }
  
      
      console.log('Resposta da API:', text); 
      mostrarSucesso("Usuario atualizado com sucesso");
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao salvar os dados do usuário:', error);
      mostrarErro('Erro ao salvar os dados do usuário')
    }
  };
  
  


  return (
    <div className={styles.container}>
      <Notificacao/>
      <h1 className={styles.titulo}>Dados Pessoais</h1>
      {!editMode ? (
        <>
          <div className={styles.informacao}>
            <span>Nome:</span>
            <span className={styles.valor}>{formData.nome}</span>
          </div>
          <div className={styles.informacao}>
            <span>Cpf:</span>
            <span className={styles.valor}>{formData.cpf}</span>
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
            <label className={styles.label}>Nome</label>
            <input
              className={styles.input}
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label className={styles.label}>Cpf</label>
            <input
              className={styles.input}
              type="text"
              name="cpf"
              value={formData.cpf}
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
            <label className={styles.label}>Senha</label>
            <input
              className={styles.input}
              type="password"
              name="senha"
              value={formData.senha}
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
};

export default Usuario;
