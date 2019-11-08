/**
 * crypto.createCipheriv(algorithm, pwd, iv) 指定算法、密码、向量创建 cipher 加密对象
 * @param str
 * @returns {*}
 */
function cipher(str) {

  try {
    const crypto = require('crypto');
    // const cipher = crypto.createCipher('des-ecb', '123456');

    const cipher = crypto.createCipheriv('des-ecb', '12345678', '');
    //与其他语言加密采用这种写法

    /**
     * update方法
     * 第一个参数代表加密的数据
     * 第二参数代表传入数据的格式，可以是'utf8', 'ascii', 'latin1'
     * 第三个参数代表加密数据的输出格式，可以是'latin1'， 'base64' 或者 'hex'。没有执行则返回Buffer
     */
    let encrypted = cipher.update(str, 'utf8', 'hex');

    /**
     * final方法，返回任何加密的内容
     * 参数可以是'latin1', 'base64' 或者 'hex'，没有指定返回Buffer
     */
    encrypted += cipher.final('hex');

    return encrypted;
  } catch (e) {
    console.log('加密失败');

    return e.message || e;
  }
}

const result = cipher('hello world ！！！') // 81c66a1d39d302205c55f0afac95c06bc985155d4ddb751c
console.log(result)

/**
 * crypto.createDecipheriv(algorithm, pwd, iv) 指定算法、密码、向量创建 decipher 解密对象
 * @param encrypted
 * @returns {*}
 */
function decipher(encrypted){
  try{
    const crypto = require('crypto');
    // const decipher = crypto.createDecipher('des-ecb', '123456');

    const decipher = crypto.createDecipheriv('des-ecb', '12345678', '');

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }catch(e){
    console.log('解密失败');

    return e.message || e;
  }
}

const result1 =decipher('81c66a1d39d302205c55f0afac95c06bc985155d4ddb751c'); // hello world ！！！
console.log(result1)
