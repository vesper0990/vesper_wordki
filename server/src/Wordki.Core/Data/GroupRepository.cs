using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wordki.Core.Domain;
using Wordki.Core.Dtos;
using Wordki.Utils.Dapper;
using Wordki.Utils.Domain;

namespace Wordki.Core.Data
{
    public interface IGroupRepository
    {
        Task<Group> GetGroup(long groupId);
        IAsyncEnumerable<Group> GetGroups(long userId);
        Task<long> SaveAsync(Group group);
    }

    public class GroupRepository : IGroupRepository
    {
        private readonly IDbConnectionProvider dbConnection;
        private readonly IMapper<GroupDto, Group> mapper;

        public GroupRepository(IDbConnectionProvider dbConnection, IMapper<GroupDto, Group> mapper)
        {
            this.dbConnection = dbConnection;
            this.mapper = mapper;
        }

        public async Task<long> SaveAsync(Group group)
        {
            long id = group.Id;
            if (id == 0)
            {
                id = await InsertAsync(group);
            }
            else
            {
                await UpdateAsync(group);
            }
            return id;
        }

        private readonly string insertSql = $@"
INSERT INTO groups (userId, name, language1, language2, creationDate) 
VALUES (@userId, @name, @language1, @language2, @creationDate);
SELECT LAST_INSERT_ID();";
        private async Task<long> InsertAsync(Group group)
        {
            long id = 0;
            var param = new
            {
                userId = group.UserId,
                name = group.Name,
                language1 = group.Language1,
                language2 = group.Language2,
                creationDate = group.CreationDate
            };
            using (var connection = await dbConnection.Connect())
            {
                id = await connection.ExecuteScalar(insertSql, param);
                foreach (var word in group.Words.Where(x => x.NeedUpdate))
                {
                    word.GroupId = id;
                    await SaveWordAsync(connection, word);
                }
            }
            return id;
        }

        private readonly string updateGroupSql = $@"
UPDATE groups SET
name = @name,
language1 = @language1,
language2 = @language2
WHERE
id = @id";

        private async Task UpdateAsync(Group group)
        {
            var param = new
            {
                id = group.Id,
                name = group.Name,
                language1 = group.Language1,
                language2 = group.Language2
            };
            using (var connection = await dbConnection.Connect())
            {
                await connection.Execute(updateGroupSql, param);
                foreach (var word in group.Words.Where(x => x.NeedUpdate))
                {
                    await SaveWordAsync(connection, word);
                }
            }
        }

        private async Task SaveWordAsync(IDbConnectionWrapper connection, Word word)
        {
            var wordId = word.Id;
            if (wordId == 0)
            {
                await InsertWordAsync(connection, word);
            }
            else
            {
                await UpdateWordAsync(connection, word);
            }
        }

        private readonly string insertWordSql = $@"
INSERT INTO words (groupId, language1, language2, example1, example2, comment, drawer, isVisible, nextRepeat, creationDate)
VALUES (@groupId, @language1, @language2, @example1, @example2, @comment, @drawer, @isVisible, @nextRepeat, @creationDate);
SELECT LAST_INSERT_ID();";


        private async Task InsertWordAsync(IDbConnectionWrapper connection, Word word)
        {
            var param = new
            {
                groupId = word.GroupId,
                language1 = word.Language1,
                language2 = word.Language2,
                example1 = word.Exapmle1,
                example2 = word.Exapmle2,
                comment = word.Comment,
                drawer = word.Drawer.Value,
                isVisible = word.IsVisible,
                nextRepeat = word.NextRepeat,
                creationDate = word.CreationDate
            };
            var wordId = await connection.ExecuteScalar(insertWordSql, param);
            foreach(var repeat in word.Repeats.Where(x => x.NeedUpdate))
            {
                repeat.WordId = wordId;
                await InsertRepeatAsync(connection, repeat);
            }
        }

