const pm2 = require('./lib/pm2')
const project = require('./package')

pm2.execute(project)
