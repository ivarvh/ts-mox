"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mox = (function () {
    function Mox() {
    }
    Mox.createMock = function (clazz) {
        var mock = {};
        clazz = new clazz();
        var objProps = this.props(clazz);
        for (var member in objProps) {
            if (typeof clazz[objProps[member]] === "function") {
                mock[objProps[member]] = function () { return null; };
            }
            else {
                mock[objProps[member]] = null;
            }
        }
        return mock;
    };
    Mox.props = function (obj) {
        var p = [];
        for (; obj != null; obj = Object.getPrototypeOf(obj)) {
            var op = Object.getOwnPropertyNames(obj);
            op.forEach(function (element) {
                if (p.indexOf(element) === -1) {
                    p.push(element);
                }
            });
        }
        return p;
    };
    return Mox;
}());
exports.default = Mox;
