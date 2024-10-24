using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.SLivro
{
    public interface ILivroService
    {
        Task<IEnumerable<Livro>> GetLivros();
        Task<IEnumerable<Object>> GetAutorLivros();
        Task <IEnumerable<Object>> GetGeneroLivros();
        Task<IEnumerable<Livro>> FiltroLivro(string nome);
        Task<IEnumerable<Livro>>PesquisarLivro(string nome);
        Task<Livro> GetLivroPorId(int id);
        Task CreateLivro(Livro livro);
        Task UpdateLivro(Livro livro);
        Task DeleteLivro(Livro livro);
    }
}
