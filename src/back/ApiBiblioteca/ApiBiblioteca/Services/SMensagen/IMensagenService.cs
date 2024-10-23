using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.SMensagen
{
        public interface IMensagemService
        {
            Task<IEnumerable<Mensagen>> GetMensagens();
            Task DeleteMensagen(int id);
            Task UpdateMensagen(Mensagen mensagem);
            Task CreateMensagen(Mensagen mensagem);
        }
}
