import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/login/login.jsx";
import Header from "./components/header/header.jsx";
import HeaderAdmin from "./components/headerAdmin/headerAdmin.jsx";

// Rotas do header padrão
import Biblioteca from "./pages/default/biblioteca/biblioteca.jsx";
import Forum from "./pages/default/foruns/foruns.jsx";
import Historico from "./pages/default/historico/historico.jsx";
import MeusLivros from "./pages/default/meusLivros/meusLivros.jsx";
import Usuario from "./pages/default/usuario/usuario.jsx";

// Rotas do header de admin
import Acervo from "./pages/admin/GerenciamentoAcervo/acervo.jsx";
import CadastroLivro from "./pages/admin/cadastroLivro/cadastroLivro.jsx";
import Emprestimos from "./pages/admin/emprestimos/emprestimos.jsx";

import CadastroAdmin from "./pages/login/cadastroAdmin/cadastroAdmin.jsx";
import CadastroUsuario from "./pages/login/cadastroUsuario/cadastroUsuario.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    const storedTipoUsuario = localStorage.getItem("role");

    if (storedIsAuthenticated && storedTipoUsuario) {
      setIsAuthenticated(true);
      setTipoUsuario(storedTipoUsuario);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (tipo) => {
    setTipoUsuario(tipo);
    setIsAuthenticated(true);

    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("role", tipo);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setTipoUsuario("");
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="/cadastroAdministrador" element={<CadastroAdmin />} />
        </Routes>
      ) : (
        <>
          {tipoUsuario === "administrador" ? (
            <HeaderAdmin onLogout={handleLogout} />
          ) : (
            <Header onLogout={handleLogout} />
          )}
          <Routes>
            {tipoUsuario === "leitor" && (
              <>
                <Route path="/" element={<Biblioteca />} />
                <Route path="/biblioteca" element={<Biblioteca />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/meus-livros" element={<MeusLivros />} />
                <Route path="/minhaConta" element={<Usuario />} />
              </>
            )}
            {tipoUsuario === "administrador" && (
              <>
                <Route path="/homeAdmin" element={<Acervo />} />
                <Route path="/acervo" element={<Acervo />} />
                <Route path="/cadastro-de-livro" element={<CadastroLivro />} />
                <Route path="/lista-de-emprestimos" element={<Emprestimos />} />
                <Route path="/minhaConta" element={<Usuario />} />
              </>
            )}
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
