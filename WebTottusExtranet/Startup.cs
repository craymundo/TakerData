using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using WebTakerData.Base;
using WebTakerData.Core;
using WebTakerData.Interface.ICore;
using WebTakerData.Interface.IProviders;
using WebTakerData.Providers;



namespace WebTakerData
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var applicationSettings = Configuration.GetSection("AppSettings").Get<Settings>();
            var servicesSettings = Configuration.GetSection("AppServices").Get<Services>();

          
            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(ErrorFilterAttribute));
            });

            services.AddSession(options =>
            {
                options.Cookie.Name = string.Format("{0}.Session", applicationSettings.ApplicationName);
                options.IdleTimeout = TimeSpan.FromMinutes(Convert.ToInt32(applicationSettings.SessionTimeout) + 2);
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
                options.Cookie.Name = string.Format("{0}.Auth", applicationSettings.ApplicationName);
                options.ExpireTimeSpan = TimeSpan.FromMinutes(Convert.ToInt32(applicationSettings.SessionTimeout));
                options.LoginPath = new PathString("/Login");
                options.AccessDeniedPath = new PathString("/Login/Forbidden/");
                options.LogoutPath = applicationSettings.UrlLogOut;
            });

            services.AddDirectoryBrowser();
            services.AddDistributedMemoryCache();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                  builder => builder.AllowAnyOrigin()
                                    .AllowAnyMethod()
                                    .AllowAnyHeader()
                                    .AllowCredentials());
            });

            services.AddSingleton<ISettings, Settings>(e => applicationSettings);
            services.AddSingleton<IServices, Services>(e => servicesSettings);
            services.AddSingleton<IResponse, Response>();
            services.AddSingleton<IUsuarioProvider, UsuarioProvider>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Remove("Server");
                await next();
                if (context.Response.StatusCode == 404)
                {
                    context.Request.Path = "/Login/Error";
                    await next();
                }
            });

            app.UseStaticFiles();
            app.UseSession();
            app.UseAuthentication();

            loggerFactory.AddFile("Logs/Nao-{Date}.txt", LogLevel.Error);
            app.UseCors("CorsPolicy");

          
            app.UseHsts(hsts => hsts.MaxAge(365).IncludeSubdomains());
            app.UseXfo(options => options.Deny());
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opts => opts.NoReferrer());
            app.UseXXssProtection(options => options.EnabledWithBlockMode());
            app.UseXfo(options => options.Deny());
            app.UseCsp(opts => opts
                .BlockAllMixedContent()
                .StyleSources(s => s.Self())
                .StyleSources(s => s.UnsafeInline())
                .FontSources(s => s.Self())
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self())
                .ImageSources(s => s.Self().CustomSources("storage.googleapis.com"))
                .ScriptSources(s => s.Self().UnsafeEval())
                .ScriptSources(s => s.Self().CustomSources("raw.githack.com"))
                .FontSources(s => s.Self().CustomSources("fonts.googleapis.com"))
                
            );
            
            app.UseFileServer(new FileServerOptions
            {
                FileProvider = new PhysicalFileProvider(
                            Path.Combine(Directory.GetCurrentDirectory(), "Logs")),
                RequestPath = "/" + "Logger",
                EnableDirectoryBrowsing = true
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "areaRoute",
                    template: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
