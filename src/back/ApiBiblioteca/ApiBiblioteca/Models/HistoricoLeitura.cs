using System;
using System.Collections.Generic;

namespace ApiBiblioteca.Models;

public partial class HistoricoLeitura
{
    public int Id { get; set; }

    public int? UsuarioId { get; set; }

    public int? LivroId { get; set; }

    public DateOnly DataLeitura { get; set; }

    public virtual Livro Livro { get; set; } = null!;

    public virtual Usuario Usuario { get; set; } = null!;
}
