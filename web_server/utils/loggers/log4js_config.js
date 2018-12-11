module.exports = {
  appenders: [
    { // 控制台输出
      type: 'console',
      category: "console"
    },
    {
      type: 'file',
      filename: 'logs/access.log',
      maxLogSize: 1024*1024, // 1KB=1024Byte 1MB=1024KB
      backups: 2,
      category: 'default'
    },
    {
      type: 'file',
      filename: 'logs/access.log',
      maxLogSize: 1024*1024,
      backups: 2,
      category: 'normal'
    }
  ],
  replaceConsole: true
}