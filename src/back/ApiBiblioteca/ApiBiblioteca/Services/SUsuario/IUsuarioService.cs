using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.SUsuario
{
    public interface IUsuarioService
    {
        Task<string> Authenticate(string username, string password);
        Task<IEnumerable<Usuario>> GetUsuarios();
        Task<Usuario> GetUsuarioId(int id);
        Task<IEnumerable<ReservaDTO>> GetReservasUsuario(int id);
        Task<IEnumerable<EmprestimoDTO>> GetEmprestimoUsuario(int id);
        Task DeleteUsuario(Usuario usuario);
        Task CreateUsuario(Usuario usuario);
        Task UpdateUsuario(Usuario usuario);
    }
}
