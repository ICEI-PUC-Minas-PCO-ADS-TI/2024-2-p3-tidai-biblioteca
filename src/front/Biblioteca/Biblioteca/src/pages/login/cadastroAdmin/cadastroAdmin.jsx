import style from './cadastroAdmin.module.css'
 
export default function CadastroAdmin(){
    return(
        <>
        <div className={style.main}>
      <div className={style.container}>
        <h1>Cadastro de Bibliotecário</h1>
        <form action="submit" method="post">
          <div className={style.formGroup}>
            <label htmlFor="nome">Nome</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              required 
              placeholder="Digite seu nome completo" 
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className={style.doubleInput}>
            <div className={style.formGroup}>
              <label htmlFor="cpf">CPF</label>
              <input 
                type="text" 
                id="cpf" 
                name="cpf" 
                required 
                placeholder="000.000.000-00"
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="telefone">Telefone</label>
              <input 
                type="tel" 
                id="telefone" 
                name="telefone" 
                placeholder="(XX) XXXXX-XXXX" 
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="data-nascimento">Data de Nascimento</label>
            <input
              type="date"
              id="data-nascimento"
              name="data-nascimento"
              required
            />
          </div>

          <div className={style.doubleInput}>
            <div className={style.formGroup}>
              <label htmlFor="cep">CEP</label>
              <input 
                type="text" 
                id="cep" 
                name="cep" 
                required 
                placeholder="00000-000" 
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="rua">Rua</label>
              <input 
                type="text" 
                id="rua" 
                name="rua" 
                required 
                placeholder="Nome da rua"
              />
            </div>
          </div>

          <div className={style.doubleInput}>
            <div className={style.formGroup}>
              <label htmlFor="bairro">Bairro</label>
              <input 
                type="text" 
                id="bairro" 
                name="bairro" 
                required 
                placeholder="Nome do bairro" 
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="cidade">Cidade</label>
              <input 
                type="text" 
                id="cidade" 
                name="cidade" 
                required 
                placeholder="Nome da cidade" 
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="numero">Número</label>
              <input 
                type="text" 
                id="numero" 
                name="numero" 
                required 
                placeholder="N" 
              />
            </div>
          </div>

          <div className={style.doubleInput}>
            <div className={style.formGroup}>
              <label htmlFor="senha">Senha:</label>
              <input 
                type="password" 
                id="senha" 
                name="senha" 
                required 
                placeholder="Digite uma senha" 
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="confirmar-senha">Confirmar Senha:</label>
              <input
                type="password"
                id="confirmar-senha"
                name="confirmar-senha"
                required
                placeholder="Confirme sua senha"
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
        </>
    )
}