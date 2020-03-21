const crypto = require('crypto');

class CryptographyService {
    constructor() {}

    hashPassword(password) {
        return crypto
          .createHash("sha256")
          .update(password)
          .digest("hex");
      }
}

module.exports = new CryptographyService();