/**
 * Compose `middleware` returning
 * fork form `https://github.com/koajs/compose/blob/4.1.0/index.js`
 *
 * @param {Array} middleware
 * @return {Function}
 */
function compose(middleware) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!');
  }

  middleware.forEach((fn) => {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  });

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */
  return function (context, next) { /* eslint func-names: off */
    // last called middleware #
    let index = -1;

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) {
        fn = next;
      }
      if (!fn) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}

export default compose;
