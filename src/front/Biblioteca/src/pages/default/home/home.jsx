import { useState, useEffect } from 'react';
import style from '../home/home.module.css';
import Card from '../../../components/card/card';

export default function Home() {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        async function fetchLivros() {
            try {
                const token = localStorage.getItem("token")
                const response = await fetch("https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/livros", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setLivros(data);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
            }
        }
        fetchLivros();
    }, []);

    return (
        <>
            <h1>Home Default</h1>
            <div className={style.cardContainer}>
                {livros.map((livro) => (
                    <Card
                        key={livro.id}
                        img={livro.capaUrl} 
                        titulo={livro.titulo}
                        autor={livro.autor}
                        editora={livro.editora}
                        qtd={livro.quantidade}
                    />
                ))}
            </div>
        </>
    );
}
