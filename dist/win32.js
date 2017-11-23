"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
/*
    [wmic logicaldisk get size,freespace,caption,volumename] output example:

    Caption  FreeSpace     Size          VolumeName
    C:       497654161408  539028877312  System
    D:

*/
function parseWin32Output(output) {
    var lines = output
        .split('\n');
    var labelOffset = lines[0].indexOf('VolumeName');
    var parts = lines
        .slice(1) // remove header
        .map(function (line) {
        var _a = line.split(/[\s]+/g), letter = _a[0], free = _a[1], size = _a[2];
        var partInfo = {
            place: letter,
            letter: letter,
            free: parseInt(free),
            size: parseInt(size)
        };
        if (labelOffset !== -1) {
            partInfo.label = line.slice(labelOffset).trim();
        }
        if (isNaN(partInfo.free) ||
            isNaN(partInfo.size) ||
            partInfo.place === '') {
            return null;
        }
        return partInfo;
    })
        .filter(function (part) {
        return !!part;
    });
    return {
        parts: parts,
        total: getTotal(parts)
    };
}
exports.parseWin32Output = parseWin32Output;
exports.win32Cmd = 'wmic logicaldisk get size,freespace,caption,volumename';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luMzIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd2luMzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBa0IsS0FBYTtJQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO1FBQy9CLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUN4QixLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNkLENBQUMsRUFBRTtRQUNGLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxFQUFFLENBQUM7S0FDUCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7RUFPRTtBQUVGLDBCQUFpQyxNQUFjO0lBQzlDLElBQU0sS0FBSyxHQUFHLE1BQU07U0FDbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2QsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuRCxJQUFNLEtBQUssR0FBRyxLQUFLO1NBQ2pCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7U0FDekIsR0FBRyxDQUFDLFVBQUEsSUFBSTtRQUNGLElBQUEseUJBQTJDLEVBQTFDLGNBQU0sRUFBRSxZQUFJLEVBQUUsWUFBSSxDQUF5QjtRQUNsRCxJQUFJLFFBQVEsR0FBUztZQUNwQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sUUFBQTtZQUNOLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3BCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQ3BCLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQ0YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEIsUUFBUSxDQUFDLEtBQUssS0FBSyxFQUNwQixDQUFDLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNqQixDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsVUFBQSxJQUFJO1FBQ1gsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDZixDQUFDLENBQVcsQ0FBQztJQUNkLE1BQU0sQ0FBQztRQUNOLEtBQUssT0FBQTtRQUNMLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDO0tBQ3RCLENBQUM7QUFDSCxDQUFDO0FBakNELDRDQWlDQztBQUVZLFFBQUEsUUFBUSxHQUFHLHdEQUF3RCxDQUFDIn0=