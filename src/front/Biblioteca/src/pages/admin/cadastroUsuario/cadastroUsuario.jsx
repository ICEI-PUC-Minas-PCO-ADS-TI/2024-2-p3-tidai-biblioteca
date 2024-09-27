import style from '../cadastroUsuario/cadastroUsuario.module.css';
import { useState } from 'react';

export default function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [numero, setNumero] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Usuário cadastrado com sucesso!');
  };

  return (
    <div className={style.containerForms}>
      <p className={style.titleForm}>Cadastro de Usuário</p>
      <form onSubmit={handleSubmit}>
        <div className={style.doubleInputs}>
          <label htmlFor="nome">
            Nome
            <input
              type="text"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label htmlFor="cpf">
            CPF
            <input
              type="text"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </label>
        </div>
        <div className={style.doubleInputs}>
          <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                value={email}
                className={style.inputEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
          </label>
        </div>
        
        <div className={style.doubleInputs}>
          <label htmlFor="cep">
            CEP
            <input
              type="text"
              name="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </label>
        </div>

        <div className={style.doubleInputs}>
          <label htmlFor="rua">
            Rua
            <input
              type="text"
              name="rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </label>

          <label htmlFor="bairro">
            Bairro
            <input
              type="text"
              name="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </label>
        </div>

        <div className={style.doubleInputs}>
          <label htmlFor="estado">
            Estado
            <input
              type="text"
              name="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </label>

          <label htmlFor="numero">
            Número
            <input
              type="text"
              name="numero"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </label>
        </div>
        <div className={style.doubleInputs}>
          <label htmlFor="matricula">
            Matrícula
            <input
              type="text"
              name="matricula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </label>
          </div>
          <div className={style.doubleInputs}>
          <label htmlFor="senha">
            Senha
            <input
              type="password"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
       

        <label htmlFor="confirmarSenha">
          Confirmar Senha
          <input
            type="password"
            name="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </label>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
