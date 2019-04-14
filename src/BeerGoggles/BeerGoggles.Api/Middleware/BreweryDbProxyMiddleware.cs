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
            var brewerDbBaseUrl = context.Request.Path.Value.Replace(@"/api/", string.Empty);
            var response = await _service.GetData(brewerDbBaseUrl, context.Request.Query);
            await context.Response.WriteAsync(response, Encoding.UTF8);
        }
    }
}
