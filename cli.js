const { exec } = require('child_process')
const { installHook } = require('./')

validateRepository((err) => {
  if (err) {
    console.log()
    console.warn(
      '⚠  There is no valid git repository. Initialize your repository and install this package again.'
    )
    console.log()

    return
  }

  installHook('.git/hooks/pre-commit')
})

function validateRepository(callback) {
  exec('git rev-parse --git-dir > /dev/null 2>&1', callback)
}
