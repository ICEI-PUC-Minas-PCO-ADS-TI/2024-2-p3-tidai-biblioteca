
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
            var livro = await _context.Livros.FindAsync(emprestimo.LivroId);
            livro.Quantidade++;
            _context.Emprestimos.Remove(emprestimo);
            await _context.SaveChangesAsync();
            
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
        public async Task<string> CreateEmprestimo(CreateEmprestimoDTO emprestimoDTO)
        {
            
            var usuario = await _context.Usuarios.FindAsync(emprestimoDTO.UsuarioId);
            if (usuario == null)
            {
                return "Usuário não encontrado.";
            }

            
            var livro = await _context.Livros.FindAsync(emprestimoDTO.LivroId);
            if (livro == null)
            {
                return "Livro não encontrado.";
            }
            if (livro.Quantidade <= 0)
            {
                return "Livro indisponível para empréstimo.";
            }

            var emprestimo = new Emprestimo
            {
                LivroId = emprestimoDTO.LivroId,
                UsuarioId = emprestimoDTO.UsuarioId,
                DataEmprestimo = DateOnly.FromDateTime(DateTime.Now),
                DataDevolucao = DateOnly.FromDateTime(DateTime.Now.AddDays(7))
            };
            livro.Quantidade--;
            _context.Emprestimos.Add(emprestimo);
            await _context.SaveChangesAsync();

            return $"Empréstimo com IdUsuario: {emprestimoDTO.UsuarioId} e IdLivro: {emprestimoDTO.LivroId} criado com sucesso.";
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
