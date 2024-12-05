using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.SUsuario
{
    public interface IUsuarioService
    {
        Task<IEnumerable<Usuario>> GetUsuarios();
        Task<Usuario> GetUsuarioId(int id);
        Task<IEnumerable<Usuario>> PesquisarUsuario(string nome);
        Task<IEnumerable<ReservaDTO>> GetReservasUsuario(int id);
        Task<IEnumerable<EmprestimoDTO>> GetEmprestimoUsuario(int id);
        Task DeleteUsuario(Usuario usuario);
        Task CreateUsuario(Usuario usuario);
        Task UpdateUsuario(UsuarioDTO usuario);
    }
}
