"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REACTION = exports.USER_AGENT = exports.GENDER = exports.ENUM_ROLE = void 0;
var ENUM_ROLE;
(function (ENUM_ROLE) {
    ENUM_ROLE["user"] = "user";
    ENUM_ROLE["admin"] = "admin";
    ENUM_ROLE["superAdmin"] = "superAdmin";
})(ENUM_ROLE || (exports.ENUM_ROLE = ENUM_ROLE = {}));
var GENDER;
(function (GENDER) {
    GENDER["male"] = "male";
    GENDER["female"] = "female";
})(GENDER || (exports.GENDER = GENDER = {}));
var USER_AGENT;
(function (USER_AGENT) {
    USER_AGENT["local"] = "local";
    USER_AGENT["google"] = "google";
})(USER_AGENT || (exports.USER_AGENT = USER_AGENT = {}));
var REACTION;
(function (REACTION) {
    REACTION[REACTION["like"] = 0] = "like";
    REACTION[REACTION["love"] = 1] = "love";
    REACTION[REACTION["angry"] = 2] = "angry";
    REACTION[REACTION["care"] = 3] = "care";
    REACTION[REACTION["sad"] = 4] = "sad";
})(REACTION || (exports.REACTION = REACTION = {}));
