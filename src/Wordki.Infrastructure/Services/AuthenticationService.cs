using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Wordki.Infrastructure.Settings;

namespace Wordki.Infrastructure.Services
{
    public interface IAuthenticationService
    {
        string Authenticate(Guid userId, IEnumerable<string> roles);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly JwtSettings jwtSettings;

        public AuthenticationService(IOptions<JwtSettings> jwtSettings)
        {
            this.jwtSettings = jwtSettings.Value;
        }

        public string Authenticate(Guid userId, IEnumerable<string> roles)
        {
            var claims = CreateClaim(userId, roles);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        }

        private IEnumerable<Claim> CreateClaim(Guid userId, IEnumerable<string> roles)
        {
            yield return new Claim(ClaimTypes.Name, userId.ToString());
            yield return new Claim("Id", userId.ToString());
            foreach (var role in roles)
            {
                yield return new Claim(ClaimTypes.Role, role);
            }
        }
    }

}
