using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SLivro;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBiblioteca.Controllers
{
    [Route("api/livros")]
    [ApiController]
    public class LivrosController : ControllerBase
    {
        private readonly ILivroService _livroService;

        public LivrosController(ILivroService livroService)
        {
            _livroService = livroService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Livro>>> GetLivros()
        {
            var livros = await _livroService.GetLivros();

            if (livros == null || !livros.Any())
            {
                return NotFound("Nenhum livro encontrado");
            }

            return Ok(livros);
        }

        [HttpGet("{id:int}", Name = "GetLivro")]
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
        public async Task<ActionResult<Livro>> PesquisarLivro(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome))
            {
                throw new ArgumentException("O nome do livro não pode ser nulo ou vazio.", nameof(nome));
            }
            var livro = await _livroService.PesquisarLivro(nome);
            return Ok(livro);
        }
        [HttpGet("filtro")]

        public async Task<ActionResult<Livro>> FiltroLivro(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome))
            {
                throw new ArgumentException("O nome do filtro não pode ser nulo ou vazio.", nameof(nome));
            }
            var livros = await _livroService.FiltroLivro(nome);
            return Ok(livros);
        }

        [HttpGet("autor")]
        public async Task<ActionResult<Object>> GetAutorLivros(){

            var autores = await _livroService.GetAutorLivros();

            if (autores == null || !autores.Any())
            {
                return NotFound("Nenhum livro encontrado");
            }

            return Ok(autores);
        }

        [HttpGet("generos")]
        public async Task<ActionResult<Object>> GetGenerosLivros()
        {
            var generos = await _livroService.GetGeneroLivros();

            if (generos == null || !generos.Any())
            {
                return NotFound("Nenhum livro encontrado");
            }
            return Ok(generos);
        }

        [HttpPost]
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
