"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var parseColumns = require("parse-columns");
;
;
function getTotal(parts) {
    return parts.reduce(function (total, part) {
        total.size += part.size;
        total.free += part.free;
        return total;
    }, {
        size: 0,
        free: 0
    });
}
;
function parseDf(output) {
    var extractTable = {
        3: 'free',
        5: 'mp',
        1: 'size'
    };
    var res = [];
    parseColumns(output, {
        transform: function (value, header, columnIndex, rowIndex) {
            var key = extractTable[columnIndex];
            if (!key) {
                return;
            }
            var row = res[rowIndex - 1];
            if (!row) {
                row = {};
                res[rowIndex - 1] = row;
            }
            if (key !== 'mp') {
                value = Number(value);
            }
            row[key] = value;
        }
    });
    return res;
}
;
function getUnixInfo(callback) {
    /*
        [df] output example:

        Filesystem	 1K-blocks	Used Available Use% Mounted on
        rootfs		  15506408 1149728  13708188   8% /
        /dev/root	   15506408 1149728  13708188   8% /
        devtmpfs		  447624	   0	447624   0% /dev
        tmpfs			  89548	 208	 89340   1% /run
        tmpfs			   5120	   0	  5120   0% /run/lock
        tmpfs			 179080	   0	179080   0% /run/shm

    */
    child_process_1.exec('df -Pk', function (err, output) {
        var parsed = parseDf(output.trim());
        var root = null;
        var parts = parsed
            .map(function (part) {
            var res = {
                size: part.size * 1024,
                free: part.free * 1024,
                place: part.mp,
                mountOn: part.mp
            };
            if (part.mp === "/") {
                root = res;
            }
            ;
            return res;
        });
        var resultObj = {
            parts: parts,
            total: root
        };
        callback(resultObj);
    });
}
;
function isNaN(val) {
    return val !== val;
}
function getWindowsInfo(callback) {
    /*
        [wmic logicaldisk get size,freespace,caption] output example:

        Caption  FreeSpace	Size
        C:	   1286164480   34359734272
        D:	   1864638464   50925137920
        E:
        F:	   77553082368  990202818560
        G:
        L:


    */
    child_process_1.exec('wmic logicaldisk get size,freespace,caption', function (err, output) {
        var parts = output
            .split('\n')
            .slice(1) // remove header
            .map(function (line) {
            var lineParts = line.split(/[\s]+/g);
            var partInfo = {
                place: lineParts[0],
                letter: lineParts[0],
                free: parseInt(lineParts[1]),
                size: parseInt(lineParts[2])
            };
            if (isNaN(partInfo.free) ||
                isNaN(partInfo.size) ||
                partInfo.place == '') {
                return null;
            }
            ;
            return partInfo;
        })
            .filter(function (part) {
            return !!part;
        });
        var resultObj = {
            parts: parts,
            total: getTotal(parts)
        };
        callback(resultObj);
    });
}
;
var formaters = {
    "byte": function (size) { return (size) + ' Bytes'; },
    "bit": function (size) { return (size * 8) + ' Bits'; },
    "kb": function (size) { return (size / 1024).toFixed(2) + ' KB'; },
    "mb": function (size) { return (size / 1024 / 1024).toFixed(2) + ' MB'; },
    "gb": function (size) { return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'; },
    "tb": function (size) { return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'; },
    "pb": function (size) { return (size / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' PB'; },
    "auto": function (size) {
        if (size === 0) {
            return formaters.byte(size);
        }
        ;
        var scale = Math.floor(Math.log(size) / Math.log(1024));
        switch (scale) {
            case 0: return formaters.byte(size);
            case 1: return formaters.kb(size);
            case 2: return formaters.mb(size);
            case 3: return formaters.gb(size);
            case 4: return formaters.tb(size);
            default: return formaters.pb(size);
        }
    }
};
function formatResult(opts, res) {
    var formater = opts.format;
    if (typeof formater !== "function") {
        formater = formaters[formater.toLowerCase()];
    }
    ;
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
            ;
            if ('mountOn' in part) {
                newPart.mountOn = part.mountOn;
            }
            ;
            return newPart;
        }),
        total: {
            free: formater(res.total.free),
            size: formater(res.total.size)
        }
    };
    return newRes;
}
;
function getCrossPlatformInfo(opts, callback) {
    if (arguments.length < 2) {
        callback = opts;
        opts = { format: function (size) { return size; } };
    }
    ;
    var func = process.platform === "win32"
        ? getWindowsInfo
        : getUnixInfo;
    func(function (res) {
        callback(formatResult(opts, res));
    });
}
exports.default = getCrossPlatformInfo;
;
module.exports = getCrossPlatformInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLCtDQUEwQztBQUMxQyw0Q0FBOEM7QUFRN0MsQ0FBQztBQUtELENBQUM7QUFFRixrQkFBa0IsS0FBYztJQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO1FBQy9CLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUN4QixLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNkLENBQUMsRUFBRTtRQUNGLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxFQUFFLENBQUM7S0FDUCxDQUFDLENBQUM7QUFDSixDQUFDO0FBQUEsQ0FBQztBQWNGLGlCQUFpQixNQUFjO0lBQzlCLElBQU0sWUFBWSxHQUFpQjtRQUNsQyxDQUFDLEVBQUUsTUFBTTtRQUNULENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLE1BQU07S0FDVCxDQUFDO0lBRUYsSUFBSSxHQUFHLEdBQWUsRUFBRSxDQUFDO0lBRXpCLFlBQVksQ0FBQyxNQUFNLEVBQUU7UUFDcEIsU0FBUyxFQUFFLFVBQUMsS0FBc0IsRUFBRSxNQUFjLEVBQUUsV0FBbUIsRUFBRSxRQUFnQjtZQUN4RixJQUFNLEdBQUcsR0FBbUIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDVixNQUFNLENBQUM7WUFDUixDQUFDO1lBQ0QsSUFBSSxHQUFHLEdBQWEsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsR0FBRyxH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