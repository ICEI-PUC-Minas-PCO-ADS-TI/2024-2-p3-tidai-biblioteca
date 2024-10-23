using ApiBiblioteca.Models;
using ApiBiblioteca.Services.STopicos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBiblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicoController : ControllerBase
    {
        private readonly ITopicoService _topicoService;

        public TopicoController(ITopicoService topicoService)
        {
            _topicoService = topicoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topico>>> GetTopicos()
        {
            var topicos = await _topicoService.GetTopicos();
            return Ok(topicos);
        }

        [HttpPost]
        public async Task<ActionResult<Topico>> CreateTopico([FromBody] Topico topico)
        {
            if (topico == null)
            {
                return BadRequest("Tópico inválido.");
            }

            await _topicoService.createTopico(topico);
            return CreatedAtAction(nameof(GetTopicos), new { id = topico.Id }, topico);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTopico(int id, [FromBody] Topico topico)
        {
            if (id != topico.Id)
            {
                return BadRequest("O ID do tópico não corresponde.");
            }

            await _topicoService.UpdateTopico(topico);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTopico(int id)
        {
            await _topicoService.DeleteTopico(id);
            return NoContent();
        }
    }
}
