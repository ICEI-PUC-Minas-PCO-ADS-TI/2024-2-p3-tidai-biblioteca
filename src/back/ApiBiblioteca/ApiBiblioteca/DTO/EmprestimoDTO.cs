namespace ApiBiblioteca.DTO
{
    public class EmprestimoDTO
    {

        public int Id { get; set; }
        public string NomeLivro { get; set; }
        public string NomeUsuario { get; set; }
        public string? Status { get; set; }
        public DateOnly DataEmprestimo { get; set; }
        public DateOnly DataDevolucao { get; set; }


    }
}
