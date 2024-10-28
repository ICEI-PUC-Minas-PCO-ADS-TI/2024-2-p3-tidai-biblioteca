﻿using ApiBiblioteca.DTO;
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
        public async Task<IEnumerable<Usuario>> PesquisarLivro(string nome)
        {
            nome = nome.ToLower();

            var usuarios = await _context.Usuarios
                .Where(l => l.Nome.ToLower().Contains(nome)).ToListAsync();

            return usuarios;

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
    }
}
