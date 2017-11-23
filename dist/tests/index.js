"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var ava_1 = require("ava");
var fixtures_1 = require("./fixtures");
function validatePart(formated, placeValidation, t, part) {
    if (!formated) {
        t.is(typeof part.free, 'number');
        t.is(typeof part.size, 'number');
        t.false(isNaN(part.free));
        t.false(isNaN(part.size));
    }
    if (!placeValidation) {
        return;
    }
    t.is(typeof part.place, 'string');
    t.true(typeof part.letter === 'string' || typeof part.mountOn === 'string');
}
function validateHddInfo(formated, t, info) {
    t.is(typeof info, 'object');
    t.true('total' in info);
    info.parts.forEach(validatePart.bind(null, formated, true, t));
    validatePart(formated, false, t, info.total);
}
ava_1.default.cb('default works at all', function (t) {
    index_1.default({ format: function (i) { return i; } }, function (info) {
        t.pass();
        t.end();
    });
});
ava_1.default.cb('default returns a valid object', function (t) {
    index_1.default({ format: function (i) { return i; } }, function (info) {
        validateHddInfo(false, t, info);
        t.end();
    });
});
ava_1.default.cb('default returns a valid object w/o options', function (t) {
    index_1.default(function (info) {
        validateHddInfo(false, t, info);
        t.end();
    });
});
ava_1.default.cb('default returns a valid formatted object', function (t) {
    index_1.default({ format: 'auto' }, function (info) {
        validateHddInfo(true, t, info);
        t.end();
    });
});
ava_1.default.cb('default works with provided output (posix)', function (t) {
    var _a = fixtures_1.unixFixtures[0], output = _a.output, expected = _a.result;
    index_1.default({ format: function (i) { return i; }, output: output, platform: 'posix' }, function (info) {
        validateHddInfo(false, t, info);
        t.deepEqual(info, expected);
        t.end();
    });
});
ava_1.default.cb('default works with provided output (win32)', function (t) {
    var _a = fixtures_1.win32Fixtures[0], output = _a.output, expected = _a.result;
    index_1.default({ format: function (i) { return i; }, output: output, platform: 'win32' }, function (info) {
        validateHddInfo(false, t, info);
        t.deepEqual(info, expected);
        t.end();
    });
});
ava_1.default.cb('default throws on invalid output', function (t) {
    t.throws(function () {
        index_1.default({ format: 'auto', output: '' }, function (info) { });
    });
    t.end();
});
// getHddInfo:
ava_1.default.cb('getHddInfo works at all', function (t) {
    index_1.getHddInfo({ format: function (i) { return i; } }, function (err, info) {
        t.falsy(err);
        t.pass();
        t.end();
    });
});
ava_1.default.cb('getHddInfo returns a valid object', function (t) {
    index_1.getHddInfo({ format: function (i) { return i; } }, function (err, info) {
        t.falsy(err);
        info = info;
        validateHddInfo(false, t, info);
        t.end();
    });
});
ava_1.default.cb('getHddInfo returns a valid formatted object', function (t) {
    index_1.getHddInfo({ format: 'auto' }, function (err, info) {
        t.falsy(err);
        info = info;
        validateHddInfo(true, t, info);
        t.end();
    });
});
ava_1.default.cb('getHddInfo returns error via callback on invalid output', function (t) {
    index_1.getHddInfo({ format: 'auto', output: '' }, function (err, info) {
        t.truthy(err);
        t.end();
    });
});
ava_1.default.cb('getHddInfo returns error via callback on invalid output', function (t) {
    index_1.getHddInfo({ format: 'auto', output: '----' }, function (err, info) {
        t.truthy(err);
        t.end();
    });
});
// fetchHddInfo
ava_1.default('fetchHddInfo works at all', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.fetchHddInfo({ format: function (i) { return i; } })];
            case 1:
                info = _a.sent();
                t.pass();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('fetchHddInfo returns a valid object', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.fetchHddInfo({ format: function (i) { return i; } })];
            case 1:
                info = _a.sent();
                validateHddInfo(false, t, info);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('fetchHddInfo returns a valid formatted object', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.fetchHddInfo({ format: function (i) { return i; } })];
            case 1:
                info = _a.sent();
                validateHddInfo(true, t, info);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.cb('fetchHddInfo throws on invalid output', function (t) {
    index_1.fetchHddInfo({ format: function (i) { return i; }, output: '' })
        .catch(function () { return t.end(); });
});
ava_1.default('fetchHddInfo and auto format', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.fetchHddInfo({
                    format: 'auto',
                    platform: 'posix',
                    output: fixtures_1.formatFixtures[0].output
                })];
            case 1:
                info = _a.sent();
                validateHddInfo(true, t, info);
                t.deepEqual(info, fixtures_1.formatFixtures[0].result);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('fetchHddInfo works w/o options', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.fetchHddInfo()];
            case 1:
                info = _a.sent();
                validateHddInfo(false, t, info);
                return [2 /*return*/];
        }
    });
}); });
// node.js style require
var defNodejs = require('../index');
ava_1.default.cb('default works at all', function (t) {
    defNodejs({ format: function (i) { return i; } }, function (info) {
        t.pass();
        t.end();
    });
});
ava_1.default.cb('default returns a valid object w/o options', function (t) {
    defNodejs(function (info) {
        validateHddInfo(false, t, info);
        t.end();
    });
});
ava_1.default.cb('default returns a valid object', function (t) {
    defNodejs({ format: function (i) { return i; } }, function (info) {
        validateHddInfo(false, t, info);
        t.end();
    });
});
ava_1.default.cb('default returns a valid formatted object', function (t) {
    defNodejs({ format: 'auto' }, function (info) {
        validateHddInfo(true, t, info);
        t.end();
    });
});
// formating test
fixtures_1.formatFixtures.forEach(function (_a, id) {
    var name = _a.name, output = _a.output, expected = _a.result;
    ava_1.default.cb("getHddInfo returns a valid formatted object [" + name + "]", function (t) {
        index_1.getHddInfo({ format: 'auto', output: output, platform: name }, function (err, info) {
            t.falsy(err);
            info = info;
            t.deepEqual(info, expected);
            t.end();
        });
    });
});
// custom fetcher
ava_1.default.cb("getHddInfo works with a custom fetcher", function (t) {
    index_1.getHddInfo({
        format: 'auto',
        platform: 'posix',
        fetchOutput: function (cb) {
            cb(null, fixtures_1.formatFixtures[0].output);
        }
    }, function (err, info) {
        t.falsy(err);
        info = info;
        t.deepEqual(info, fixtures_1.formatFixtures[0].result);
        t.end();
    });
});
ava_1.default.cb("getHddInfo handles errors in a custom fetcher", function (t) {
    index_1.getHddInfo({
        format: 'auto',
        platform: 'posix',
        fetchOutput: function (cb) {
            cb(new Error('bad'));
        }
    }, function (err, info) {
        t.truthy(err);
        t.end();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBME9BOztBQTFPQSxrQ0FBMEc7QUFDMUcsMkJBQXVCO0FBRXZCLHVDQUF1RTtBQUV2RSxzQkFBc0IsUUFBaUIsRUFBRSxlQUF3QixFQUFFLENBQW9DLEVBQUUsSUFBa0I7SUFDMUgsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQWMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQWMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUM7SUFDUixDQUFDO0lBQ0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBRUQseUJBQXlCLFFBQWlCLEVBQUUsQ0FBb0MsRUFBRSxJQUFxQjtJQUN0RyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxFQUFFLFFB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