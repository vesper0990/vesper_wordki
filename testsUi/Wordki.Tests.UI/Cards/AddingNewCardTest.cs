using System;
using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using TestStack.BDDfy;

namespace Wordki.Tests.UI.Cards
{
    [TestFixture]
    public class AddingNewCardTest : CardsTestBase
    {
        void GivenCookies() => SetAuthorizationCookie();

        void AndGivenSetupServer()
        {
            Server.AddGetEndpoint("/group/details/1", new
            {
                groupId = 1,
                language1 = 1,
                language2 = 2,
                name = "groupName",
                creationDate = new DateTime(2020, 1, 1),
                cardsCount = 1,
                repeatsCount = 1
            })
            .AddGetEndpoint("/card/all/1", new object[]{new
            {
                id = 1,
                word1 = new
                {
                    value = "value1",
                    example = "example1",
                    drawer = 1,
                    language = 1,
                },
                word2 = new
                {
                    value = "value2",
                    example = "example2",
                    drawer = 2,
                    language = 2,
                },
            }})
            .AddPostEndpoint("/card/add", 1, b => true);
        }

        void WhenUserNavigateToGroup()
        {
            Driver.Navigate().GoToUrl($"{AppUrl}/details/1");
            Thread.Sleep(500);
        }

        void AndWhenUserClickAddNewCardButton()
        {
            Driver.FindElement(By.Id("add-card-btn")).Click();
            Thread.Sleep(500);
        }


        void AndWhenUserFillTheForm()
        {
            var dialog = Driver.FindElement(By.CssSelector("app-edit-word-dialog"));

            dialog.FindElement(By.CssSelector("input[formcontrolname=\"language1\"]")).SendKeys("langauge1");
            dialog.FindElement(By.CssSelector("input[formcontrolname=\"example1\"]")).SendKeys("example1");
            dialog.FindElement(By.CssSelector("input[formcontrolname=\"language2\"]")).SendKeys("language2");
            dialog.FindElement(By.CssSelector("input[formcontrolname=\"example2\"]")).SendKeys("example2");
            dialog.FindElement(By.CssSelector("p-checkbox")).Click();
        }

        void AndWhenUserSubmitTheForm()
        {
            var dialog = Driver.FindElement(By.CssSelector("app-edit-word-dialog"));
            dialog.FindElement(By.Id("save-btn")).Click();
            Thread.Sleep(200);
        }

        void ThenNewCardShouldAppear()
        {
            var cards = Driver.FindElements(By.CssSelector("app-word-row"));
            Assert.AreEqual(1, cards.Count);
        }

        [Test]
        public void CheckAddingNewCard() => this.BDDfy();
    }
}