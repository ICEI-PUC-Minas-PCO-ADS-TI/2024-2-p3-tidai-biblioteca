
using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiBiblioteca.Services.SEmprestimo
{
    public class EmprestimoService : IEmprestimoService

    {
        BibliotecaContext _context;
        public EmprestimoService(BibliotecaContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Emprestimo>> GetEmprestimos()
        {
            return await _context.Emprestimos.ToListAsync();
        }
        public async Task<Emprestimo> GetEmprestimoPorId(int id)
        {
            var emprestimo = await _context.Emprestimos.FindAsync(id);
            return emprestimo;
        }

        public async Task DeleteEmprestimo(Emprestimo emprestimo)
        {
            
            _context.Emprestimos.Remove(emprestimo);
            _context.SaveChanges();
            
        }
        public async Task Renovacao(int id)
        {
            var emprestimoTarget = await _context.Emprestimos.FindAsync(id);

            if (emprestimoTarget != null)
            {
                emprestimoTarget.DataEmprestimo = DateOnly.FromDateTime(DateTime.Now);
                emprestimoTarget.DataDevolucao = DateOnly.FromDateTime(DateTime.Now.AddDays(7));
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Empréstimo não encontrado.");
            }

        }

        public async Task<IEnumerable<EmprestimoDTO>> GetEmprestimoDTO()
        {

                var emprestimoTarget = await _context.Emprestimos.ToListAsync();

                var emprestimosDTO = new List<EmprestimoDTO>();

                foreach (var e in emprestimoTarget)
                {
                    var livro = await _context.Livros.FindAsync(e.LivroId);
                    var usuario = await _context.Usuarios.FindAsync(e.UsuarioId);
                    var idEmprestimo = await _context.Emprestimos.FindAsync(e.Id);

                    var emprestimoDTO = new EmprestimoDTO
                    {
                        Id = e.Id,
                        NomeLivro = livro.Titulo,
                        NomeUsuario = usuario.Nome,
                        DataDevolucao = e.DataDevolucao,
                        DataEmprestimo = e.DataEmprestimo,
                        Status = e.Status,
                    };

                    emprestimosDTO.Add(emprestimoDTO);

                }
                return emprestimosDTO;
        }

    }
}
