using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace ApiBiblioteca.Services.SReserva
{
    public class ReservaService : IReservaService
    {
        private readonly BibliotecaContext _context;

        public ReservaService(BibliotecaContext context)
        {
            _context = context;
        }
        //Função que carrega a tabela de reserva, retornando apenas ids
        public async Task<IEnumerable<Reserva>> GetReserva()
        {
                return await _context.Reservas.ToListAsync();
        }

        //Função que retorna as reservas com nome do usuario e do livro
        public async Task<IEnumerable<ReservaDTO>> GetReservas()
        {

                var reservaTarget = await _context.Reservas.ToListAsync();

                var reservasDto = new List<ReservaDTO>();

                foreach (var reserva in reservaTarget)
                {
                    var nomeUsuario = await _context.Usuarios.FindAsync(reserva.UsuarioId);
                    var nomeLivro = await _context.Livros.FindAsync(reserva.LivroId);
                    var idReserva = await _context.Reservas.FindAsync(reserva.Id);

                    var reservaDto = new ReservaDTO
                    {
                        Id = idReserva.Id,
                        NomeLivro = nomeLivro?.Titulo,
                        NomeUsuario = nomeUsuario?.Nome,
                        DataReserva = reserva.DataReserva,
                    };
                    reservasDto.Add(reservaDto);
                }
                return reservasDto;
        }


        public async Task CreateReserva(int UsuarioId, int LivroId)
        {
            var usuario = await _context.Usuarios.Include(u => u.Reservas)
                                                  .FirstOrDefaultAsync(u => u.Id == UsuarioId);

            if (usuario != null)
            {
                var _reserva = new Reserva
                {
                    UsuarioId = UsuarioId,
                    LivroId = LivroId,
                    DataReserva = DateOnly.FromDateTime(DateTime.Now)
                };

                usuario.Reservas.Add(_reserva); 
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteReserva(int idReserva)
        {
            var reserva = await _context.Reservas.FindAsync(idReserva);
            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();
        }


        public async Task<Reserva> GetReservaPorId(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            return reserva;

        }

        //Trasnforma uma reserva em emprestimo
        public async Task TransferenciaParaEmprestimo(Reserva reserva)
        {
            var usuario = await _context.Usuarios.Include(u => u.Emprestimos)
                                                  .FirstOrDefaultAsync(u => u.Id == reserva.UsuarioId);

            if (usuario != null)
            {
                var emprestimo = new Emprestimo
                {
                    LivroId = reserva.LivroId,
                    UsuarioId = reserva.UsuarioId,
                    DataEmprestimo = DateOnly.FromDateTime(DateTime.Now),
                    DataDevolucao = DateOnly.FromDateTime(DateTime.Now.AddDays(7))
                };

                usuario.Emprestimos.Add(emprestimo);
                await _context.SaveChangesAsync();
            }
        }

    }
}