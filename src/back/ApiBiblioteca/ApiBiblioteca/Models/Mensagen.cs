using System;
using System.Collections.Generic;

namespace ApiBiblioteca.Models;

public partial class Mensagen
{
    public int Id { get; set; }

    public int? TopicoId { get; set; }

    public int? MensagemId { get; set; }

    public string Conteudo { get; set; } = null!;

    public int? UsuarioId { get; set; }

    public DateTime? DataCriacao { get; set; }

    public virtual ICollection<Mensagen> InverseMensagem { get; set; } = new List<Mensagen>();

    public virtual Mensagen? Mensagem { get; set; }

    public virtual Topico? Topico { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
