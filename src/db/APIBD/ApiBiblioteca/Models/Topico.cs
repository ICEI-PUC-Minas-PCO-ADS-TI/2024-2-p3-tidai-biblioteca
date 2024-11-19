using System;
using System.Collections.Generic;

namespace ApiBiblioteca.Models;

public partial class Topico
{
    public int Id { get; set; }

    public string Titulo { get; set; } = null!;

    public string? Descricao { get; set; }

    public int? UsuarioId { get; set; }

    public DateTime? DataCriacao { get; set; }

    public virtual ICollection<Mensagen> Mensagens { get; set; } = new List<Mensagen>();

    public virtual Usuario? Usuario { get; set; }
}
