using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SMensagen;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBiblioteca.Controllers
{
    [Route("mensagens")]
    [ApiController]
    public class MensagensController : ControllerBase
    {
        private readonly IMensagemService _mensagemService;

        public MensagensController(IMensagemService mensagemService)
        {
            _mensagemService = mensagemService;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Obtém todas as mensagens")]
        public async Task<ActionResult<IEnumerable<Mensagen>>> GetMensagens()
        {
            var mensagens = await _mensagemService.GetMensagens();
            return Ok(mensagens);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Cria uma nova mensagem")]
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
        [SwaggerOperation(Summary = "Atualiza uma mensagem existente")]
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
        [SwaggerOperation(Summary = "Exclui uma mensagem por ID")]
        public async Task<ActionResult> DeleteMensagen(int id)
        {
            await _mensagemService.DeleteMensagen(id);
            return NoContent();
        }
    }
}
