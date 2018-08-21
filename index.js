const fs = require('fs')
const { resolve } = require('path')

function installHook(hookFilePath) {
  const hookContent = `
#!/bin/sh
#
# Git hook to run your \`test\` command of your \`package.json\` scripts
#

# Redirect output to stderr
exec 1>&2

# Default package manager
npkg=npm

# Check if Yarn is installed
if command -v yarn > /dev/null 2>&1; then
  npkg=yarn
fi

# Run test command
echo
echo "⛈  Running your test suite before committing..."
echo

$npkg run test

if ! [ $? -eq 0 ]; then
  echo
  echo "💥  Please make sure that your tests are passing and then try to commit again."
  echo
  exit 1
fi
`

  const hookPath = resolve(hookFilePath)
  const hookPathBak = hookPath + '.bak'

  // Backup the existing pre-commit hooks
  if (fs.existsSync(hookPath)) {
    fs.writeFileSync(hookPathBak, fs.readFileSync(hookPath), { mode: 0755 });
    console.log()
    console.info(
      '📦  One `pre-commit` hook was found and corresponding `pre-commit.bak` backup was made.'
    )
  }

  // Write the new pre-commit hook
  fs.writeFileSync(hookPath, hookContent, { mode: 0755 })

  console.log()
  console.info(
    '🍏  Your `pre-commit` hook was installed successfully!'
  )
  console.log()
}

module.exports = {
  installHook
}
