﻿using ApiBiblioteca.Models;

namespace ApiBiblioteca.Services.SLivro
{
    public interface ILivroService
    {
        Task<IEnumerable<Livro>> GetLivros();

        Task<IEnumerable<Livro>>PesquisarLivro(string nome);
        Task<Livro> GetLivroPorId(int id);
        Task CreateLivro(Livro livro);
        Task UpdateLivro(Livro livro);
        Task DeleteLivro(Livro livro);
    }
}