
using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiBiblioteca.Services.SHistorico
{
    public class HistoricoService : IHistoricoService
    {
        private readonly BibliotecaContext _bibliotecaContext;

        public HistoricoService(BibliotecaContext bibliotecaContext)
        {
            _bibliotecaContext = bibliotecaContext;
        }
        public async Task CriarHistorico(HistoricoLeitura historico)
        {
                _bibliotecaContext.HistoricoLeituras.Add(historico);
                _bibliotecaContext.SaveChanges();
        }
        public async Task<IEnumerable<HistoricoDTO>> historicoUsuario(int id)
        {
            List<HistoricoDTO> historicoDTO = new List<HistoricoDTO>();

            var historico = await _bibliotecaContext.HistoricoLeituras
                .Where(h => h.UsuarioId == id)
                .ToListAsync();

            foreach (var h in historico)
            {
                var nomeLivro = await _bibliotecaContext.Livros
                    .FirstOrDefaultAsync(hist => hist.Id == h.LivroId);

                if (nomeLivro != null) 
                {
                    var histDTO = new HistoricoDTO()
                    {
                        NomeLivro = nomeLivro.Titulo,
                        DataHistorico = h.DataLeitura,
                    };
                    historicoDTO.Add(histDTO);
                }
            }

            return historicoDTO;
        }

    }
}
