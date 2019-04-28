"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var tsutils_1 = require("tsutils");
/**
 * Custom TS Lint rule for prohibiting imports of a pattern in a directory
 * c.f. https://palantir.github.io/tslint/develop/custom-rules/
 *
 *
 */
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this
            .ruleArguments[0]);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var fileToBeChecked = ctx.sourceFile;
    for (var _i = 0, _a = Object.keys(ctx.options); _i < _a.length; _i++) {
        var path = _a[_i];
        // ignore files that are not in the relevant path
        if (!new RegExp(path).test(fileToBeChecked.fileName)) {
            // console.log(`File ${fileToBeChecked.fileName} is not in path ${path}`);
            continue;
        }
        for (var _b = 0, _c = tsutils_1.findImports(fileToBeChecked, 63 /* All */); _b < _c.length; _b++) {
            var name_1 = _c[_b];
            // console.log(`Filename ${name.text}.`);
            for (var _d = 0, _e = ctx.options[path]; _d < _e.length; _d++) {
                var forbiddenImport = _e[_d];
                // console.log(`Forbidden import ${forbiddenImport}.`);
                if (new RegExp(forbiddenImport).test(name_1.text)) {
                    ctx.addFailure(name_1.getStart(fileToBeChecked) + 1, name_1.end - 1, "The file \"" + fileToBeChecked.fileName + "\" located in \"" + path + "\" must not have an import from \"" + forbiddenImport + "\". Import is \"" + name_1.text + "\".");
                }
            }
        }
    }
}
