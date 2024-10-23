using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.SReserva
{
    public interface IReservaService
    {
        Task<IEnumerable<ReservaDTO>> GetReservas();
        Task<IEnumerable<Reserva>> GetReserva();
        Task<Reserva> GetReservaPorId(int id);
        Task CreateReserva(int UsuarioId, int LivroId);
        Task DeleteReserva(int idReserva);
        Task TransferenciaParaEmprestimo(Reserva reserva);

    }
}