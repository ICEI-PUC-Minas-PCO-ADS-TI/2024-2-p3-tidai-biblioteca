using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SMensagen;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBiblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MensagensController : ControllerBase
    {
        private readonly IMensagemService _mensagemService;

        public MensagensController(IMensagemService mensagemService)
        {
            _mensagemService = mensagemService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mensagen>>> GetMensagens()
        {
            var mensagens = await _mensagemService.GetMensagens();
            return Ok(mensagens);
        }

        [HttpPost]
        public async Task<ActionResult<Mensagen>> CreateMensagen([FromBody] Mensagen mensagen)
        {
            if (mensagen == null)
            {
                return BadRequest("Mensagen inválida.");
            }

            await _mensagemService.CreateMensagen(mensagen);
            return CreatedAtAction(nameof(GetMensagens), new { id = mensagen.Id }, mensagen);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMensagen(int id, [FromBody] Mensagen mensagen)
        {
            if (id != mensagen.Id)
            {
                return BadRequest("O ID da mensagen não corresponde.");
            }

            await _mensagemService.UpdateMensagen(mensagen);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMensagen(int id)
        {
            await _mensagemService.DeleteMensagen(id);
            return NoContent();
        }
    }
}
