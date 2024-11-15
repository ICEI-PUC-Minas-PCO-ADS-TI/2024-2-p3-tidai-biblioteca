using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SUsuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBiblioteca.Controllers
{
    [Route("usuarios")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuariosService)
        {
            _usuarioService = usuariosService;
        }

       
        [HttpGet]
        [SwaggerOperation(Summary = "Retorna todos os usuarios")]
        public async Task<ActionResult<IAsyncEnumerable<Usuario>>> GetUsuarios()
        {
            var usuarios = await _usuarioService.GetUsuarios();
            return Ok(usuarios);
        }

        [Authorize(Roles = "administrador")]
        [HttpGet("{id:int}")]
        [SwaggerOperation(Summary = "Retorna usario por id")]
        public async Task<ActionResult<Usuario>> GetUsuarioId(int id)
        {
            var usuario = await _usuarioService.GetUsuarioId(id);
            if (usuario == null)
            {
                return NotFound($"Não existe aluno com id ={id}");
            }
            return Ok(usuario);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Cria um usuario")]
        public async Task<ActionResult> CreateUsuario(CreateUsuarioDTO usuarioDTO)
        {
            await _usuarioService.CreateUsuario(usuarioDTO);
            return Ok("Usuario criado com sucesso");
        }

        [Authorize(Roles = "leitor,administrador")]
        [HttpPut("{id:int}")]
        [SwaggerOperation(Summary = "Edita um usuario")]
        public async Task<ActionResult> Edit(int id, [FromBody] UsuarioDTO usuarioDto)
        {
            if (usuarioDto.Id != id)
            {
                return BadRequest("O ID do corpo da requisição não corresponde ao ID da URL.");
            }

            try
            {
                await _usuarioService.UpdateUsuario(usuarioDto);
                return Ok($"Usuário com ID {id} foi atualizado com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

            [Authorize(Roles = "administrador")]
        [HttpGet("pesquisar")]
        [SwaggerOperation(Summary = "Pesquisa um usuario")]
        public async Task<ActionResult<Usuario>> PesquisarLivro(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome))
            {
                throw new ArgumentException("O nome do usuario não pode ser nulo ou vazio.", nameof(nome));
            }
            var livro = await _usuarioService.PesquisarUsuario(nome);
            return Ok(livro);
        }

        //[Authorize(Roles = "leitor,administrador")]
        [HttpDelete("{id:int}")]
        [SwaggerOperation(Summary = "Deleta um usuario")]
        public async Task<ActionResult> DeleteUsuario(int id)
        {
            var usuario = await _usuarioService.GetUsuarioId(id);
            if (usuario == null)
            {
                return NotFound($"Usuário com id={id} não encontrado");
            }

            await _usuarioService.DeleteUsuario(usuario);
            return Ok($"Usuário de id: {id} foi excluído com sucesso");
        }

        [Authorize(Roles = "leitor,administrador")]
        [HttpGet("emprestimos")]
        [SwaggerOperation(Summary = "Retorna os emprestimos de um determinado usuario")]
        public async Task<ActionResult<Emprestimo>> GetEmprestimosUsuario(int id)
        {
            var emprestimos = await _usuarioService.GetEmprestimoUsuario(id);
            return Ok(emprestimos);
        }

        [Authorize(Roles = "leitor,administrador")]
        [HttpGet("reservas")]
        [SwaggerOperation(Summary = "Retorna os reservas de um determinado usuario")]
        public async Task<ActionResult<Emprestimo>> GetReservaUsuario(int id)
        {
            var reservas = await _usuarioService.GetReservasUsuario(id);
            return Ok(reservas);
        }
    }
}
