using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SReserva;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBiblioteca.Controllers
{
    [Route("reserva")]
    [ApiController]
    public class ReservasController : ControllerBase
    {
        private readonly IReservaService _reservaService;

        public ReservasController(IReservaService reservaService)
        {
            _reservaService = reservaService;
        }

        [HttpGet("{id:int}", Name = "GetReserva")]
        [SwaggerOperation(Summary = "Obtém uma reserva por ID")]
        public async Task<ActionResult<Reserva>> GetReservaId(int id)
        {
            var reserva = await _reservaService.GetReservaPorId(id);
            if (reserva == null)
            {
                return NotFound($"Não existe reserva com id = {id}");
            }
            return Ok(reserva);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Cria uma nova reserva de livro")]
        public async Task<ActionResult> CreateReserva([FromBody] CreateReservaDTO reservaDTO)
        {
            var resultado = await _reservaService.CreateReserva(reservaDTO);
            if (resultado == "Usuário não encontrado.")
            {
                return NotFound(new { mensagem = resultado });
            }
            else if (resultado == "Livro não encontrado.")
            {
                return NotFound(new { mensagem = resultado });
            }
            else if (resultado == "Livro indisponível para reserva.")
            {
                return BadRequest(new { mensagem = resultado });
            }

            return Ok(new { mensagem = resultado });
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Lista todas as reservas")]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReserva()
        {
            var reservas = await _reservaService.GetReserva();
            return Ok(reservas);
        }

        [HttpGet("/usuario/livro")]
        [SwaggerOperation(Summary = "Lista reservas com dados de usuário e livro")]
        public async Task<ActionResult<IEnumerable<ReservaDTO>>> GetReservas()
        {
            var reservas = await _reservaService.GetReservas();
            return Ok(reservas);
        }

        [HttpPost("/emprestimo{id}")]
        [SwaggerOperation(Summary = "Converte uma reserva em empréstimo")]
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
        [SwaggerOperation(Summary = "Deleta uma reserva por ID")]
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
