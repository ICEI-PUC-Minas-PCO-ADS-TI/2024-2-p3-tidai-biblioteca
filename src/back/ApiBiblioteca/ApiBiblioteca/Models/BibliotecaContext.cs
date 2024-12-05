using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace ApiBiblioteca.Models;

public partial class BibliotecaContext : DbContext
{
    public BibliotecaContext()
    {
    }

    public BibliotecaContext(DbContextOptions<BibliotecaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Emprestimo> Emprestimos { get; set; }

    public virtual DbSet<HistoricoLeitura> HistoricoLeituras { get; set; }

    public virtual DbSet<Livro> Livros { get; set; }

    public virtual DbSet<Mensagen> Mensagens { get; set; }

    public virtual DbSet<Reserva> Reservas { get; set; }

    public virtual DbSet<Topico> Topicos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("Server=biblioteca-server.mysql.database.azure.com; Port=3306; UserID=matheus; Password=Stellantis1105!; Database=biblioteca;", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.40-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Emprestimo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.LivroId, "livro_id");

            entity.HasIndex(e => e.UsuarioId, "usuario_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataDevolucao).HasColumnName("data_devolucao");
            entity.Property(e => e.DataEmprestimo).HasColumnName("data_emprestimo");
            entity.Property(e => e.LivroId).HasColumnName("livro_id");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValueSql("'Em dia'")
                .HasColumnName("status");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Livro).WithMany(p => p.Emprestimos)
                .HasForeignKey(d => d.LivroId)
                .HasConstraintName("Emprestimos_ibfk_2");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Emprestimos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("Emprestimos_ibfk_1");
        });

        modelBuilder.Entity<HistoricoLeitura>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("HistoricoLeitura");

            entity.HasIndex(e => e.LivroId, "livroId");

            entity.HasIndex(e => e.UsuarioId, "usuarioId");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataLeitura).HasColumnName("dataLeitura");
            entity.Property(e => e.LivroId).HasColumnName("livroId");
            entity.Property(e => e.UsuarioId).HasColumnName("usuarioId");

            entity.HasOne(d => d.Livro).WithMany(p => p.HistoricoLeituras)
                .HasForeignKey(d => d.LivroId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("HistoricoLeitura_ibfk_2");

            entity.HasOne(d => d.Usuario).WithMany(p => p.HistoricoLeituras)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("HistoricoLeitura_ibfk_1");
        });

        modelBuilder.Entity<Livro>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AnoLivro).HasColumnName("ano_livro");
            entity.Property(e => e.Autor)
                .HasMaxLength(100)
                .HasColumnName("autor");
            entity.Property(e => e.CapaUrl)
                .HasMaxLength(255)
                .HasColumnName("capa_url");
            entity.Property(e => e.Descricao)
                .HasColumnType("text")
                .HasColumnName("descricao");
            entity.Property(e => e.Edicao).HasColumnName("edicao");
            entity.Property(e => e.Editora)
                .HasMaxLength(50)
                .HasColumnName("editora");
            entity.Property(e => e.Genero)
                .HasMaxLength(255)
                .HasColumnName("genero");
            entity.Property(e => e.NumeroPaginas).HasColumnName("numero_paginas");
            entity.Property(e => e.Quantidade).HasColumnName("quantidade");
            entity.Property(e => e.Titulo)
                .HasMaxLength(255)
                .HasColumnName("titulo");
        });

        modelBuilder.Entity<Mensagen>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.MensagemId, "mensagem_id");

            entity.HasIndex(e => e.TopicoId, "topico_id");

            entity.HasIndex(e => e.UsuarioId, "usuario_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Conteudo)
                .HasColumnType("text")
                .HasColumnName("conteudo");
            entity.Property(e => e.DataCriacao)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("data_criacao");
            entity.Property(e => e.MensagemId).HasColumnName("mensagem_id");
            entity.Property(e => e.TopicoId).HasColumnName("topico_id");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Mensagem).WithMany(p => p.InverseMensagem)
                .HasForeignKey(d => d.MensagemId)
                .HasConstraintName("Mensagens_ibfk_2");

            entity.HasOne(d => d.Topico).WithMany(p => p.Mensagens)
                .HasForeignKey(d => d.TopicoId)
                .HasConstraintName("Mensagens_ibfk_1");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Mensagens)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("Mensagens_ibfk_3");
        });

        modelBuilder.Entity<Reserva>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.LivroId, "livro_id");

            entity.HasIndex(e => e.UsuarioId, "usuario_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataReserva).HasColumnName("data_reserva");
            entity.Property(e => e.LivroId).HasColumnName("livro_id");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Livro).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.LivroId)
                .HasConstraintName("Reservas_ibfk_2");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("Reservas_ibfk_1");
        });

        modelBuilder.Entity<Topico>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.UsuarioId, "usuario_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataCriacao)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("data_criacao");
            entity.Property(e => e.Descricao)
                .HasColumnType("text")
                .HasColumnName("descricao");
            entity.Property(e => e.Titulo)
                .HasMaxLength(255)
                .HasColumnName("titulo");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Topicos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("Topicos_ibfk_1");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasIndex(e => e.Cpf, "cpf").IsUnique();

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Bairro)
                .HasMaxLength(50)
                .HasColumnName("bairro");
            entity.Property(e => e.Cep)
                .HasMaxLength(8)
                .IsFixedLength()
                .HasColumnName("cep");
            entity.Property(e => e.Cidade)
                .HasMaxLength(50)
                .HasColumnName("cidade");
            entity.Property(e => e.Cpf)
                .HasMaxLength(11)
                .IsFixedLength()
                .HasColumnName("cpf");
            entity.Property(e => e.DataNascimento).HasColumnName("data_nascimento");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .HasColumnName("nome");
            entity.Property(e => e.NumeroCasa).HasColumnName("numero_casa");
            entity.Property(e => e.Rua)
                .HasMaxLength(50)
                .HasColumnName("rua");
            entity.Property(e => e.Senha)
                .HasMaxLength(255)
                .HasColumnName("senha");
            entity.Property(e => e.Telefone)
                .HasMaxLength(15)
                .HasColumnName("telefone");
            entity.Property(e => e.TipoUsuario)
                .HasMaxLength(30)
                .HasColumnName("tipoUsuario");
            entity.Property(e => e.Uf)
                .HasMaxLength(2)
                .IsFixedLength()
                .HasColumnName("uf");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
