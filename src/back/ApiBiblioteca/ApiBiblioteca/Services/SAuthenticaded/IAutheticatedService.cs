using ApiBiblioteca.DTO;

namespace ApiBiblioteca.Services.SAuthenticaded
{
    public interface IAutheticatedService
    {
        Task<TokenResponse> Login(string username, string password);
    }
}
