namespace ApiBiblioteca.DTO
{
    public class UsuarioDTO
    {
        public int Id { get; set; }

        public string Nome { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Cpf { get; set; } = null!;

        public string Cep { get; set; } = null!;

        public string Rua { get; set; } = null!;

        public string Bairro { get; set; } = null!;

        public string Cidade { get; set; } = null!;

        public string Uf { get; set; } = null!;

        public int NumeroCasa { get; set; }

        public string Telefone { get; set; } = null!;

        public DateOnly? DataNascimento { get; set; }

        public string Senha { get; set; } = null!;
    }
}
