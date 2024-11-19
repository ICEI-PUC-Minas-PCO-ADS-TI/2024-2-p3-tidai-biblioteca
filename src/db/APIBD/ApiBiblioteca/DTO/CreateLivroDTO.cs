namespace ApiBiblioteca.DTO
{
    public class CreateLivroDTO
    {
        public string Titulo { get; set; } = null!;

        public string Autor { get; set; } = null!;

        public string Editora { get; set; } = null!;

        public int Edicao { get; set; }

        public long NumeroPaginas { get; set; }

        public string Genero { get; set; } = null!;

        public int Quantidade { get; set; }

        public string? Descricao { get; set; }

        public string CapaUrl { get; set; } = null!;

        public DateOnly? AnoLivro { get; set; }

    }
}
