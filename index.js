require('./lib/mongodb')
require('./scripts/seed-db')()

const project = require('./package')
const app = require('./app')
const port = process.env.PORT || 3006

module.exports = app

app.listen(port, () => console.log(project.name + ' - Listening on port ' + port))
