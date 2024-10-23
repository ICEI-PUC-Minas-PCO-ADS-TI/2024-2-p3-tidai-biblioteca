using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.STopicos
{
    public interface ITopicoService
    {
        Task<IEnumerable<Topico>> GetTopicos();
        Task DeleteTopico (int id);
        Task UpdateTopico(Topico topico);
        Task createTopico (Topico topico);
    }
}
