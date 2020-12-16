using System;
using Wordki.Tests.UI.PageObjectModels;

namespace Wordki.Tests.UI.Cards
{
    internal class CardsTestBase : UITestBase
    {

        protected CardsPage Page { get; }

        protected CardsTestBase() : base()
        {
            Page = new CardsPage(Driver);
        }

        public void SetupGroupDetailsEndpoint()
        => Server.AddGetEndpoint("/group/details/1", new GroupDetailsDto
        {
            Id = 1,
            Name = "group-name",
            LanguageFront = 1,
            LanguageBack = 2,
            CardsCount = 1,
            RepeatsCount = 1,
            CreationDate = new DateTime(2020, 02, 02)
        });

        public void SetupCardAllEndpoint()
        => Server.AddGetEndpoint("/card/all/1", new CardDetailsDto[]{
            new CardDetailsDto{
                Id=1,
                Front = new SideDetailsDto{
                    Value = "front-value-1",
                    Example = "front-example-1",
                    Drawer = 1,
                    IsVisible = true,
                    Language = 1,
                    NextRepeat = new DateTime(2020, 02, 02),
                    RepeatCount = 1
                },
                Back = new SideDetailsDto{
                    Value = "back-value-1",
                    Example = "back-example-1",
                    Drawer = 1,
                    IsVisible = true,
                    Language = 2,
                    NextRepeat = new DateTime(2020, 02, 02),
                    RepeatCount = 1
                }
            },
            new CardDetailsDto{
                Id=2,
                Front = new SideDetailsDto{
                    Value = "front-value-2",
                    Example = "front-example-2",
                    Drawer = 1,
                    IsVisible = true,
                    Language = 1,
                    NextRepeat = new DateTime(2020, 02, 02),
                    RepeatCount = 1
                },
                Back = new SideDetailsDto{
                    Value = "back-value-2",
                    Example = "back-example-2",
                    Drawer = 1,
                    IsVisible = true,
                    Language = 2,
                    NextRepeat = new DateTime(2020, 02, 02),
                    RepeatCount = 1
                }
            }
        });

        public void SetupAddCardEndpoint() => Server.AddPostEndpoint("/card/add", 1, b => true);

        public void SetupUpdateCardEndpoint() => Server.AddPutEndpoint("/card/update", string.Empty, b => true);

    }
}