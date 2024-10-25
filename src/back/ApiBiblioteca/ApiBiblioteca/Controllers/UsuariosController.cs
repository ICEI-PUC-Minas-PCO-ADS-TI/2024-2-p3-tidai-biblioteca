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

        [Authorize(Roles = "leitor,administrador")]
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
            var usuario = await _usuarioService.CreateUsuario(usuarioDTO);
            return CreatedAtRoute("GetAlunoPorId", new { id = usuario.Id }, usuario);
        }

        [HttpPut("{id:int}")]
        [SwaggerOperation(Summary = "Edita um usuario")]
        public async Task<ActionResult> Edit(int id, [FromBody] Usuario usuario)
        {
            if (usuario.Id != id)
            {
                return BadRequest("Dados incorretos");
            }

            await _usuarioService.UpdateUsuario(usuario);
            return Ok($"Usuário com id={id} foi atualizado com sucesso");
        }

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

        [HttpGet("emprestimos")]
        [SwaggerOperation(Summary = "Retorna os emprestimos de um determinado usuario")]
        public async Task<ActionResult<Emprestimo>> GetEmprestimosUsuario(int id)
        {
            var emprestimos = await _usuarioService.GetEmprestimoUsuario(id);
            return Ok(emprestimos);
        }

        [HttpGet("reservas")]
        [SwaggerOperation(Summary = "Retorna os reservas de um determinado usuario")]
        public async Task<ActionResult<Emprestimo>> GetReservaUsuario(int id)
        {
            var reservas = await _usuarioService.GetReservasUsuario(id);
            return Ok(reservas);
        }

        [HttpPost("login")]
        [SwaggerOperation(Summary = "Retorna um token jwt")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            var token = await _usuarioService.Authenticate(loginDto.Username, loginDto.Password);

            if (token == null)
            {
                return Unauthorized("Usuário ou senha inválidos");
            }

            return Ok(new { Token = token });
        }
    }
}
