"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var utils_1 = require("./utils");
var format_1 = require("./format");
var unix_1 = require("./unix");
var win32_1 = require("./win32");
function formatResult(opts, res) {
    var formater = function (size) { return format_1.formatSize(opts.format, size); };
    var newRes = {
        parts: res.parts.map(function (part) {
            var newPart = {
                free: formater(part.free),
                size: formater(part.size),
                place: part.place
            };
            if ('letter' in part) {
                newPart.letter = part.letter;
            }
            if ('mountOn' in part) {
                newPart.mountOn = part.mountOn;
            }
            if ('label' in part) {
                newPart.label = part.label;
            }
            return newPart;
        }),
        total: {
            free: formater(res.total.free),
            size: formater(res.total.size)
        }
    };
    return newRes;
}
function runCmd(commandFn, parser, callback) {
    commandFn(function (err, output) {
        if (err) {
            callback(err);
            return;
        }
        if (!output || output.trim() === '') {
            callback(new Error('empty output'));
            return;
        }
        try {
            var result = parser(output);
            if (result.parts.length === 0) {
                throw new Error('cannot parse output');
            }
            callback(null, result);
        }
        catch (e) {
            console.error(e);
            callback(new Error('cannot parse output'));
        }
    });
}
var defaultOpts = {
    format: function (size) { return size; }
};
function getHddInfo(opts, callback) {
    var platform = opts.platform || process.platform;
    var _a = platform === 'win32'
        ? [win32_1.win32Cmd, win32_1.parseWin32Output]
        : [unix_1.unixCmd, unix_1.parseUnixOutput], cmd = _a[0], parser = _a[1];
    var fn = opts.fetchOutput || ('output' in opts
        ? function (cb) { return cb(null, opts.output); }
        : child_process_1.exec.bind(null, cmd));
    runCmd(fn, parser, function (err, result) {
        if (err) {
            callback(err);
            return;
        }
        var formatted = formatResult(opts, result);
        callback(null, formatted);
    });
}
exports.getHddInfo = getHddInfo;
function fetchHddInfo(opts) {
    if (opts === void 0) { opts = defaultOpts; }
    return new Promise(function (resolve, reject) {
        getHddInfo(opts, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
exports.fetchHddInfo = fetchHddInfo;
function getCrossPlatformInfo(opts, callback) {
    if (arguments.length < 2) {
        callback = opts;
        opts = defaultOpts;
    }
    opts = opts;
    getHddInfo(opts, function (err, res) {
        if (err) {
            throw err;
        }
        callback(res);
    });
}
exports.default = getCrossPlatformInfo;
module.exports = utils_1.assign(getCrossPlatformInfo, module.exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBbUM7QUFFbkMsaUNBQStCO0FBQy9CLG1DQUE0QztBQUM1QywrQkFBZ0Q7QUFDaEQsaUNBQW1EO0FBdUNuRCxzQkFBc0IsSUFBVSxFQUFFLEdBQVk7SUFDN0MsSUFBTSxRQUFRLEdBQUcsVUFBQyxJQUFZLElBQUssT0FBQSxtQkFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTdCLENBQTZCLENBQUM7SUFDakUsSUFBTSxNQUFNLEdBQW9CO1FBQy9CLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDeEIsSUFBSSxPQUFPLEdBQWlCO2dCQUMzQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ2pCLENBQUM7WUFDRixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzlCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzVCLENBQUM7WUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUNG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