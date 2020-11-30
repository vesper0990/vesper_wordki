"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditWordDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditWordDialogComponent = /** @class */ (function () {
    function EditWordDialogComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.isVisible = false;
        this.save = new core_1.EventEmitter();
        this.cancel = new core_1.EventEmitter();
        this.remove = new core_1.EventEmitter();
        this.wordForm = this.formBuilder.group({
            language1: this.formBuilder.control('', [forms_1.Validators.required]),
            language2: this.formBuilder.control('', [forms_1.Validators.required]),
            example1: (''),
            example2: (''),
            isVisible: ('')
        });
    }
    Object.defineProperty(EditWordDialogComponent.prototype, "word", {
        set: function (value) {
            this._word = value;
            this.initForm();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditWordDialogComponent.prototype, "mode", {
        set: function (value) {
            this.setTitle(value);
            this.setRemoveBtnVisibility(value);
        },
        enumerable: false,
        configurable: true
    });
    EditWordDialogComponent.prototype.initForm = function () {
        this.wordForm.patchValue({
            language1: this._word.language1,
            language2: this._word.language2,
            example1: this._word.example1,
            example2: this._word.example2,
            isVisible: this._word.isVisible
        });
    };
    EditWordDialogComponent.prototype.onSave = function () {
        var newWord = __assign(__assign({}, this._word), { language1: this.wordForm.get('language1').value, language2: this.wordForm.get('language2').value, example1: this.wordForm.get('example1').value, example2: this.wordForm.get('example2').value, isVisible: this.wordForm.get('isVisible').value });
        console.log('onsave', newWord);
        this.save.emit(newWord);
    };
    EditWordDialogComponent.prototype.onCancel = function () {
        this.cancel.emit({});
    };
    EditWordDialogComponent.prototype.onRemove = function () {
        this.remove.emit(this._word.wordId);
    };
    EditWordDialogComponent.prototype.setTitle = function (value) {
        this.title = value === 'add' ? 'Add a new card' : 'Edit the card';
    };
    EditWordDialogComponent.prototype.setRemoveBtnVisibility = function (value) {
        this.isRemoveVisible = value === 'edit';
    };
    __decorate([
        core_1.Input()
    ], EditWordDialogComponent.prototype, "word");
    __decorate([
        core_1.Input()
    ], EditWordDialogComponent.prototype, "mode");
    __decorate([
        core_1.Input()
    ], EditWordDialogComponent.prototype, "isVisible");
    __decorate([
        core_1.Output()
    ], EditWordDialogComponent.prototype, "save");
    __decorate([
        core_1.Output()
    ], EditWordDialogComponent.prototype, "cancel");
    __decorate([
        core_1.Output()
    ], EditWordDialogComponent.prototype, "remove");
    EditWordDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-word-dialog',
            templateUrl: './edit-word-dialog.component.html',
            styleUrls: ['./edit-word-dialog.component.scss']
        })
    ], EditWordDialogComponent);
    return EditWordDialogComponent;
}());
exports.EditWordDialogComponent = EditWordDialogComponent;
