import style from '../header/header.module.css';
import { NavLink } from 'react-router-dom';
import BarraPesquisa from '../barraPesquisa/barraPesquisa';

export default function Header() {
  return (
    <>
      <div className={style.Header}>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-house-fill" : "bi-house"}`}></i>
                  Ínicio
                </>
              )}
            </NavLink>
          </li>
          {/* 
          <li>
            <NavLink
              to="/biblioteca"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-book-fill" : "bi-book"}`}></i>
                  Biblioteca
                </>
              )}
            </NavLink>
          </li>
          */}
          <li>
            <NavLink
              to="/meus-livros"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-journal-bookmark-fill" : "bi-journal-bookmark"}`}></i>
                  Meus Livros
                </>
              )}
            </NavLink>
          </li>
            {/* 
          <li>
            <NavLink
              to="/historico"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-hourglass-split" : "bi-hourglass-bottom"}`}></i>
                  Histórico de Leitura
                </>
              )}
            </NavLink>
          </li>
        */}
          <li>
            <NavLink
              to="/forum"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-chat-left-text-fill" : "bi-chat-left-text"}`}></i>
                  Fórum
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/minhaConta"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }>
              {({ isActive }) => (
                <>
                 <i className="bi bi-person-fill-gear"></i>
                  Minha conta
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
