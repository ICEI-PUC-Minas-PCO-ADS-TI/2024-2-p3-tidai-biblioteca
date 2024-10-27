using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.SEmprestimo
{
    public interface IEmprestimoService
    {
        Task<IEnumerable<EmprestimoDTO>> GetEmprestimoDTO();
        Task<IEnumerable<Emprestimo>> GetEmprestimos();
        Task<Emprestimo> GetEmprestimoPorId(int id);
        Task<string> CreateEmprestimo(CreateEmprestimoDTO emprestimoDTO);
        Task DeleteEmprestimo (Emprestimo emprestimo);
        Task Renovacao (int id);
    }
}
