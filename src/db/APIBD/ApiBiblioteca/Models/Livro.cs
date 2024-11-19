using System;
using System.Collections.Generic;

namespace ApiBiblioteca.Models;

public partial class Livro
{
    public int Id { get; set; }

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

    public virtual ICollection<Emprestimo> Emprestimos { get; set; } = new List<Emprestimo>();

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
