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
        public async Task CreateUsuario(CreateUsuarioDTO usuarioDTO)
        {
            var usuario = new Usuario
            {
                Nome = usuarioDTO.Nome,
                Email = usuarioDTO.Email,
                Cpf = usuarioDTO.Cpf,
                Cep = usuarioDTO.Cep,
                Rua = usuarioDTO.Rua,
                Bairro = usuarioDTO.Bairro,
                Cidade = usuarioDTO.Cidade,
                Uf = usuarioDTO.Uf,
                NumeroCasa = usuarioDTO.NumeroCasa,
                Telefone = usuarioDTO.Telefone,
                DataNascimento = usuarioDTO.DataNascimento,
                Senha = usuarioDTO.Senha,
            };
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateUsuario(UsuarioDTO usuarioDto)
        {
            var usuario = await _context.Usuarios.FindAsync(usuarioDto.Id);

            if (usuario == null)
            {
                throw new Exception($"Usuário com ID {usuarioDto.Id} não encontrado.");
            }

            usuario.Nome = usuarioDto.Nome;
            usuario.Email = usuarioDto.Email;
            usuario.Cpf = usuarioDto.Cpf;
            usuario.Cep = usuarioDto.Cep;
            usuario.Rua = usuarioDto.Rua;
            usuario.Bairro = usuarioDto.Bairro;
            usuario.Cidade = usuarioDto.Cidade;
            usuario.Uf = usuarioDto.Uf;
            usuario.NumeroCasa = usuarioDto.NumeroCasa;
            usuario.Telefone = usuarioDto.Telefone;
            usuario.Senha = usuarioDto.Senha;
            usuario.DataNascimento = usuarioDto.DataNascimento;

            _context.Usuarios.Update(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteUsuario (Usuario usuario)
        {

             _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
        }
        
        public async Task<IEnumerable<Usuario>> PesquisarUsuario(string nome)
        {
            nome = nome.ToLower();

            var usuarios = await _context.Usuarios
                .Where(l => l.Nome.ToLower().Contains(nome)).ToListAsync();

            return usuarios;

        }
        public async Task<IEnumerable<ReservaDTO>> GetReservasUsuario(int id)
        {
            return await _context.Reservas
                  .Where(r => r.UsuarioId == id)
                  .Select(r => new ReservaDTO
                  {
                      NomeUsuario = r.Usuario.Nome,
                      NomeLivro = r.Livro.Titulo,
                      Autor = r.Livro.Autor,
                      CapaUrl = r.Livro.CapaUrl,
                      Editora = r.Livro.Editora,
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
                             Autor = e.Livro.Autor,
                             CapaUrl = e.Livro.CapaUrl,
                             Editora = e.Livro.Editora,
                             DataEmprestimo = e.DataEmprestimo, 
                             DataDevolucao = e.DataDevolucao 
                         })
                         .ToListAsync();
        }
    }
}
