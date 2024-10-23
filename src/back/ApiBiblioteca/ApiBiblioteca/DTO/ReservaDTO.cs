namespace ApiBiblioteca.DTO
{
    public class ReservaDTO
    {
        public int Id { get; set; }
        public string NomeLivro { get; set; }
        public string NomeUsuario {  get; set; }

        public DateOnly DataReserva { get; set; }
    }
}
