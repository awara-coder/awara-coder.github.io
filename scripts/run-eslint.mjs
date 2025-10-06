import { ESLint } from 'eslint';

async function runEslint() {
  const eslint = new ESLint({
    fix: true,
    overrideConfigFile: 'eslint.config.mjs',
  });

  const results = await eslint.lintFiles(process.argv.slice(2));

  await ESLint.outputFixes(results);

  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);
  console.log(resultText);

  const hasError = results.some(result => result.errorCount > 0);
  if (hasError) {
    process.exit(1);
  }
}

runEslint().catch(error => {
  console.error(error);
  process.exit(1);
});