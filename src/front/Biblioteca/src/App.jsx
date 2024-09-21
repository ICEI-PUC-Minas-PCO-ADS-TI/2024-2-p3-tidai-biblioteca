import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header.jsx';
import HeaderAdmin from './components/headerAdmin/headerAdmin.jsx';
import { useState } from 'react';


//Rotas do header padrão
import Home from './pages/default/home/home.jsx';
import Biblioteca from './pages/default/biblioteca/biblioteca.jsx';
import Forum from './pages/default/foruns/foruns.jsx';
import Historico from './pages/default/historico/historico.jsx';
import MeusLivros from './pages/default/meusLivros/meusLivros.jsx';
import Multas from './pages/default/multas/multas.jsx';

//Rotas do header de admin
import HomeAdmin from './pages/admin/homeAdmin/homeAdmin.jsx'
import CadastroLivro from './pages/admin/cadastroLivro/cadastroLivro.jsx';
import CadastroUsuario from './pages/admin/cadastroUsuario/cadastroUsuario.jsx';
import Acervo from './pages/admin/GerenciamentoAcervo/acervo.jsx';
import Emprestimos from './pages/admin/emprestimos/emprestimos.jsx';

function App() {
  //Tela padrao = 'user', Tela Admin = 'admin'
    const TipoUsuario = 'user';

    return (
        <Router>
            {TipoUsuario === 'admin' ? <HeaderAdmin /> : <Header />}
            <Routes>
                {TipoUsuario === 'user' && (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/biblioteca" element={<Biblioteca />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="/historico" element={<Historico />} />
                        <Route path="/meus-livros" element={<MeusLivros />} />
                        <Route path="/multas" element={<Multas />} />
                    </>
                )}
                {TipoUsuario === 'admin' && (
                    <>
                        <Route path="/homeAdmin" element={<HomeAdmin/>} />
                        <Route path="/cadastro-de-livro" element= {<CadastroLivro/>}/>
                        <Route path="/cadastro-de-usuario" element= {<CadastroUsuario/>}/>
                        <Route path="/gerenciar-acervo" element= {<Acervo/>}/>
                        <Route path="/lista-de-emprestimos" element={<Emprestimos />} />

                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;