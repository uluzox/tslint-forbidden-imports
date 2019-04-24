import * as Path from 'path';
import * as Lint from 'tslint';
import { findImports, ImportKind } from 'tsutils';
import * as TS from 'typescript';

interface Options {
  /**
   * key: a RegEx to a path e.g. mySrcPath, or mySrcPath/*
   * value: a array of forbidden import RegExes, e.g. @otherPath* or otherPath/components/*
   */
  [key: string]: string[];
}

/**
 * Custom TS Lint rule for prohibiting imports of a pattern in a directory
 * c.f. https://palantir.github.io/tslint/develop/custom-rules/
 *
 *
 */
export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: TS.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walk, this
      .ruleArguments[0] as Options);
  }
}

function walk(ctx: Lint.WalkContext<Options>) {
  const fileToBeChecked = ctx.sourceFile as any;

  for (const path of Object.keys(ctx.options)) {

    // ignore files that are not in the relevant path
    if (!new RegExp(path).test(fileToBeChecked.fileName)) {
      // console.log(`File ${fileToBeChecked.fileName} is not in path ${path}`);
      continue;
    }

    for (const name of findImports(fileToBeChecked, ImportKind.All)) {
      // console.log(`Filename ${name.text}.`);

      for (const forbiddenImport of ctx.options[path]) {
       // console.log(`Forbidden import ${forbiddenImport}.`);

        if (new RegExp(forbiddenImport).test(name.text)) {
          ctx.addFailure(
            name.getStart(fileToBeChecked) + 1,
            name.end - 1,
            `The file "${fileToBeChecked.fileName}" located in "${path}" must not have an import from "${forbiddenImport}". Import is "${name.text}".`
          );
        }
      }
    }
  }
}

