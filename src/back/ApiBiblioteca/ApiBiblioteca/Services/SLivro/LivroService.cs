﻿using ApiBiblioteca.DTO;
using ApiBiblioteca.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace ApiBiblioteca.Services.SLivro
{
    public class LivroService : ILivroService


    {
        private readonly BibliotecaContext _context;

        public LivroService(BibliotecaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Livro>> GetLivros()
        {

            return await _context.Livros.ToListAsync();
        }
        public async Task<Livro> GetLivroPorId(int id)
        {
            var livro = await _context.Livros.FindAsync(id);
            return livro;
        }

        public async Task<IEnumerable<Object>> GetAutorLivros()
        {
            var autores = await _context.Livros
                .Select(l => l.Autor)
                .Distinct().ToListAsync();

            return autores;
        }
        public async Task<IEnumerable<Object>> GetGeneroLivros()
        {
            var generos = await _context.Livros.
                Select(l => l.Genero).
                Distinct().ToListAsync();

            return generos;
        }
        public async Task CreateLivro(Livro livro)
        {
            _context.Livros.Add(livro);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateLivro(Livro livro)
        {
            _context.Entry(livro).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task DeleteLivro(Livro livro)
        {
            _context.Livros.Remove(livro);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Livro>> PesquisarLivro(string nome)
        {
            nome = nome.ToLower();

            var livros = await _context.Livros
                .Where(l => l.Titulo.ToLower().Contains(nome) || l.Autor.ToLower().Contains(nome)).ToListAsync();

            return livros;
            
        }

        public async Task<IEnumerable<Livro>> FiltroLivro(string nome)
        {
            nome = nome.ToLower();

            var livros = await _context.Livros
                .Where(l=> l.Genero.ToLower() == (nome) || l.Autor.ToLower() == (nome))
                .ToListAsync();

            return livros;
        }
    }
}
