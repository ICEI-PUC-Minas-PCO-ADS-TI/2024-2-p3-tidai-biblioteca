namespace ApiBiblioteca.DTO
{
    public class ReservaDTO
    {
        public int Id { get; set; }
        public string NomeLivro { get; set; }
        public string NomeUsuario {  get; set; }
        public string CapaUrl { get; set; }
        public string Autor { get; set; }
        public string Editora { get; set; }
        public string Telefone { get; set; }
        public DateOnly DataReserva { get; set; }
        public DateOnly DataExpiracao { get; set; }
    }
}
