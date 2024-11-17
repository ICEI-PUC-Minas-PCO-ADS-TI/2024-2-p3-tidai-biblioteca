import style from "../emprestimos/emprestimos.module.css";
import BarraDePesquisa from "../../../components/barraPesquisa/barraPesquisa";
import Buttons from "../../../components/buttons/buttons";
import { useState, useEffect } from "react";
import { mostrarSucesso, mostrarErro } from '../../../components/notificacao/notificacao.jsx';
import Notificacao from '../../../components/notificacao/notificacao.jsx';

export default function Emprestimos() {
  const [PopUp, setPopUp] = useState(false);
  const [dataUsuario, setDataUsuario] = useState({
    id: 0,
    nome: "",
    email: "",
    cpf: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    uf: "",
    numeroCasa: 0,
    telefone: "",
    dataNascimento: "",
  });

  const [emprestimos, setEmprestimos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState("todos"); // Estado para o filtro

  useEffect(() => {
    async function fetchReserva() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://localhost:7016/usuario/livro",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        mostrarErro("Erro ao buscar reservas");
      }
    }
    fetchReserva();
  }, []);

  useEffect(() => {
    async function fetchEmprestimos() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://localhost:7016/emprestimos/usuarios/livros",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        setEmprestimos(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        mostrarErro("Erro ao buscar empréstimos");
      }
    }
    fetchEmprestimos();
  }, []);

  async function abrirPopUp(nome) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7016/usuarios/pesquisar?nome=${nome}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.length > 0) {
        const usuario = data[0];
        setDataUsuario({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cpf: usuario.cpf,
          cep: usuario.cep,
          rua: usuario.rua,
          bairro: usuario.bairro,
          cidade: usuario.cidade,
          uf: usuario.uf,
          numeroCasa: usuario.numeroCasa,
          telefone: usuario.telefone,
          dataNascimento: usuario.dataNascimento,
        });

        setPopUp(true);
      } else {
        mostrarErro("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar usuario:", error);
      mostrarErro("Erro ao buscar usuário");
    }
  }

  async function reservaRetirada(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7016/reserva/retirada/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      setReservas(reservas.filter((reserva) => reserva.id !== id));
      mostrarSucesso("Reserva retirada com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir retirar reserva:", error);
      mostrarErro("Erro ao retirar reserva");
    }
  }

  async function deletarEmprestimo(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7016/emprestimos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      setEmprestimos(emprestimos.filter((emprestimo) => emprestimo.id !== id));
      mostrarSucesso(`Empréstimo excluído com sucesso do id ${id}`);
    } catch (error) {
      console.error("Erro ao excluir empréstimo:", error);
      mostrarErro("Erro ao excluir empréstimo");
    }
  }

  return (
    <div className={style.main}>
      <div className={style.container}>
        <h2>Lista de Emprestimos</h2>
        <div className={style.headerEmprestimos}>
          <div className={style.barraPesquisaEmprestimo}>
            <BarraDePesquisa />
          </div>
          <div className={style.filtros}>
            <label>
              <input
                type="radio"
                name="filtro"
                value="todos"
                checked={filtro === "todos"}
                onChange={() => setFiltro("todos")}
              />
              Todos
            </label>
            <label>
              <input
                type="radio"
                name="filtro"
                value="emprestimos"
                checked={filtro === "emprestimos"}
                onChange={() => setFiltro("emprestimos")}
              />
              Emprestimos
            </label>

            <label>
              <input
                type="radio"
                name="filtro"
                value="reservas"
                checked={filtro === "reservas"}
                onChange={() => setFiltro("reservas")}
              />
              Reservas
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Livro</th>
              <th>Inicio do emprestimo</th>
              <th>Vencimento</th>
              <th>Status</th>
              <th>Telefone</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(filtro === "todos" || filtro === "emprestimos") &&
              emprestimos.map((emprestimo) => (
                <tr key={emprestimo.id}>
                  <td>{emprestimo.nomeUsuario}</td>
                  <td>{emprestimo.nomeLivro}</td>
                  <td>{emprestimo.dataEmprestimo}</td>
                  <td>{emprestimo.dataDevolucao}</td>
                  <td>{emprestimo.status}</td>
                  <td>{emprestimo.telefone}</td>
                  <td>
                    <Buttons
                      title="Mais Info"
                      variant="info"
                      onClick={() => abrirPopUp(emprestimo.nomeUsuario)}
                    />
                  </td>
                  <td>
                    <Buttons
                      title="Devolvido"
                      variant="confirmacao"
                      onClick={() => deletarEmprestimo(emprestimo.id)}
                    />
                  </td>
                </tr>
              ))}
            {(filtro === "todos" || filtro === "reservas") &&
              reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.nomeUsuario}</td>
                  <td>{reserva.nomeLivro}</td>
                  <td>{reserva.dataReserva}</td>
                  <td>{reserva.dataExpiracao}</td>
                  <td>Aguardando retirada</td>
                  <td>{reserva.telefone}</td>
                  <td>
                    <Buttons
                      title="Mais Info"
                      variant="info"
                      onClick={() => abrirPopUp(reserva.nomeUsuario)}
                    />
                  </td>
                  <td>
                    <Buttons
                      title="Retirado"
                      variant="confirmacao"
                      onClick={() => reservaRetirada(reserva.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Notificacao/>
    </div>
  );
}
