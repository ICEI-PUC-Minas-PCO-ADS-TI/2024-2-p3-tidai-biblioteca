using ApiBiblioteca.DTO;
using ApiBiblioteca.Services.SAuthenticaded;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ApiBiblioteca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticatedController : ControllerBase
    {
        private IAutheticatedService _authenticated;

        public AuthenticatedController(IAutheticatedService authenticated)
        {
            _authenticated = authenticated;
        }

        [HttpPost("login")]
        [SwaggerOperation(Summary = "Retorna um token jwt")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            var tokenData = await _authenticated.Login(loginDto.Username, loginDto.Password);

            if (tokenData == null)
            {
                return Unauthorized("Usuário ou senha inválidos");
            }

          
            return Ok(new
            {
                token = tokenData.Token,
                userId = tokenData.UserId
            });
        }
    }
}
