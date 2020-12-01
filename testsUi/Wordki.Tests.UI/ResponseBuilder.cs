using System.Collections.Generic;

namespace Wordki.Tests.UI
{
    public class ResponseBuilder
    {
        public static NextRepeatResponse CreateResponse()
        {
            return new NextRepeatResponse
            {
                GroupName = "group_name",
                Heads = new SideDto
                {
                    Value = "heads_value",
                    Example = "heads_example",
                    Drawer = 1,
                    Language = 1
                },
                Tails = new SideDto
                {
                    Value = "tails_value",
                    Example = "tails_example",
                    Drawer = 1,
                    Language = 1
                }
            };
        }

        public static IEnumerable<GroupDto> CreateRespnse()
        {
            return new GroupDto[]{
                new GroupDto{
                    id = 1,
                    name= "Group_test_1",
                    language1 = 1,
                    language2 = 2,
                    cardsCount = 1
                },
                new GroupDto{
                    id = 2,
                    name= "Group_test_2",
                    language1 = 1,
                    language2 = 2,
                    cardsCount = 2
                },
                new GroupDto{
                    id = 3,
                    name= "Group_test_3",
                    language1 = 1,
                    language2 = 2,
                    cardsCount = 3
                }
            };
        }
    }

    public class NextRepeatResponse
    {
        public string GroupName { get; set; }
        public SideDto Heads { get; set; }
        public SideDto Tails { get; set; }

    }

    public class SideDto
    {
        public string Value { get; set; }
        public string Example { get; set; }
        public int Drawer { get; set; }
        public int Language { get; set; }
    }

    public class GroupDto
    {
        public long id { get; set; }
        public string name { get; set; }
        public int language1 { get; set; }
        public int language2 { get; set; }
        public int cardsCount { get; set; }
    }
}
