using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SEmprestimo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ApiBiblioteca.Controllers
{
    [Route("emprestimos")]
    [ApiController]
    public class EmprestimoController : ControllerBase
    {
        private readonly IEmprestimoService _emprestimoService;

        public EmprestimoController(IEmprestimoService emprestimoService)
        {
            _emprestimoService = emprestimoService;
        }

        [Authorize(Roles = "administrador")]
        [HttpGet]
        [SwaggerOperation(Summary = "Retorna todos os emprestimos")]
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

        [Authorize(Roles = "leitor,administrador")]
        [HttpGet("{id:int}")]
        [SwaggerOperation(Summary = "Retorna emprestimo por id")]

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
        [Authorize(Roles = "administrador")]
        [HttpGet("usuarios/livros")]
        [SwaggerOperation(Summary = "Retorna emprestimo como nome do livro e o nome do usuario")]
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

        [Authorize(Roles = "administrador")]
        [HttpPost]
        [SwaggerOperation(Summary = "Cria um empréstimo de livro")]
        public async Task<ActionResult> CreateEmprestimo([FromBody] CreateEmprestimoDTO emprestimoDTO)
        {
            var resultado = await _emprestimoService.CreateEmprestimo(emprestimoDTO);

            if (resultado == "Usuário não encontrado.")
            {
                return NotFound(new { mensagem = resultado });
            }
            else if (resultado == "Livro não encontrado.")
            {
                return NotFound(new { mensagem = resultado });
            }
            else if (resultado == "Livro indisponível para empréstimo.")
            {
                return BadRequest(new { mensagem = resultado });
            }

            return Ok(new { mensagem = resultado });
        }

        [Authorize(Roles = "administrador")]
        [HttpDelete("{id:int}")]
        [SwaggerOperation(Summary = "Deleta um emprestimo")]
        public async Task<ActionResult> DeleteEmprestimo(int id)
        {
            try
            {
                var emprestimo = await _emprestimoService.GetEmprestimoPorId(id);
                if (emprestimo != null)
                {
                    await _emprestimoService.DeleteEmprestimo(emprestimo);
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

        [Authorize(Roles = "leitor,administrador")]
        [HttpPut]
        [SwaggerOperation(Summary = "Renova um emprestimo para mais 7 dias")]
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
