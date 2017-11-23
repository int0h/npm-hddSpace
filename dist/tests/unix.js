"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unix_1 = require("../unix");
var ava_1 = require("ava");
var fixtures_1 = require("./fixtures");
fixtures_1.unixFixtures.forEach(function (_a, id) {
    var name = _a.name, output = _a.output, expected = _a.result;
    ava_1.default("fixture #" + id + " (" + name + ")", function (t) {
        t.deepEqual(unix_1.parseUnixOutput(output), expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5peC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy91bml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQXdDO0FBQ3hDLDJCQUF1QjtBQUN2Qix1Q0FBd0M7QUFFeEMsdUJBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFnQyxFQUFFLEVBQUU7UUFBbkMsY0FBSSxFQUFFLGtCQUFNLEVBQUUsb0JBQWdCO0lBQ3BELGFBQUksQ0FBQyxjQUFZLEVBQUUsVUFBSyxJQUFJLE1BQUcsRUFBRSxVQUFBLENBQUM7UUFDakMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxzQkFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==