import style from "../emprestimos/emprestimos.module.css";
import BarraDePesquisa from "../../../components/barraPesquisa/barraPesquisa";
import Buttons from "../../../components/buttons/buttons";
import { useState, useEffect } from "react";
import {
  mostrarSucesso,
  mostrarErro,
} from "../../../components/notificacao/notificacao.jsx";
import Notificacao from "../../../components/notificacao/notificacao.jsx";

export default function Emprestimos() {
  const [PopUp, setPopUp] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");
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
  const [historico, setHistorico] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    async function fetchReserva() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/historico",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        mostrarErro("Erro ao buscar reservas");
      }
    }
    fetchReserva();
  }, []);

  useEffect(() => {
    async function fetchReserva() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/usuario/livro",
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
          "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/emprestimos/usuarios/livros",
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
    console.log("esta chamando");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/usuarios/pesquisar?nome=${nome}`,
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
        `https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/reserva/retirada/${id}`,
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
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Erro ao excluir retirar reserva:", error);
      mostrarErro("Erro ao retirar reserva");
    }
  }

  async function deletarEmprestimo(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/emprestimos/${id}`,
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
      mostrarSucesso(`Livro devolvido com sucesso ${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Erro ao excluir empréstimo:", error);
      mostrarErro("Erro ao excluir empréstimo");
    }
  }

  function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function formatarTelefone(telefone) {
    if (!telefone) return "";
    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (telefoneLimpo.length === 11) {
      return telefoneLimpo.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return telefone;
  }
  function formatarCPF(cpf) {
    if (!cpf) return "";
    const cpfLimpo = cpf.replace(/\D/g, "");
    if (cpfLimpo.length === 11) {
      return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return cpf;
  }
  function filtrarDados(dados) {
    if (!termoPesquisa.trim()) return dados;
    return dados.filter((item) => 
      item.nomeUsuario?.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      item.nomeLivro?.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
  }
  
  

  return (
    <div className={style.main}>
      <div className={style.container}>
        <h2>Lista de Emprestimos</h2>
        <div className={style.headerEmprestimos}>
          <div className={style.barraPesquisaEmprestimo}>
            <BarraDePesquisa
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
            />
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

            <label>
              <input
                type="radio"
                name="filtro"
                value="historico"
                checked={filtro === "historico"}
                onChange={() => setFiltro("historico")}
              />
              Histórico
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
             filtrarDados(emprestimos).map((emprestimo) => (
                <tr key={emprestimo.id}>
                  <td>{emprestimo.nomeUsuario}</td>
                  <td>{emprestimo.nomeLivro}</td>
                  <td>{formatarData(emprestimo.dataEmprestimo)}</td>
                  <td>{formatarData(emprestimo.dataDevolucao)}</td>
                  <td>{emprestimo.status}</td>
                  <td>{formatarTelefone(emprestimo.telefone)}</td>
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
              filtrarDados(reservas).map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.nomeUsuario}</td>
                  <td>{reserva.nomeLivro}</td>
                  <td>{formatarData(reserva.dataReserva)}</td>
                  <td>{formatarData(reserva.dataExpiracao)}</td>
                  <td>Aguardando retirada</td>
                  <td>{formatarTelefone(reserva.telefone)}</td>
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

            {filtro === "historico" &&
              filtrarDados(historico).map((historicoItem) => (
                <tr key={historicoItem.id}>
                  <td>{historicoItem.nomeUsuario}</td>
                  <td>{historicoItem.nomeLivro}</td>
                  <td>-</td>
                  <td>{formatarData(historicoItem.dataHistorico)}</td>
                  <td>Finalizado</td>
                  <td>{formatarTelefone(historicoItem.telefone)}</td>
                  <td>
                    <Buttons
                      title="Mais Info"
                      variant="info"
                      onClick={() => abrirPopUp(historicoItem.nomeUsuario)}
                    />
                  </td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </table>
        {PopUp && (
          <div className={style.popup}>
            <div className={style.popupContent}>
              <div>
                <p>Nome: {dataUsuario.nome}</p>
                <p>Cpf: {formatarCPF(dataUsuario.cpf)}</p>
              </div>
              <div>
                <p>Telefone: {formatarTelefone(dataUsuario.telefone)}</p>
                <p>E-mail: {dataUsuario.email}</p>
              </div>
              <div>
                <p> Rua: {dataUsuario.rua}</p>
              </div>
              <div>
                <p> Bairro: {dataUsuario.bairro}</p>
              </div>

              <div>
                <p> Cidade: {dataUsuario.cidade}</p>
                <p> Numero: {dataUsuario.numeroCasa}</p>
              </div>
              <Buttons
                title="Fechar"
                variant="delete"
                onClick={() => setPopUp(false)}
              />
            </div>
          </div>
        )}
      </div>
      <Notificacao />
    </div>
  );
}
