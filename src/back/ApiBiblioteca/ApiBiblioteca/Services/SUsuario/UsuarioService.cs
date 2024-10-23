using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiBiblioteca.Services.SUsuario
{
    public class UsuarioService : IUsuarioService
    {
        private readonly BibliotecaContext _context;
        private readonly IConfiguration _configuration;
        public UsuarioService(BibliotecaContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<IEnumerable<Usuario>> GetUsuarios()
        {
                return await _context.Usuarios.ToListAsync();

        }
        public async Task<Usuario> GetUsuarioId(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            return usuario;
        }
        public async Task CreateUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateUsuario(Usuario usuario)
        {
            _context.Entry(usuario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task DeleteUsuario (Usuario usuario)
        {

             _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<ReservaDTO>> GetReservasUsuario(int id)
        {
          return await _context.Reservas
                .Where(r => r.UsuarioId == id)
                .Select(r=> new ReservaDTO
                {
                    NomeUsuario = r.Usuario.Nome,
                    NomeLivro = r.Livro.Titulo,
                    DataReserva = r.DataReserva
                })
                
                .ToListAsync();
        }

        public async Task<IEnumerable<EmprestimoDTO>> GetEmprestimoUsuario(int id)
        {
            return await _context.Emprestimos
                         .Where(e => e.UsuarioId == id) 
                         .Include(e => e.Livro)
                         .Select(e => new EmprestimoDTO
                         {
                             NomeLivro = e.Livro.Titulo,
                             NomeUsuario = e.Usuario.Nome,
                             Status = e.Status,
                             DataEmprestimo = e.DataEmprestimo, 
                             DataDevolucao = e.DataDevolucao 
                         })
                         .ToListAsync();
        }


        public async Task<string> Authenticate(string username, string password)
        {
            // Validar o usuário no banco de dados
            var user = await _context.Usuarios.SingleOrDefaultAsync(u => u.Nome == username && u.Senha == password);
            if (user == null)
            {
                return null; // Autenticação falhou
            }

            // Gerar o token JWT
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Nome),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
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
