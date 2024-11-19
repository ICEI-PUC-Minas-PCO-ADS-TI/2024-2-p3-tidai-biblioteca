using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SReserva;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles = "administrador")]
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

        [Authorize(Roles = "leitor,administrador")]
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

        [Authorize(Roles = "administrador")]
        [HttpGet]
        [SwaggerOperation(Summary = "Lista todas as reservas")]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReserva()
        {
            var reservas = await _reservaService.GetReserva();
            return Ok(reservas);
        }

        [Authorize(Roles = "administrador")]
        [HttpGet("/usuario/livro")]
        [SwaggerOperation(Summary = "Lista reservas com dados de usuário e livro")]
        public async Task<ActionResult<IEnumerable<ReservaDTO>>> GetReservas()
        {
            var reservas = await _reservaService.GetReservas();
            return Ok(reservas);
        }

        [Authorize(Roles = "administrador")]
        [HttpPost("/reserva/retirada/{id}")]
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

        [Authorize(Roles = "administrador")]
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
