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
exports.__esModule = true;
exports.HideDialog = exports.ShowDialog = exports.RemoveGroupSuccess = exports.RemoveGroup = exports.AddGroupSuccess = exports.AddGroup = exports.UpdateGroupSuccess = exports.UpdateGroup = exports.GetGroupsSuccess = exports.GetGroups = exports.GroupListTypes = void 0;
var group_model_1 = require("../models/group.model");
var language_type_mode_1 = require("src/app/share/models/language-type.mode");
var GroupListTypes;
(function (GroupListTypes) {
    GroupListTypes["SHOW_DIALOG"] = "[GROUP_LIST_STATE] SHOW_DIALOG";
    GroupListTypes["HIDE_DIALOG"] = "[GROUP_LIST_STATE] HIDE_DIALOG";
    GroupListTypes["GET_GROUPS"] = "[GROUP_LIST_STATE] GET_GROUPS";
    GroupListTypes["GET_GROUPS_SUCCESS"] = "[GROUP_LIST_STATE] GET_GROUPS_SUCCESS";
    GroupListTypes["UPDATE_GROUP"] = "[GROUP_LIST_STATE] UPDATE_GROUP";
    GroupListTypes["UPDATE_GROUP_SUCCESS"] = "[GROUP_LIST_STATE] UPDATE_GROUP_SUCCESS";
    GroupListTypes["ADD_GROUP"] = "[GROUP_LIST_STATE] ADD_GROUP";
    GroupListTypes["ADD_GROUP_SUCCESS"] = "[GROUP_LIST_STATE] ADD_GROUP_SUCCESS";
    GroupListTypes["REMOVE_GROUP"] = "[GROUP_LIST_STATE] REMOVE_GROUP";
    GroupListTypes["REMOVE_GROUP_SUCCESS"] = "[GROUP_LIST_STATE] REMOVE_GROUP_SUCCESS";
})(GroupListTypes = exports.GroupListTypes || (exports.GroupListTypes = {}));
var GetGroups = /** @class */ (function () {
    function GetGroups() {
        this.type = GroupListTypes.GET_GROUPS;
    }
    GetGroups.reduce = function (state) {
        return __assign(__assign({}, state), { isLoading: true });
    };
    return GetGroups;
}());
exports.GetGroups = GetGroups;
var GetGroupsSuccess = /** @class */ (function () {
    function GetGroupsSuccess(payload) {
        this.payload = payload;
        this.type = GroupListTypes.GET_GROUPS_SUCCESS;
    }
    GetGroupsSuccess.reduce = function (state, action) {
        return __assign(__assign({}, state), { groups: action.payload.groups, isLoading: false });
    };
    return GetGroupsSuccess;
}());
exports.GetGroupsSuccess = GetGroupsSuccess;
var UpdateGroup = /** @class */ (function () {
    function UpdateGroup(payload) {
        this.payload = payload;
        this.type = GroupListTypes.UPDATE_GROUP;
    }
    UpdateGroup.reduce = function (state) {
        return __assign({}, state);
    };
    return UpdateGroup;
}());
exports.UpdateGroup = UpdateGroup;
var UpdateGroupSuccess = /** @class */ (function () {
    function UpdateGroupSuccess(payload) {
        this.payload = payload;
        this.type = GroupListTypes.UPDATE_GROUP_SUCCESS;
    }
    UpdateGroupSuccess.reduce = function (state, action) {
        var groups = [];
        state.groups.forEach(function (item) {
            groups.push(item.id === action.payload.group.id ? __assign(__assign({}, item), { name: action.payload.group.name, language1: language_type_mode_1.LanguageType.getLanguageType(action.payload.group.language1), language2: language_type_mode_1.LanguageType.getLanguageType(action.payload.group.language2) }) : item);
        });
        return __assign(__assign({}, state), { groups: groups });
    };
    return UpdateGroupSuccess;
}());
exports.UpdateGroupSuccess = UpdateGroupSuccess;
var AddGroup = /** @class */ (function () {
    function AddGroup(payload) {
        this.payload = payload;
        this.type = GroupListTypes.ADD_GROUP;
    }
    AddGroup.reduce = function (state) {
        return __assign({}, state);
    };
    return AddGroup;
}());
exports.AddGroup = AddGroup;
var AddGroupSuccess = /** @class */ (function () {
    function AddGroupSuccess(payload) {
        this.payload = payload;
        this.type = GroupListTypes.ADD_GROUP_SUCCESS;
    }
    AddGroupSuccess.reduce = function (state, action) {
        var newGroup = new group_model_1.Group(action.payload.groupId, action.payload.group.name, action.payload.group.language1, action.payload.group.language2, 0, 0, 0, 0);
        var groups = [];
        state.groups.forEach(function (item) {
            groups.push(item);
        });
        groups.push(newGroup);
        return __assign(__assign({}, state), { groups: groups });
    };
    return AddGroupSuccess;
}());
exports.AddGroupSuccess = AddGroupSuccess;
var RemoveGroup = /** @class */ (function () {
    function RemoveGroup(payload) {
        this.payload = payload;
        this.type = GroupListTypes.REMOVE_GROUP;
    }
    RemoveGroup.reduce = function (state, action) {
        return __assign({}, state);
    };
    return RemoveGroup;
}());
exports.RemoveGroup = RemoveGroup;
var RemoveGroupSuccess = /** @class */ (function () {
    function RemoveGroupSuccess(payload) {
        this.payload = payload;
        this.type = GroupListTypes.REMOVE_GROUP_SUCCESS;
    }
    RemoveGroupSuccess.reduce = function (state, action) {
        return __assign(__assign({}, state), { groups: state.groups.filter(function (item) { return item.id !== action.payload.groupId; }) });
    };
    return RemoveGroupSuccess;
}());
exports.RemoveGroupSuccess = RemoveGroupSuccess;
var ShowDialog = /** @class */ (function () {
    function ShowDialog(payload) {
        this.payload = payload;
        this.type = GroupListTypes.SHOW_DIALOG;
    }
    ShowDialog.reduce = function (state, action) {
        return __assign(__assign({}, state), { dialogMode: action.payload.mode, dialogGroup: action.payload.group, dialogVisibility: true });
    };
    return ShowDialog;
}());
exports.ShowDialog = ShowDialog;
var HideDialog = /** @class */ (function () {
    function HideDialog() {
        this.type = GroupListTypes.HIDE_DIALOG;
    }
    HideDialog.reduce = function (state) {
        return __assign(__assign({}, state), { dialogGroup: null, dialogVisibility: false });
    };
    return HideDialog;
}());
exports.HideDialog = HideDialog;
