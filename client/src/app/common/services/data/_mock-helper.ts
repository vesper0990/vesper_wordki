import { LanguageEnum, GroupItem, LessonTypeEnum, TranslationDirectionEnum, Result, Group, Word, User } from '../../models/model';

export class MockHelper {

    private static groups: Group[] = MockHelper.getGroups(3);

    public static database: Database = {
        user: {
            id: '1',
            name: 'userName',
            password: 'password',
            token: 'token',
            expires: 3600,
        },
        groups: MockHelper.groups,
    };

    static getGroupItem(id = '1',
        name = 'grupa',
        language1 = LanguageEnum.English,
        language2 = LanguageEnum.Polish,
        creationDate = new Date(1990, 1),
        resultsCount = 10,
        wordsCount = 10,
        lastLessonDate = new Date(2018, 1)
    ): GroupItem {
        const item = new GroupItem();
        item.id = id;
        item.name = name;
        item.language1 = language1;
        item.language2 = language2;
        item.creationDate = creationDate;
        item.resultsCount = resultsCount;
        item.wordsCount = wordsCount;
        item.lastLessonDate = lastLessonDate;
        return item;
    }

    static getGroupItems(count: number): GroupItem[] {
        const items: GroupItem[] = [];
        for (let i = 0; i < count; i++) {
            items.push(this.getGroupItem(`${i}`));
        }
        return items;
    }

    static getGroup(id = '1',
        name = 'grupa',
        language1 = LanguageEnum.Polish,
        language2 = LanguageEnum.English,
        creationDate = new Date(1990, 1),
        words = [],
        results = []
    ): Group {
        const group = new Group();
        group.id = id;
        group.name = name;
        group.language1 = language1;
        group.language2 = language2;
        group.creationDate = creationDate;
        group.words = words;
        group.results = results;
        return group;
    }

    static getGroups(count: number): Group[] {
        const groups: Group[] = [];
        for (let i = 0; i < count; i++) {
            const group = MockHelper.getGroup(`${i}`, `Grupa ${i}`);
            group.words = this.getWords(i, `${i}`);
            group.results = this.getResults(i, `${i}`);
            groups.push(group);
        }
        return groups;
    }

    static getWord(id = '1',
        groupId = '1',
        drawer = 1,
        isVisible = true,
        language1 = 'slowo',
        language2 = 'word',
        language1Example = 'przyklad',
        language2Example = 'example',
        repeatingCounter = 4
    ): Word {
        const word = new Word();
        word.id = id;
        word.groupId = groupId;
        word.drawer = drawer;
        word.isVisible = isVisible;
        word.language1 = language1;
        word.language2 = language2;
        word.language1Example = language1Example;
        word.language2Example = language2Example;
        word.repeatingCounter = repeatingCounter;
        return word;
    }

    static getResult(
        id = '1',
        groupId = '1',
        accepted = 2,
        correct = 2,
        dateTime = new Date(2018, 1),
        invisible = 2,
        lessonType = LessonTypeEnum.Fiszki,
        timeCount = 134,
        translationDirection = TranslationDirectionEnum.FromFirst,
        wrong = 2
    ): Result {
        const result = new Result();
        result.id = id;
        result.groupId = groupId;
        result.accepted = accepted;
        result.correct = correct;
        result.dateTime = dateTime;
        result.invisible = invisible;
        result.lessonType = lessonType;
        result.timeCount = timeCount;
        result.translationDirection = translationDirection;
        result.wrong = wrong;
        return result;
    }

    static getWords(count: number, groupId: string): Word[] {
        const words: Word[] = [];
        for (let i = 0; i < count; i++) {
            words.push(
                this.getWord(
                    `${i}`,
                    groupId,
                    i % 5,
                    true,
                    `slowo${i}`,
                    `word${i}`,
                    `jakies dluzsze zdanie jako przyklad slowa${i}`,
                    `a longer sentense as example of word${i}`,
                    4
                )
            );
        }
        return words;
    }

    static getResults(count: number, groupId: string): Result[] {
        const results: Result[] = [];
        for (let i = 0; i < count; i++) {
            results.push(this.getResult(`${i}`, groupId));
        }
        return results;
    }

    getRandomInt(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}

export class Database {
    constructor(public user: User, public groups: Group[]) {
    }
}
