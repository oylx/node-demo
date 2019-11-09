const logger = require('./logger');

logger.log('hello world') // 普通日志打印
logger.info('hello world') // 等同于logger.log
logger.error('hello world') // 错误日志打印
logger.warn('hello world') // 等同于logger.error
logger.clear() // 清除控制台信息
