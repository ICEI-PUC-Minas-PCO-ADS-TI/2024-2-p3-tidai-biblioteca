import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header.jsx';
import Home from './pages/default/home/home.jsx';
import Biblioteca from './pages/default/biblioteca/biblioteca.jsx';
import Forum from './pages/default/foruns/foruns.jsx';
import Historico from './pages/default/historico/historico.jsx';
import MeusLivros from './pages/default/meusLivros/meusLivros.jsx';
import Multas from './pages/default/multas/multas.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/meus-livros" element={<MeusLivros />} />
        <Route path="/multas" element={<Multas />} />
      </Routes>
    </Router>
  );
}

export default App;
