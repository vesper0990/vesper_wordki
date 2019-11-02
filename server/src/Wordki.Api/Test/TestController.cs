using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;

namespace Wordki.Api.Test
{
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        public TestController()
        {

        }

        [HttpGet("{value}")]
        [Authorize(Roles="User")]
        public IActionResult Get(string value)
        {
            return new JsonResult(new { Value = value });
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
