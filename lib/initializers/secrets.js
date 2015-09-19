var fs = require('fs')

var secrets = {
  'cookie': 'my-new-project',
  'jwt': {
    'key': 'secret-key',
    'options': {
      'expiresInMinutes': 4320
    }
  }
}

var data = JSON.stringify(secrets, null, 2)
fs.writeFileSync(process.cwd() + '/config/secrets.json', data)

console.log('secrets.json created')
process.exit(0)
