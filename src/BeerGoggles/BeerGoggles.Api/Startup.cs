using BeerGoggles.Api.Middleware;
using BeerGoggles.Api.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace BeerGoggles.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<BreweryDbSettings>(Configuration.GetSection("BreweryDb"));

            services.AddCors(corsOptions => corsOptions.AddPolicy(
                "DefaultCorsPolicy",
                corsPolicyBuilder => corsPolicyBuilder
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()));


            services.AddHttpClient<BreweryDbService>(c =>
            {
                c.BaseAddress = new Uri(Configuration["BreweryDb:Url"]);
            });

            services.AddScoped<BreweryDbProxyMiddleware>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("DefaultCorsPolicy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<BreweryDbProxyMiddleware>();

            app.UseMvc();
        }
    }
}
