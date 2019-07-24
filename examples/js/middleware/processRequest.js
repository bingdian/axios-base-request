(function () {
  function processRequest(context, next) {
    log('processRequest middleware start');
    return next()
      .then(() => {
        log('processRequest middleware end');
        return context;
      });
  }

  window.processRequest = processRequest;
}());
