// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/login/login.jsx';
import Header from './components/header/header.jsx';
import HeaderAdmin from './components/headerAdmin/headerAdmin.jsx';

// Rotas do header padrão
import Home from './pages/default/home/home.jsx';
import Biblioteca from './pages/default/biblioteca/biblioteca.jsx';
import Forum from './pages/default/foruns/foruns.jsx';
import Historico from './pages/default/historico/historico.jsx';
import MeusLivros from './pages/default/meusLivros/meusLivros.jsx';
import Usuario from './pages/default/usuario/usuario.jsx';

// Rotas do header de admin
import HomeAdmin from './pages/admin/homeAdmin/homeAdmin.jsx';
import CadastroLivro from './pages/admin/cadastroLivro/cadastroLivro.jsx';
import Acervo from './pages/admin/GerenciamentoAcervo/acervo.jsx';
import Emprestimos from './pages/admin/emprestimos/emprestimos.jsx';

import CadastroAdmin from './pages/login/cadastroAdmin/cadastroAdmin.jsx';
import CadastroUsuario from './pages/login/cadastroUsuario/cadastroUsuario.jsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [tipoUsuario, setTipoUsuario] = useState(''); 

    const handleLogin = (tipo) => {
        setTipoUsuario(tipo);
        setIsAuthenticated(true); 
    };

    return (
        <Router>
            {!isAuthenticated ? (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
                    <Route path="/cadastroAdministrador" element={<CadastroAdmin />} />
                </Routes>
            ) : (
                <>
                    {tipoUsuario === 'administrador' ? <HeaderAdmin /> : <Header />}
                    <Routes>
                        {tipoUsuario === 'leitor' && (
                            <>
                                <Route path="/biblioteca" element={<Biblioteca />} />
                                <Route path="/forum" element={<Forum />} />
                                <Route path="/historico" element={<Historico />} />
                                <Route path="/meus-livros" element={<MeusLivros />} />
                                <Route path='/minhaConta' element={<Usuario />} />
                            </>
                        )}
                        {tipoUsuario === 'administrador' && (
                            <>
                                <Route path="/homeAdmin" element={<Acervo />} />
                                <Route path="/acervo" element={<Acervo />} />
                                <Route path="/cadastro-de-livro" element={<CadastroLivro />} />
                                <Route path="/lista-de-emprestimos" element={<Emprestimos />} />
                                <Route path='/minhaConta' element={<Usuario />} />
                            </>
                        )}
                    </Routes>
                </>
            )}
        </Router>
    );
}

export default App;
