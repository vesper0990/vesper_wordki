using AutoMapper;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        private readonly IEncrypter encrypter;

        public UserService(IUserRepository userRepository, IMapper mapper, IEncrypter encrypter)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.encrypter = encrypter;
        }

        public async Task<bool> CheckApiKeyExistingAsync(string apiKey)
            => await userRepository.IsApiKeyExistsAsync(apiKey);

        public async Task<bool> CheckUserExistingAsync(string userName)
            => await userRepository.IsExistsAsync(userName);

        public async Task<bool> CheckUserExistingAsync(long id, string password)
            => await userRepository.IsExistsAsync(id, encrypter.Md5Hash(password));

        public async Task<bool> CheckUserToLoginAsync(string userName, string password)
            => await userRepository.IsExistsAsync(userName, encrypter.Md5Hash(password));

        public async Task<UserDTO> GetUserByApiKey(string apiKey)
            => mapper.Map<User, UserDTO>(await userRepository.GetByApiKeyAsync(apiKey));

        public async Task<UserDTO> LoginAsync(string userName, string password)
            => mapper.Map<User, UserDTO>(await userRepository.GetAsync(userName, encrypter.Md5Hash(password)));

        public async Task<UserDTO> RegisterAsync(UserDTO userDto)
        {
            var user = mapper.Map<UserDTO, User>(userDto);
            user.Password = encrypter.Md5Hash(user.Password);
            user.ApiKey = encrypter.Md5Hash(user.Name);
            await userRepository.AddAsync(user);
            return mapper.Map<User, UserDTO>(user);
        }

        public async Task<UserDTO> UpdateAsync(UserDTO userDto)
        {
            var user = await userRepository.GetAsync(userDto.Id);
            user.Password = encrypter.Md5Hash(userDto.Password);
            user.ApiKey = encrypter.Md5Hash(userDto.Password);
            user.Name = userDto.Name;
            await userRepository.UpdateAsync(user);
            return mapper.Map<User, UserDTO>(user);
        }
    }
}
