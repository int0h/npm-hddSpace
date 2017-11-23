"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var win32_1 = require("../win32");
var ava_1 = require("ava");
var fixtures_1 = require("./fixtures");
fixtures_1.win32Fixtures.forEach(function (_a, id) {
    var name = _a.name, output = _a.output, expected = _a.result;
    ava_1.default("fixture #" + id + " (" + name + ")", function (t) {
        t.deepEqual(win32_1.parseWin32Output(output), expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luMzIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdHMvd2luMzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBMEM7QUFDMUMsMkJBQXVCO0FBQ3ZCLHVDQUF5QztBQUV6Qyx3QkFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQWdDLEVBQUUsRUFBRTtRQUFuQyxjQUFJLEVBQUUsa0JBQU0sRUFBRSxvQkFBZ0I7SUFDckQsYUFBSSxDQUFDLGNBQVksRUFBRSxVQUFLLElBQUksTUFBRyxFQUFFLFVBQUEsQ0FBQztRQUNqQyxDQUFDLENBQUMsU0FBUyxDQUFDLHdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==