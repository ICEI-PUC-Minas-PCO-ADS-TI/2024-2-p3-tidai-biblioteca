import style from "../cadastroUsuario/cadastroUsuario.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    uf: "",
    numeroCasa: "",
    telefone: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function cadastro(e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/usuarios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
      console.log("Resposta da API:", text);

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status} - ${text}`);
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      console.log("Erro ao realizar o cadastro:", error);
      alert("Erro ao realizar o cadastro. Tente novamente.");
    }
  }

  return (
    <div className={style.main}>
      <div className={style.container}>
        <h1>Cadastro de Usuário</h1>
        <form onSubmit={cadastro}>
          <div className={style.formGroup}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={style.doubleInput}>
            <div className={style.formGroup}>
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                required
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(XX) XXXXX-XXXX"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              required
              value={formData.dataNascimento}
              onChange={handleChange}
            />
          </div>

          <div className={style.doubleInput}>
            <div className={style.formGroup}>
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                id="cep"
                name="cep"
                required
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleChange}
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="rua">Rua</label>
              <input
                type="text"
                id="rua"
                name="rua"
                required
                placeholder="Nome da rua"
                value={formData.rua}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={style.doubleInput}>
            <div className={style.formGroup}>
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                required
                placeholder="Nome do bairro"
                value={formData.bairro}
                onChange={handleChange}
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                required
                placeholder="Nome da cidade"
                value={formData.cidade}
                onChange={handleChange}
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="numeroCasa">Número</label>
              <input
                type="text"
                id="numeroCasa"
                name="numeroCasa"
                required
                placeholder="N"
                value={formData.numeroCasa}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={style.doubleInput}>
            <div className={style.formGroup}>
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                name="senha"
                required
                placeholder="Digite uma senha"
                value={formData.senha}
                onChange={handleChange}
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="confirmarSenha">Confirmar Senha:</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                required
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
