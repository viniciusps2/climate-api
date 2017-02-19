const pm2 = require('pm2')
const numCpus = require('os').cpus().length

const instances = process.env.WEB_CONCURRENCY || numCpus
const maxMemory = process.env.WEB_MEMORY || 512

console.log('Intances', instances)
console.log('MaxMemory', maxMemory)

function execute (project) {
  const options = {
    script: project.main,
    name: project.name,
    exec_mode: 'cluster',
    instances: instances,
    node_args: '--optimize_for_size --max_old_space_size=920 --gc_interval=100 --expose-gc',
    max_memory_restart: `${maxMemory}M` // Auto restart if process taking more than XXmo
  }

  pm2.connect(() => {
    pm2.start(options, (err) => {
      if (err) return console.error('Error while launching applications', err.stack || err)

      console.log('PM2 and application has been succesfully started')

      pm2.launchBus((err, bus) => {
        if (err) console.log(err)

        console.log('[PM2] Log streaming started')

        bus.on('log:out', (packet) => {
          console.log('[App:%s] %s', packet.process.name, packet.data)
        })

        bus.on('log:err', (packet) => {
          console.error('[App:%s][Err] %s', packet.process.name, packet.data)
        })
      })
    })
  })
}

module.exports = {execute}
