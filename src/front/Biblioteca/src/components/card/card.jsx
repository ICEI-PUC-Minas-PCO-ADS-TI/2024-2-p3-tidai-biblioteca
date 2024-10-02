import style from './card.module.css'

export default function Card(props)
{
    return(
        <div className={style.cardContainer}>
            <div className={style.card}>
              <div className={style.cardImage}>
                <img src={props.img}/>
              </div>
              <div className={style.cardContent}>
                <h3>{props.titulo}</h3>
                <p>Autor: {props.autor}</p>
                <p>Editora: {props.editora}</p>
                <p>Quantidade: {props.qtd}</p>
              </div>
                <div className={style.buttonsCard}>
                  {props.children}
                  
                  
                  </div>
            </div>
        </div>
    )
}