"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prepareFixture(fixture, prefix) {
    return fixture
        .trim()
        .split('\n')
        .map(function (line) { return line.replace(prefix, ''); })
        .join('\n');
}
exports.prepareFixture = prepareFixture;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvaGVscGVycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdCQUErQixPQUFlLEVBQUUsTUFBdUI7SUFDdEUsTUFBTSxDQUFDLE9BQU87U0FDWixJQUFJLEVBQUU7U0FDTixLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQXhCLENBQXdCLENBQUM7U0FDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQU5ELHdDQU1DIn0=