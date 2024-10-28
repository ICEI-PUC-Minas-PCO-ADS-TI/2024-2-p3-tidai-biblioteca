namespace ApiBiblioteca.Services.SAuthenticaded
{
    public interface IAutheticatedService
    {
        Task<string> Login(string username, string password);
    }
}
