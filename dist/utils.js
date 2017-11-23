"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function invertHashTable(srcObject) {
    var res = {};
    for (var name in srcObject) {
        var value = srcObject[name];
        res[value] = name;
    }
    return res;
}
exports.invertHashTable = invertHashTable;
function assign(destObj, srcObject) {
    for (var i in srcObject) {
        destObj[i] = srcObject[i];
    }
    return destObj;
}
exports.assign = assign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBZ0MsU0FBYztJQUM3QyxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUM7SUFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNaLENBQUM7QUFQRCwwQ0FPQztBQUVELGdCQUF1QixPQUFZLEVBQUUsU0FBYztJQUNsRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDaEIsQ0FBQztBQUxELHdCQUtDIn0=