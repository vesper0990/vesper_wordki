using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly WordkiDbContext context;
        private readonly IMapper mapper;
        private readonly IEncrypter encrypter;

        public UserService(WordkiDbContext context, IMapper mapper, IEncrypter encrypter)
        {
            this.context = context;
            this.mapper = mapper;
            this.encrypter = encrypter;
        }

        public async Task<bool> CheckUserExistingAsync(string userName)
            => await context.Users.CountAsync(x => x.Name.Equals(userName)) != 0;

        public async Task<bool> CheckUserToLoginAsync(string userName, string password)
            => await context.Users.CountAsync(x => x.Name.Equals(userName) && x.Password.Equals(encrypter.Md5Hash(password))) != 0;

        public async Task<UserDTO> LoginAsync(string userName, string password)
            => mapper.Map<User, UserDTO>(await context.Users.SingleOrDefaultAsync(x => x.Name.Equals(userName) && x.Password.Equals(encrypter.Md5Hash(password))));

        public async Task<UserDTO> RegisterAsync(UserDTO userDto)
        {
            var user = mapper.Map<UserDTO, User>(userDto);
            user.Password = encrypter.Md5Hash(user.Password);
            await context.Users.AddAsync(user);
            return mapper.Map<User, UserDTO>(user);
        }
    }
}
