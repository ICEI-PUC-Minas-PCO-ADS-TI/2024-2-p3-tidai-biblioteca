using ApiBiblioteca.DTO;
using ApiBiblioteca.Services.SHistorico;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiBiblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoricoController : ControllerBase
    {
        private IHistoricoService _historicoService;
        public HistoricoController(IHistoricoService historico)
        {
                _historicoService = historico;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<HistoricoDTO>> GetHistoricoID(int id)
        {
            try
            {
                var historico = await _historicoService.historicoUsuario(id);
                return Ok(historico);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
