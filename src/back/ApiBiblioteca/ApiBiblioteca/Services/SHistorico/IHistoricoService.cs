using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.SHistorico
{
    public interface IHistoricoService
    {
        Task<IEnumerable<HistoricoDTO>> historicoUsuario(int id);
        Task CriarHistorico(HistoricoLeitura historico);
    }
}
