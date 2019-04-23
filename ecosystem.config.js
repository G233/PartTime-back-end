module.exports = {
  apps: [{
    name: 'PT',
    script: 'www',
    watch: true,
    ignore_watch: ['node_modules'],
    max_memory_restart: '2G',
    exec_mode: 'cluster',
    instances: 2
  }],
};