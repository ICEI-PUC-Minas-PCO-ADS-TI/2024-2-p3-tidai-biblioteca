import style from '../header/header.module.css';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <div className={style.Header}>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => isActive ? `${style.active} ${style.link}` : style.link}>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-house-fill" : "bi-house"}`}></i>
                  Home
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/biblioteca"
              className={({ isActive }) => isActive ? `${style.active} ${style.link}` : style.link}>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-book-fill" : "bi-book"}`}></i>
                  Livros
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meus-livros"
              className={({ isActive }) => isActive ? `${style.active} ${style.link}` : style.link}>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-journal-bookmark-fill" : "bi-journal-bookmark"}`}></i>
                  Meus livros
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/historico"
              className={({ isActive }) => isActive ? `${style.active} ${style.link}` : style.link}>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-hourglass-split" : "bi-hourglass-bottom"}`}></i>
                  Histórico de Leitura
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/multas"
              className={({ isActive }) => isActive ? `${style.active} ${style.link}` : style.link}>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-credit-card-fill" : "bi-credit-card"}`}></i>
                  Pagamentos
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/forum"
              className={({ isActive }) => isActive ? `${style.active} ${style.link}` : style.link}>
              {({ isActive }) => (
                <>
                  <i className={`bi ${isActive ? "bi-chat-left-text-fill" : "bi-chat-left-text"}`}></i>
                  Fórum
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

