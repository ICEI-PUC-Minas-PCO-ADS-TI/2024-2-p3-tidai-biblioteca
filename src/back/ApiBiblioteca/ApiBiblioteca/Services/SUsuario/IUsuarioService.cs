using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.SUsuario
{
    public interface IUsuarioService
    {
        Task<IEnumerable<Usuario>> GetUsuarios();
        Task<Usuario> GetUsuarioId(int id);
        Task<IEnumerable<Usuario>> PesquisarLivro(string nome);
        Task<IEnumerable<ReservaDTO>> GetReservasUsuario(int id);
        Task<IEnumerable<EmprestimoDTO>> GetEmprestimoUsuario(int id);
        Task DeleteUsuario(Usuario usuario);
        Task CreateUsuario(CreateUsuarioDTO usuarioDTO);
        Task UpdateUsuario(Usuario usuario);
    }
}
