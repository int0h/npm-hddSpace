"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse_columns_1 = require("parse-columns");
function parseDf(output) {
    var extractTable = {
        3: 'free',
        5: 'mp',
        1: 'size'
    };
    var res = [];
    parse_columns_1.default(output, {
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
            row[key] = key === 'mp' ? value : Number(value);
        }
    });
    return res;
}
/*
        [df] output example:

        Filesystem     1K-blocks    Used Available Use% Mounted on
        rootfs          15506408 1149728  13708188   8% /
        /dev/root       15506408 1149728  13708188   8% /
        devtmpfs          447624       0    447624   0% /dev
        tmpfs              89548     208     89340   1% /run
        tmpfs               5120       0      5120   0% /run/lock
        tmpfs             179080       0    179080   0% /run/shm

    */
function parseUnixOutput(output) {
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
        if (part.mp === '/') {
            root = res;
        }
        return res;
    });
    var total = {
        size: root.size,
        free: root.free
    };
    return {
        parts: parts,
        total: total
    };
}
exports.parseUnixOutput = parseUnixOutput;
exports.unixCmd = 'df -Pk';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5peC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91bml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXlDO0FBZXpDLGlCQUFpQixNQUFjO0lBQzlCLElBQU0sWUFBWSxHQUFpQjtRQUNsQyxDQUFDLEVBQUUsTUFBTTtRQUNULENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLE1BQU07S0FDVCxDQUFDO0lBQ0YsSUFBSSxHQUFHLEdBQWUsRUFBRSxDQUFDO0lBQ3pCLHVCQUFZLENBQUMsTUFBTSxFQUFFO1FBQ3BCLFNBQVMsRUFBRSxVQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVE7WUFDL0MsSUFBTSxHQUFHLEdBQW1CLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsTUFBTSxDQUFDO1lBQ1IsQ0FBQztZQUNELElBQUksR0FBRyxHQUFhLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNWLEdBQUcsR0FBRyxFQUFjLENBQUM7Z0JBQ3JCLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLENBQUM7WUFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsQ0FBQztLQUNELENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDWixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O01BV0c7QUFFSCx5QkFBZ0MsTUFBYztJQUM3QyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEMsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDO0lBQ3JCLElBQU0sS0FBSyxHQUFXLE1BQU07U0FDMUIsR0FBRyxDQUFDLFVBQUMsSUFBSTtRQUNULElBQU0sR0FBRyxHQUFHO1lBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJO1lBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNoQixDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksR0FBRyxHQUFHLENBQUM7UUFDWixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0osSUFBTSxLQUFLLEdBQUc7UUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7UUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7S0FDZixDQUFDO0lBQ0YsTUFBTSxDQUFDO1FBQ04sS0FBSyxPQUFBO1FBQ0wsS0FBSyxPQUFBO0tBQ0wsQ0FBQztBQUNILENBQUM7QUF4QkQsMENBd0JDO0FBRVksUUFBQSxPQUFPLEdBQUcsUUFBUSxDQUFDIn0=