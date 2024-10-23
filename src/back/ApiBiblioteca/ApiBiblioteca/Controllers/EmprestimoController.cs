using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SEmprestimo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiBiblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmprestimoController : ControllerBase
    {
        private readonly IEmprestimoService _emprestimoService;

        public EmprestimoController(IEmprestimoService emprestimoService)
        {
            _emprestimoService = emprestimoService;
        }

        [HttpGet]

        public async Task<IActionResult> GetEmprestimo()
        {
            try
            {
                var emprestimo = await _emprestimoService.GetEmprestimos();
                return Ok(emprestimo);
            }
            catch {

                return BadRequest("Livros não encontrador");
            }
        }
        [HttpGet("{id:int}", Name = "GetEmprestimoPorId")]

        public async Task<ActionResult<Emprestimo>> GetEmprestimoPorId(int id)
        {
            try
            {
                var emprestimo = await _emprestimoService.GetEmprestimoPorId(id);
                return Ok(emprestimo);
            }
            catch
            {
                return BadRequest("Emprestimo não encontrado");
            }
        }

        [HttpGet("emprestimoPorNome")]
        public async Task<ActionResult<EmprestimoDTO>> GetEmprestimos()
        {
            try
            {
                var emprestimos = await _emprestimoService.GetEmprestimoDTO();
                return Ok(emprestimos);
            }
            catch
            {
                return BadRequest("Requisição falhou");
            }
        }

        [HttpDelete("{id:int}")]

        public async Task<ActionResult> DeleteEmprestimo(int id)
        {
            try
            {
                var emprestimo = await _emprestimoService.GetEmprestimoPorId(id);
                if (emprestimo != null)
                {
                    _emprestimoService.DeleteEmprestimo(emprestimo);
                    return Ok($"Emprestimo de id: {id} foi excluido com sucesso");
                }
                else
                {
                    return NotFound($"Emprestimo com id={id} não encontrado");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpPut]

        public async Task<ActionResult> Renovacao(int id)
        {
            try
            {
                if (id != null)
                {
                    await _emprestimoService.Renovacao(id);
                    return Ok($"Emprestimo com id: {id} foi renovado");
                }
                else
                {
                    return BadRequest($"Emprestimo com id{id} não encontrado");
                }
            }
            catch {
                return BadRequest("Request inválido");
            }
        }

    }
}
