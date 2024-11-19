using ApiBiblioteca.Models;
using ApiBiblioteca.Services.STopicos;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace ApiBiblioteca.Services.STopico
{
    public class TopicoService : ITopicoService
    {
        private readonly BibliotecaContext _context;

        public TopicoService(BibliotecaContext context)
        {
            _context = context;
        }
        public async Task createTopico(Topico topico)
        {
            _context.Topicos.Add(topico);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTopico(int id)
        {
            var topico = await _context.Topicos.FindAsync(id);
            _context.Topicos.Remove(topico);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Topico>> GetTopicos()
        {
                return await _context.Topicos.ToListAsync();
        }

        public async Task UpdateTopico(Topico topico)
        {
            _context.Entry(topico).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
