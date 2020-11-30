using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Wordki.Api.Services
{
    public interface IAuthenticationService
    {
        string Authenticate(long userId, IEnumerable<string> roles);
        string Refresh(string token);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly JwtSettings jwtSettings;

        public AuthenticationService(IOptions<JwtSettings> jwtSettings)
        {
            this.jwtSettings = jwtSettings.Value;
        }

        public string Authenticate(long userId, IEnumerable<string> roles)
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

        public string Refresh(string token)
        {
            return Authenticate(GetId(token), GetRoles(token));
        }

        private long GetId(string token)
        {
            var claim = GetClaimsFromToken(token).Single(x => x.Type.Equals("Id")).Value;
            return long.Parse(claim);
        }

        private IEnumerable<string> GetRoles(string token)
        {
            return GetClaimsFromToken(token).Where(x => x.Type.Equals("role")).Select(x => x.Value);
        }

        private IEnumerable<Claim> CreateClaim(long userId, IEnumerable<string> roles)
        {
            yield return new Claim("Id", userId.ToString());
            foreach (var role in roles)
            {
                yield return new Claim("role", role);
            }
        }

        private IEnumerable<Claim> GetClaimsFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadJwtToken(token);
            return securityToken.Claims;
        }
    }

}
