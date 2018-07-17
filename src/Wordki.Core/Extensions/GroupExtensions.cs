using System.Collections.Generic;

namespace Wordki.Core.Extensions
{
    public static class GroupExtensions{
        public static void AddWord(this Group group, Word word){
            group.Words.Add(word);
            word.Group = group;
            word.GroupId = group.Id;
        }

        public static void AddResult(this Group group, Result result){
            group.Results.Add(result);
            result.Group = group;
            result.GroupId = group.Id;
        }

        public static void AddAllWords(this Group group, IEnumerable<Word> words){
            foreach(var word in words){
                group.AddWord(word);
            }
        }

        public static void AddAllResults(this Group group, IEnumerable<Result> results){
            foreach(var result in results){
                group.AddResult(result);
            }
        }
    }
}