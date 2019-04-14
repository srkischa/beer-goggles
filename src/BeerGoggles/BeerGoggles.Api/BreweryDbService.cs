using BeerGoggles.Api.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<string> GetData(string url, IQueryCollection queryCollection)
        {
            var queryString = ToQueryStingWithLicenceKey(queryCollection);
            var result = await _httpClient.GetAsync(url + queryString);
            return await result.Content.ReadAsStringAsync();
        }

        private string ToQueryStingWithLicenceKey(IQueryCollection queryCollection)
        {
            var items = queryCollection.SelectMany(x => x.Value, (col, value) => new KeyValuePair<string, string>(col.Key, value)).ToList();
            var queryBuilder = new QueryBuilder(items);
            queryBuilder.Add("key", _breweryDbSettings.ApiKey);
            return queryBuilder.ToQueryString().Value;
        }
    }
}
