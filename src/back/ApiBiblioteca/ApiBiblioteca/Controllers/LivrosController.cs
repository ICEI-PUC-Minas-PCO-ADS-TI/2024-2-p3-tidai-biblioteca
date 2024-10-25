using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SLivro;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBiblioteca.Controllers
{
    [Route("livros")]
    [ApiController]
    public class LivrosController : ControllerBase
    {
        private readonly ILivroService _livroService;

        public LivrosController(ILivroService livroService)
        {
            _livroService = livroService;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Retorna todos os livros")]
        public async Task<ActionResult<IEnumerable<Livro>>> GetLivros()
        {
            var livros = await _livroService.GetLivros();

            if (livros == null || !livros.Any())
            {
                return NotFound("Nenhum livro encontrado");
            }

            return Ok(livros);
        }

        [HttpGet("{id:int}")]
        [SwaggerOperation(Summary = "Retorna livro por id")]
        public async Task<ActionResult<Livro>> GetLivroId(int id)
        {
            var livro = await _livroService.GetLivroPorId(id);
            if (livro == null)
            {
                return NotFound($"Não existe livro com id = {id}");
            }
            return Ok(livro);
        }

        [HttpGet("pesquisar")]
        [SwaggerOperation(Summary = "Pesquisa um livro")]
        public async Task<ActionResult<Livro>> PesquisarLivro(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome))
            {
                throw new ArgumentException("O nome do livro não pode ser nulo ou vazio.", nameof(nome));
            }
            var livro = await _livroService.PesquisarLivro(nome);
            return Ok(livro);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Cria um livro")]
        public async Task<ActionResult> CreateLivro([FromBody] Livro livro)
        {
            if (livro == null)
            {
                return BadRequest("Livro inválido.");
            }

            await _livroService.CreateLivro(livro);
            return CreatedAtRoute("GetLivro", new { id = livro.Id }, livro);
        }

        [HttpPut("{id:int}")]
        [SwaggerOperation(Summary = "Edita um livro")]
        public async Task<ActionResult> EditLivro(int id, [FromBody] Livro livro)
        {
            if (livro.Id != id)
            {
                return BadRequest("ID inválido.");
            }

            await _livroService.UpdateLivro(livro);
            return Ok($"Livro com id: {id} atualizado com sucesso");
        }

        [HttpDelete("{id:int}")]
        [SwaggerOperation(Summary = "Deleta um livro")]
        public async Task<ActionResult> DeleteLivro(int id)
        {
            var livro = await _livroService.GetLivroPorId(id);
            if (livro == null)
            {
                return NotFound($"Livro com id = {id} não encontrado");
            }

            await _livroService.DeleteLivro(livro);
            return Ok($"Livro de id: {id} foi excluído com sucesso");
        }
    }
}
