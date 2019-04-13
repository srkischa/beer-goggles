using Microsoft.AspNetCore.Http;
using System.Text;
using System.Threading.Tasks;

namespace BeerGoggles.Api.Middleware
{
    public class BreweryDbProxyMiddleware : IMiddleware
    {
        private readonly BreweryDbService _service;

        public BreweryDbProxyMiddleware(BreweryDbService service)
        {
            _service = service;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var result = await _service.GetBeersAsync();
            await context.Response.WriteAsync(result, Encoding.UTF8);
        }
    }
}
