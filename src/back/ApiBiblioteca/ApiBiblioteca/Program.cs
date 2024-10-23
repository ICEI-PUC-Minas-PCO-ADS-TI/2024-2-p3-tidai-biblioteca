using ApiBiblioteca.Middleware;
using ApiBiblioteca.Models;
using ApiBiblioteca.Services.SEmprestimo;
using ApiBiblioteca.Services.SLivro;
using ApiBiblioteca.Services.SMensagen;
using ApiBiblioteca.Services.SReserva;
using ApiBiblioteca.Services.STopico;
using ApiBiblioteca.Services.STopicos;
using ApiBiblioteca.Services.SUsuario;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var jwtSettings = builder.Configuration.GetSection("JwtSettings");

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt =>
        opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
               Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]))

        }
); 

//Contexto do banco de dados
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<BibliotecaContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


//Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Add services to the container.
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ILivroService, LivroService>();
builder.Services.AddScoped<IReservaService, ReservaService>();
builder.Services.AddScoped<IEmprestimoService, EmprestimoService>();
builder.Services.AddScoped<ITopicoService,TopicoService>();
builder.Services.AddScoped<IMensagemService, MensagenService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseAuthorization();
app.UseCors("AllowReactApp");
app.MapControllers();

app.Run();
