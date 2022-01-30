import compose from './compose';
import processRequest from './middleware/processRequest';

class AxiosBaseRequest {
  constructor(options) {
    this.options        = options || {};
    this.middleware     = this.middleware || [];
    this.coreMiddleware = this.coreMiddleware || [];
    this.coreMiddleware.push(processRequest);
  }

  /**
   * Use the given middleware `fn`.
   *
   * @param {Function} fn
   */
  use(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
    this.middleware.push(fn);
    return this;
  }

  /**
   * Request
   *
   * @param {Object} options
   */
  request(options = {}) {
    this.options = Object.assign({}, options, this.options);

    return Promise.resolve()
      .then(() => compose(this.middleware.concat(this.coreMiddleware))(this))
      .then(() => this.response);
  }
}

export default AxiosBaseRequest;
