import style from './barraPesquisa.module.css'
import { useState } from "react";

export default function BarraDePesquisa() {
  const [focado, setFocado] = useState(false);

  return (
    <>
      <div className={`${style.barraPesquisa} ${focado ? style.focado : ""}`}>
        <input
          type="search"
          placeholder="Pesquisar"
          onFocus={() => {
            setFocado(true);
          }}
          onBlur={() => {
            setFocado(false);
          }}
        />
        <button>
          <i class="bi bi-search"></i>
        </button>
      </div>
    </>
  );
}
