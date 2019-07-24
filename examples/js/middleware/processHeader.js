(function () {
  function processHeader(context, next) {
    const { options } = context;
    options.headers = { 'x-sign': '123456' };
    log('processHeader middleware start');
    return next().then(() => {
      log('processHeader middleware end');
      return context;
    });
  }

  window.processHeader = processHeader;
}());
