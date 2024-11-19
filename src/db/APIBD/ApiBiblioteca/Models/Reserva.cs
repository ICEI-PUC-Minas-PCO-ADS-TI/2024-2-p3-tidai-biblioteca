using System;
using System.Collections.Generic;

namespace ApiBiblioteca.Models;

public partial class Reserva
{
    public int Id { get; set; }

    public int? UsuarioId { get; set; }

    public int? LivroId { get; set; }

    public DateOnly DataReserva { get; set; }

    public virtual Livro? Livro { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
