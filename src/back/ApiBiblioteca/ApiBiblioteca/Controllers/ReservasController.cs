using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SReserva;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBiblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservasController : ControllerBase
    {
        private readonly IReservaService _reservaService;

        public ReservasController(IReservaService reservaService)
        {
            _reservaService = reservaService;
        }

        [HttpGet("{id:int}", Name = "GetReserva")]
        public async Task<ActionResult<Reserva>> GetReservaId(int id)
        {
            var reserva = await _reservaService.GetReservaPorId(id);
            if (reserva == null)
            {
                return NotFound($"Não existe reserva com id = {id}");
            }
            return Ok(reserva);
        }

        [HttpPost("createReservas")]
        public async Task<IActionResult> CreateReserva([FromBody] CreateReservaDTO reserva)
        {
            if (reserva == null)
            {
                return BadRequest("Reserva inválida.");
            }

            await _reservaService.CreateReserva(reserva.UsuarioId, reserva.LivroId);
            return Ok($"Reserva com IdUsuario: {reserva.UsuarioId} e IdLivro: {reserva.LivroId} criada com sucesso");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReserva()
        {
            var reservas = await _reservaService.GetReserva();
            return Ok(reservas);
        }

        [HttpGet("reversasPorNome")]
        public async Task<ActionResult<IEnumerable<ReservaDTO>>> GetReservas()
        {
            var reservas = await _reservaService.GetReservas();
            return Ok(reservas);
        }

        [HttpPost("transferenciaEmprestimo/{id}")]
        public async Task<ActionResult> TransferenciaParaEmprestimo(int id)
        {
            var reserva = await _reservaService.GetReservaPorId(id);
            if (reserva == null)
            {
                return NotFound($"Reserva com id = {id} não encontrada.");
            }

            await _reservaService.TransferenciaParaEmprestimo(reserva);
            await _reservaService.DeleteReserva(id);
            return Ok("Transferência concluída com sucesso");
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteReserva(int id)
        {
            var reserva = await _reservaService.GetReservaPorId(id);
            if (reserva == null)
            {
                return NotFound($"Reserva com id = {id} não encontrada.");
            }

            await _reservaService.DeleteReserva(id);
            return Ok($"Reserva de id: {id} removida com sucesso");
        }
    }
}
