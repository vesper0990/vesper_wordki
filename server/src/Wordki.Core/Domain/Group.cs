using System;
using System.Collections.Generic;
using System.Linq;
using Wordki.Utils.Domain;

namespace Wordki.Core
{
    public class Group : IDomainObject
    {
        private readonly List<Word> words;

        private Group(long id, long userId, string name, LanguageEnum language1, LanguageEnum language2, DateTime creationDate, List<Word> words)
        {
            Id = id;
            UserId = userId;
            Name = name;
            Language1 = language1;
            Language2 = language2;
            CreationDate = creationDate;
            this.words = words;
        }

        public long Id { get; }
        public long UserId { get; }

        

        public string Name { get; private set; }
        public LanguageEnum Language1 { get; private set; }
        public LanguageEnum Language2 { get; private set; }
        public bool NeedUpdate { get; private set; }

        

        public DateTime CreationDate { get; }
        public IEnumerable<Word> Words => words;

        public static Group Create(long userId, string name, LanguageEnum language1, LanguageEnum language2, DateTime creationDate)
        {
            return new Group(0, userId, name, language1, language2, creationDate, new List<Word>());
        }

        public static Group Restore(long id, long userId, string name, LanguageEnum language1, LanguageEnum language2, DateTime creationDate, List<Word> words)
        {
            return new Group(id, userId, name, language1, language2, creationDate, words);
        }

        public void AddWord(Word word)
        {
            word.AddToGroup(this);
            words.Add(word);
        }

        public void AddWords(IEnumerable<Word> words)
        {
            this.words.AddRange(words);
        }

        public void RemoveWord(long wordId){
            var word = Words.Single(w => w.Id == wordId);
            word.Remove();
            NeedUpdate = true;
        }

        public void ChangeName(string newName)
        {
            Name = newName;
        }

        public void ChangeLanguage1Type(LanguageEnum newType)
        {
            if(newType != LanguageEnum.Undefined && newType == Language2)
            {
                throw new Exception("");
            }
            Language1 = newType;
        }

        public void ChangeLanguage2Type(LanguageEnum newType)
        {
            if (newType != LanguageEnum.Undefined && newType == Language1)
            {
                throw new Exception("");
            }
            Language2 = newType;
        }

        public void ToggleLanguageEnum(bool withWords)
        {
            var temp = Language1;
            Language1 = Language2;
            Language2 = temp;

            if (withWords)
            {
                foreach (var word in Words)
                {
                    word.Swap();
                }
            }
        }

        public void UpdateWord(Word word)
        {
            NeedUpdate = true;
            var wordToUpdate = words.First(x => x.Id == word.Id);
            words.Remove(wordToUpdate);
            words.Add(word);
        }
        public void Update(string name, LanguageEnum language1, LanguageEnum language2)
        {
            NeedUpdate = true;
            Name = name;
            Language1 = language1;
            Language2 = language2;
        }
            
        public void AddGroupToLessons()
        {
            foreach(var word in words)
            {
                word.AddWordToLessons();
            }
            NeedUpdate = true;
        }

        public void RemoveGroupFromLessons()
        {
            foreach (var word in words)
            {
                word.RemoveWordFromLessons();
            }
            NeedUpdate = true;
        }
    }
}
