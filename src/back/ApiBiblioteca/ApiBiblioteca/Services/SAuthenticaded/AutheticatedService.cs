
using ApiBiblioteca.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiBiblioteca.Services.SAuthenticaded
{
    public class AutheticatedService : IAutheticatedService
    {
        private readonly BibliotecaContext _context;
        private readonly IConfiguration _configuration;

       public AutheticatedService (BibliotecaContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<string> Login(string username, string password)
        {
            var user = await _context.Usuarios.SingleOrDefaultAsync(u => u.Nome == username && u.Senha == password);
            if (user == null)
            {
                return null;
            }

            string userRole;
            if (username == "admin" && password == "1234")
            {
                userRole = "administrador";
            }
            else
            {
                userRole = "leitor";
            }

            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Nome),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, userRole)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
