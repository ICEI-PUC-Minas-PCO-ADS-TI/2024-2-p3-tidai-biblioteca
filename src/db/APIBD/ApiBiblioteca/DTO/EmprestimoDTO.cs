namespace ApiBiblioteca.DTO
{
    public class EmprestimoDTO
    {

        public int Id { get; set; }
        public int IdEmprestimo { get; set; }
        public string NomeLivro { get; set; }
        public string NomeUsuario { get; set; }
        public string CapaUrl {  get; set; }
        public string Autor {  get; set; }
        public string Editora { get; set; }
        public string Telefone { get; set; }
        public string? Status { get; set; }
        public DateOnly DataEmprestimo { get; set; }
        public DateOnly DataDevolucao { get; set; }


    }
}
