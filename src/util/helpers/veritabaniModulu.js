// veritabaniModulu.js
const moment = require('moment');

class VeritabaniModulu {
  constructor() {
    this.veritabani = new Map();
  }

  kaydet(userID, sure) {
    const eskiSure = this.veritabani.get(userID) || 0;
    this.veritabani.set(userID, eskiSure + sure);
  }

  getir(userID) {
    const sure = this.veritabani.get(userID) || 0;
    return moment.duration(sure).humanize();
  }
}

module.exports = new VeritabaniModulu();