        private readonly string insertRepeatSql = $@"
INSERT INTO repeats (wordId, result, date)
VALUES (@wordId, @result, @date)";

        private async Task InsertRepeatAsync(IDbConnectionWrapper connection, Repeat repeat)
        {
            var param = new
            {
                wordId = repeat.WordId,
                result = repeat.Result,
                date = repeat.DateTime
            };
            await connection.Execute(insertRepeatSql, param);
        }



        private readonly string updateWordSql = $@"
UPDATE words SET
language1 = @language1,
language2 = @language2,
example1 = @example1,
example2 = @example2,
comment = @comment,
drawer = @drawer,
isVisible = @isVisible,
nextRepeat = @nextRepeat
WHERE
id = @id";

        private async Task UpdateWordAsync(IDbConnectionWrapper connection, Word word)
        {
            var param = new
            {
                language1 = word.Language1,
                language2 = word.Language2,
                example1 = word.Exapmle1,
                example2 = word.Exapmle2,
                comment = word.Comment,
                drawer = word.Drawer.Value,
                isVisible = word.IsVisible,
                nextRepeat = word.NextRepeat,
                id = word.Id
            };
            await connection.Execute(updateWordSql, param);
        }

        private readonly string getGroupSql = $@"
SELECT
g.id as GroupId,
g.userId as UserId,
g.name as Name,
g.language1 as GroupLanguage1,
g.language2 as GroupLanguage2,
g.creationDate as GroupCreationDate,

w.id as WordId,
w.groupId as GroupId,
w.language1 as WordLanguage1,
w.language2 as WordLanguage2,
w.example1 as Example1,
w.example2 as Example2,
w.comment as Comment,
w.drawer as Drawer,
w.isVisible as IsVisible,
w.creationDate as WordCreationDate,
w.nextRepeat as NextRepeat
FROM groups g
LEFT JOIN words w ON w.groupId = g.id
WHERE g.id = @groupId
";

        public async Task<Group> GetGroup(long groupId)
        {
            GroupDto dto = null;
            var param = new
            {
                groupId = groupId,
            };
            using (var conneciton = await dbConnection.Connect())
            {
                await conneciton.GetAsync<GroupDto, WordDto, GroupDto>(getGroupSql, param, (group, word) =>
                {
                    if (dto == null)
                    {
                        dto = group;
                    }
                    if(word != null)
                    {
                        dto.Words.Add(word);
                    }
                    return dto;
                }, "WordId");
            }

            return mapper.Map(dto);
        }

        private readonly string getGroupsSql = $@"
SELECT
g.id as GroupId,
g.userId as UserId,
g.name as Name,
g.language1 as GroupLanguage1,
g.language2 as GroupLanguage2,
g.creationDate as GroupCreationDate,

w.id as WordId,
w.groupId as GroupId,
w.language1 as WordLanguage1,
w.language2 as WordLanguage2,
w.example1 as Example1,
w.example2 as Example2,
w.comment as Comment,
w.drawer as Drawer,
w.isVisible as IsVisible,
w.creationDate as WordCreationDate,
w.nextRepeat as NextRepeat
FROM groups g
LEFT JOIN words w ON w.groupId = g.id
WHERE g.id = @groupId";

        public async IAsyncEnumerable<Group> GetGroups(long userId)
        {
            List<GroupDto> dtos = new List<GroupDto>();
            var param = new
            {
                userId = userId,
            };
            using (var conneciton = await dbConnection.Connect())
            {
                await conneciton.GetAsync<GroupDto, WordDto, GroupDto>(getGroupSql, param, (group, word) =>
                {
                    if (!dtos.Any(x => x.GroupId == group.GroupId))
                    {
                        dtos.Add(group);
                    }
                    else
                    {
                        group = dtos.Single(x => x.GroupId == group.GroupId);
                    }
                    group.Words.Add(word);
                    return group;
                }, "WordId");
            }

            foreach (var dto in dtos)
            {
                yield return mapper.Map(dto);
            }
        }
    }
}
