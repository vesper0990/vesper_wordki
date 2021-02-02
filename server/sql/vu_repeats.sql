CREATE OR REPLACE VIEW wrd.Repeats as
SELECT 
		c."Front_Value" AS "QuestionValue",
		c."Front_Example" AS "QuestionExample",
		c."Heads_NextRepeat" AS "QuestionNextRepeat",
		c."Front_State_IsVisible" AS "QuestionIsVisible",
		g."FrontLanguage" AS "QuestionLangauge",
		c."Back_Value" AS "AnswerValue",
		c."Back_Example" AS "AnswerExample",
		g."BackLanguage" AS "AnswerLanguage",
		g."OwnerId" AS "OwnerId"
	FROM wrd."Cards" c
	JOIN wrd."Groups" g ON g."Id" = c."GroupId"
UNION
SELECT 
		c."Back_Value" AS "QuestionValue",
		c."Back_Example" AS "QuestionExample",
		c."Tails_NextRepeat" AS "QuestionNextRepeat",
		c."Back_State_IsVisible" AS "QuestionIsVisible",
		g."BackLanguage" AS "QuestionLangauge",
		c."Front_Value" AS "AnswerValue",
		c."Front_Example" AS "AnswerExample",
		g."FrontLanguage" AS "AnswerLanguage",
		g."OwnerId" AS "OwnerId"
	FROM wrd."Cards" c
	JOIN wrd."Groups" g ON g."Id" = c."GroupId"
