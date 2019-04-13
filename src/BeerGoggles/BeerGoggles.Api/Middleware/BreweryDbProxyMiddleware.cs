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
            var beerUrl = context.Request.Path.Value.Replace(@"/api/", "");
            var result = await _service.GetData(beerUrl);
            await context.Response.WriteAsync(result, Encoding.UTF8);
        }
    }
}
