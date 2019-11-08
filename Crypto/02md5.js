/**
 * MD5作用和特点
 * 是让大容量信息在数字签名软件签署私人秘钥前被 “压缩” 成一种保密格式，也就是把一
 * 任意长度的字节串变换成一定长度的十六进制数字串（32个字符） 一致性验证
 *
 * 不可逆
 * 输入两个不同的明文不会得到相同的输出值
 * 根据输出值，不能得到原始的明文，即过程不可逆
 */

/**
 * crypto.createHash(algorithm)
 * 创建并返回一个 hash 对象，它是一个指定算法的加密 hash，用于生成 hash 摘要。
 * 参数 algorithm 可选择系统上安装的 OpenSSL 版本所支持的算法。例如：sha1、md5、sha256、sha512 等。
 * 在近期发行的版本中，openssl list-message-digest-algorithms 会显示这些可用的摘要算法。
 */

/**
 * hash.update(data)
 * 更新 hash 的内容为指定的 data。当使用流数据时可能会多次调用该方法。
 */

/**
 * hash.digest(encoding='binary')
 * 计算所有传入数据的 hash 摘要。参数 encoding（编码方式）可以为 hex、binary、base64。
 */
const crypto = require('crypto');
const md5 = str => {
    return crypto.createHash('md5').update(str, 'utf8').digest('hex')
};

// 默认输出长度为32位小写字母
// 25f9e794323b453885f5181f1b624d0b
console.log(md5('123456789'));

// 以下转换为32位大写字母
// 25F9E794323B453885F5181F1B624D0B
console.log(md5('123456789').toUpperCase());
