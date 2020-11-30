"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardsListService = void 0;
var core_1 = require("@angular/core");
var actions_1 = require("../../store/actions");
var selectors_1 = require("../../store/selectors");
var operators_1 = require("rxjs/operators");
var actions_2 = require("src/app/groups-list/store/actions");
var CardsListService = /** @class */ (function () {
    function CardsListService(store, actRoute) {
        this.store = store;
        this.actRoute = actRoute;
    }
    CardsListService.prototype.init = function () {
        this.handleRouteParam(+this.actRoute.snapshot.params.id);
    };
    CardsListService.prototype.getCards = function () {
        return this.store.select(selectors_1.selectWords);
    };
    CardsListService.prototype.isCardsLoading = function () {
        return this.store.select(selectors_1.selectIsCardsLoading);
    };
    CardsListService.prototype.getGroupDetails = function () {
        return this.store.select(selectors_1.selectGroupDetails);
    };
    CardsListService.prototype.isDialogVisible = function () {
        return this.store.select(selectors_1.selectDialogVisibility).pipe(operators_1.tap(function (value) { return console.log(value); }));
    };
    CardsListService.prototype.getDialogMode = function () {
        return this.store.select(selectors_1.selectDialogMode);
    };
    CardsListService.prototype.getDialogCard = function () {
        return this.store.select(selectors_1.selectDialogCard).pipe(operators_1.map(function (card) {
            return card === null || card === undefined ?
                {} :
                {
                    wordId: card.id,
                    language1: card.language1,
                    language2: card.language2,
                    example1: card.example1,
                    example2: card.example2,
                    isVisible: card.isVisible
                };
        }));
    };
    CardsListService.prototype.openDialogToAdd = function () {
        this.store.dispatch(new actions_1.ShowDialog({ mode: 'add' }));
    };
    CardsListService.prototype.openDialogToEdit = function (card) {
        this.store.dispatch(new actions_1.ShowDialog({ mode: 'edit', card: card }));
    };
    CardsListService.prototype.dialogCancel = function () {
        this.store.dispatch(new actions_2.HideDialog());
    };
    CardsListService.prototype.dialogSave = function (editCard) {
        editCard.groupId = this.groupId;
        var action = editCard.wordId === 0 ? new actions_1.AddWord({ editword: editCard }) : new actions_1.UpdateWord({ editword: editCard });
        this.store.dispatch(action);
    };
    CardsListService.prototype.dialogRemove = function (cardId) {
        this.store.dispatch(new actions_1.RemoveWordAction({ groupId: this.groupId, wordId: cardId }));
    };
    CardsListService.prototype.handleRouteParam = function (groupId) {
        this.groupId = groupId;
        this.store.dispatch(new actions_1.GetGroupDetails({ groupId: this.groupId }));
        this.store.dispatch(new actions_1.GetWords({ groupId: this.groupId }));
    };
    CardsListService = __decorate([
        core_1.Injectable()
    ], CardsListService);
    return CardsListService;
}());
exports.CardsListService = CardsListService;
