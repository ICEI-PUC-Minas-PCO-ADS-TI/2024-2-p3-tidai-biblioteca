import style from "../emprestimos/emprestimos.module.css";
import BarraDePesquisa from "../../../components/barraPesquisa/barraPesquisa";
import Buttons from "../../../components/buttons/buttons";
import { useState } from "react";

export default function Emprestimos() {


  const [abrirPopUp, setAbrirPopUp ] = useState(false) ;



  return (
    <>
      <div className={style.main}>
        

        <div className={style.container}>
              <h2>Lista de Emprestimos</h2>
              <div className={style.barraPesquisaEmprestimo}>
                <BarraDePesquisa />
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
            <tr>
              <td>João</td>
              <td>The Witcher</td>
              <td>27/09/2024</td>
              <td>10/10/2024</td>
              <td>Em dia</td>
              <td>99812232</td>
              <td><Buttons title='Mais Info' variant='info' onClick={()=> setAbrirPopUp(true)} /></td>
              <td><Buttons title='Devolvido' variant='confirmacao'/></td>
            </tr>
            <tr>
              <td>Lucas</td>
              <td>The Witcher</td>
              <td>27/09/2024</td>
              <td>10/10/2024</td>
              <td>Em dia</td>
              <td>99812232</td>
              <td><Buttons title='Mais Info' variant='info' onClick={()=> setAbrirPopUp(true)} /></td>
              <td><Buttons title='Devolvido' variant='confirmacao'/></td>
            </tr>
          </tbody>
        </table>

        </div>

        {abrirPopUp && (
            <div className={style.popup}>
            <div className={style.popupContent}>
              <div>
                <p>Nome: Saulo</p>
                <p>Cpf: 123.233.230.09</p>
              </div>
              <div>
                <p>Telefone: 37 9 9892849</p>
                <p>E-mail: Saulo@gmail.com</p>
              </div>
              <div>
                <p> Rua: Floriano Peixoto</p>
              </div>
              <div>
                <p> Bairro: Vila Tavares</p>
              </div>
                
              <div>
                <p> Cidade: Bom despacho</p>
                <p> Numero: 102</p>
              </div>
              <Buttons title='Fechar' variant='delete' onClick={()=> setAbrirPopUp(false)}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
