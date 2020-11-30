"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupDetailsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var group_details_component_1 = require("./group-details.component");
var group_details_routing_module_1 = require("./group-details-routing.module");
var word_row_component_1 = require("./components/word-row/word-row.component");
var group_details_mapper_1 = require("./services/group-details.mapper/group-details.mapper");
var group_details_http_service_1 = require("./services/group-details-http/group-details-http.service");
var environment_1 = require("src/environments/environment");
var forms_1 = require("@angular/forms");
var effects_1 = require("./store/effects");
var reducer_1 = require("./store/reducer");
var store_1 = require("@ngrx/store");
var effects_2 = require("@ngrx/effects");
var word_mapper_1 = require("./services/word-mapper/word-mapper");
var inputtext_1 = require("primeng/inputtext");
var add_group_component_1 = require("./pages/add-group/add-group.component");
var share_module_1 = require("../share/share.module");
var group_description_component_1 = require("./components/group-description/group-description.component");
var GroupDetailsModule = /** @class */ (function () {
    function GroupDetailsModule() {
    }
    GroupDetailsModule = __decorate([
        core_1.NgModule({
            declarations: [
                group_details_component_1.GroupDetailsComponent,
                word_row_component_1.WordRowComponent,
                add_group_component_1.AddGroupComponent,
                group_description_component_1.GroupDescriptionComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                group_details_routing_module_1.GroupsDetailsRoutingModule,
                inputtext_1.InputTextModule,
                share_module_1.ShareModule,
                store_1.StoreModule.forFeature('groupDetailsStore', reducer_1.reducer),
                effects_2.EffectsModule.forFeature([effects_1.GroupDetailsEffects]),
            ],
            providers: [
                { provide: group_details_http_service_1.GroupDetailsHttpBase, useClass: environment_1.environment.mockServer ? group_details_http_service_1.GroupDetailsHttp : group_details_http_service_1.GroupDetailsHttpMock },
                group_details_mapper_1.GroupDetailsMapper,
                word_mapper_1.WordMapper
            ]
        })
    ], GroupDetailsModule);
    return GroupDetailsModule;
}());
exports.GroupDetailsModule = GroupDetailsModule;
