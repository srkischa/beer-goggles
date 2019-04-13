using BeerGoggles.Api.Settings;
using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Threading.Tasks;

namespace BeerGoggles.Api
{
    public class BreweryDbService
    {
        private readonly HttpClient _httpClient;
        private readonly BreweryDbSettings _breweryDbSettings;

        public BreweryDbService(HttpClient client, IOptions<BreweryDbSettings> options)
        {
            _httpClient = client;
            _breweryDbSettings = options.Value;
        }

        public async Task<string> GetBeersAsync()
        {
            var keyQueryString = $"/?key={_breweryDbSettings.ApiKey}";
            var result = await _httpClient.GetAsync("beers" + keyQueryString);
            return await result.Content.ReadAsStringAsync();
        }
    }
}
