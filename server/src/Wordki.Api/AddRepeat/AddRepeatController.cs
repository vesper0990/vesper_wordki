using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wordki.Api.AddRepeat
{
    [Route("[controller]")]
    public class AddRepeatController : ControllerBase
    {

        public AddRepeatController()
        {

        }

        [HttpPost]
        public Task<IActionResult> Post([FromBody] AddRepeatRequest request)
        {
            return null;
        }

    }
}
