﻿using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Wordki.Infrastructure.Services
{
    public class Encrypter : IEncrypter
    {

        private const int SaltSize = 40;
        private const int DeriveBytesIterationsCount = 10000;

        public string GetHash(string value, string salt)
        {
            if (value.IsEmpty())
            {
                throw new ArgumentException("Cannot generate salt from an empty value.", nameof(value));
            }
            if (salt.IsEmpty())
            {
                throw new ArgumentException("Cannot generate salt from an empty value.", nameof(salt));
            }
            var pbkdf2 = new Rfc2898DeriveBytes(value, GetBytes(salt), DeriveBytesIterationsCount);

            return Convert.ToBase64String(pbkdf2.GetBytes(SaltSize));
        }

        public string GetSalt(string value)
        {
            if (value.IsEmpty())
            {
                throw new ArgumentException("Cannot generate salt from an empty value.", nameof(value));
            }

            var random = new Random();
            var saltBytes = new byte[SaltSize];
            var rng = RandomNumberGenerator.Create();
            rng.GetBytes(saltBytes);
            return Convert.ToBase64String(saltBytes);
        }

        private static byte[] GetBytes(string value)
        {
            var bytes = new byte[value.Length * sizeof(char)];
            Buffer.BlockCopy(value.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }

        public string Md5Hash(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return string.Empty;
            }
            byte[] data = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(value));
            StringBuilder builder = new StringBuilder();
            foreach (byte b in data)
            {
                builder.Append(b.ToString("x2"));
            }
            return builder.ToString();
        }
    }

    public static class StringExtention
    {
        public static bool IsEmpty(this string value) => string.IsNullOrWhiteSpace(value);
    }
}
