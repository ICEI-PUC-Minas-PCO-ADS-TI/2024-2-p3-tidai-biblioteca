using ApiBiblioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiBiblioteca.Services.SMensagen
{
    public class MensagenService : IMensagemService
    {
        private readonly BibliotecaContext _context;

        public MensagenService(BibliotecaContext context)
        {
            _context = context;
        }

        public async Task CreateMensagen(Mensagen mensagen)
        {
            _context.Mensagens.Add(mensagen);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteMensagen(int id)
        {
            var mensagen = await _context.Mensagens.FindAsync(id);
            if (mensagen != null)
            {
                _context.Mensagens.Remove(mensagen);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Mensagen>> GetMensagens()
        {
                return await _context.Mensagens.ToListAsync();
        }

        public async Task UpdateMensagen(Mensagen mensagen)
        {
            _context.Entry(mensagen).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
