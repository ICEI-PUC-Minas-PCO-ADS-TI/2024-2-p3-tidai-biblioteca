using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SLivro;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles = "leitor,administrador")]
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

        [Authorize(Roles = "leitor,administrador")]
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


        [Authorize(Roles = "leitor,administrador")]
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

        [Authorize(Roles = "administrador")]
        [HttpPost]
        [SwaggerOperation(Summary = "Cria um livro")]
        public async Task<ActionResult> CreateLivro([FromBody] CreateLivroDTO livroDTO)
        {
            if (livroDTO == null)
            {
                return BadRequest("Livro inválido.");
            }

            await _livroService.CreateLivro(livroDTO);
            return Ok("Livro cadastrado com sucesso");
        }

        [Authorize(Roles = "administrador")]
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

        [Authorize(Roles = "administrador")]
        [HttpDelete("{id:int}")]
        [SwaggerOperation(Summary = "Deleta um livro")]
        public async Task<ActionResult> DeleteLivro(int id)
        {
            try
            {
                // Obtém o livro pelo ID
                var livro = await _livroService.GetLivroPorId(id);

                // Verifica se o livro foi encontrado
                if (livro == null)
                {
                    return NotFound($"Livro com id = {id} não encontrado.");
                }

                // Tenta excluir o livro
                await _livroService.DeleteLivro(livro);

                // Retorna sucesso
                return Ok($"Livro de id: {id} foi excluído com sucesso.");
            }
            catch (InvalidOperationException ex)
            {
                // Captura erros específicos de operação inválida (ex.: livro emprestado/reservado)
                Console.WriteLine($"Erro ao tentar excluir livro: {ex.Message}");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                // Captura erros gerais inesperados
                Console.WriteLine($"Erro inesperado ao excluir livro: {ex.Message}");
                return StatusCode(500, "Ocorreu um erro inesperado ao excluir o livro.");
            }
        }


    }
}
