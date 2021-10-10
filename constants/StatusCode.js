class StatusCode {
  constructor() {
    this.codes = {
      OK: '200',
      CREATED: '201',
      BAD_REQUEST: '400',
      FORBIDDEN: '403',
      CONFLICT: '409',
      ER_DUP_ENTRY: 'ER_DUP_ENTRY',
    };
  }
}

module.exports = new StatusCode();