import style from './barraPesquisa.module.css';
import { useState } from "react";

export default function BarraDePesquisa({ className: customClass, value, onChange }) {
  const [focado, setFocado] = useState(false);

  return (
    <div className={`${style.barraPesquisa} ${focado ? style.focado : ""} ${customClass}`}>
      <input
        type="search"
        placeholder="Pesquisar"
        value={value}
        onChange={onChange}
        onFocus={() => setFocado(true)}
        onBlur={() => setFocado(false)}
      />
      <button>
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
}
