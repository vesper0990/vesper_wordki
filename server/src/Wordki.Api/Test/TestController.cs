using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;

namespace Wordki.Api.Test
{
    [Route("[controller]")]
    [ApiVersion("1.0")]
    [ApiVersion("1.1")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public TestController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // [HttpGet("{value}")]
        // public IActionResult Get(string value)
        // {
        //     var builder = new StringBuilder();
        //     foreach (var item in configuration.AsEnumerable())
        //     {
        //         builder.AppendLine($"{item.Key}:${item.Value}\n");
        //     };
        //     return new JsonResult(new { Value = builder.ToString() });
        // }

        [HttpGet("version")]
        [MapToApiVersion("1.0")]
        public IActionResult Version_1()
        {
            return Content("version_1");
        }

        [HttpGet("version")]
        [MapToApiVersion("1.1")]
        public IActionResult Version_1_1()
        {
            return Content("version_1_1");
        }

        [HttpPost]
        public IActionResult Post([FromBody] TestRequest request)
        {
            if (string.IsNullOrEmpty(request.Value))
            {
                throw new ApiException("Value is empty");
            }
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }

        [HttpPut]
        public IActionResult Put(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ApiException("Value is empty");
            }
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }

        [HttpDelete]
        public IActionResult Delete(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ApiException("Value is empty");
            }
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }
    }

    public class TestRequest
    {
        public string Value { get; set; }
    }
}
