import style from "../cadastroUsuario/cadastroUsuario.module.css";
import { mostrarSucesso, mostrarErro } from '../../../components/notificacao/notificacao.jsx';
import Notificacao from '../../../components/notificacao/notificacao.jsx';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    cep: "",
    rua: "",
    tipoUsuario: "",
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
    const maskedValue = applyMask(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: maskedValue,
    }));
  };

  const applyMask = (field, value) => {
    if (field === "cpf") {
      return value
        .replace(/\D/g, "") // Remove tudo que não é número
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (field === "telefone") {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    }

    if (field === "cep") {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
    }

    return value;
  };

  const removeFormatting = (value) => {
    return value.replace(/\D/g, ""); // Remove tudo que não é número
  };

  const validarCampos = () => {
    if (!formData.nome.trim()) {
      mostrarErro("O nome é obrigatório.");
      return false;
    }

    if (!formData.email.includes("@")) {
      mostrarErro("O e-mail deve ser válido.");
      return false;
    }

    if (removeFormatting(formData.cpf).length !== 11) {
      mostrarErro("O CPF deve ser válido.");
      return false;
    }

    if (removeFormatting(formData.cep).length !== 8) {
      mostrarErro("O CEP deve ser válido.");
      return false;
    }

    if (removeFormatting(formData.telefone).length < 10) {
      mostrarErro("O telefone deve ser válido.");
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      mostrarErro("As senhas não coincidem.");
      return false;
    }

    return true;
  };

  const cadastro = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    // Remove formatação para enviar os dados ao servidor
    const payload = {
      nome: formData.nome,
      email: formData.email,
      cpf: removeFormatting(formData.cpf),
      tipoUsuario: "user",
      cep: removeFormatting(formData.cep),
      rua: formData.rua,
      bairro: formData.bairro,
      cidade: formData.cidade,
      uf: formData.uf,
      numeroCasa: formData.numeroCasa,
      telefone: removeFormatting(formData.telefone),
      dataNascimento: formData.dataNascimento,
      senha: formData.senha,
    };

    try {
      const response = await fetch(
        "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/usuarios/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const message = await response.text();

      if (!response.ok) {
        mostrarErro(`Erro: ${message}`);
        return;
      }

      mostrarSucesso(message);
      navigate("/");
    } catch (error) {
      console.error("Erro ao realizar o cadastro:", error);
      mostrarErro("Erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <div className={style.main}>
      <Notificacao />
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
                required
                placeholder="(00) 0 0000-0000"
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
