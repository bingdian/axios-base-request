(function () {
  function transformResponse(context, next) {
    log('transformResponse middleware start');
    return next()
      .then(() => {
        log('transformResponse middleware end');
        const { response } = context;
        const data = response && response.data;
        const status = response && response.status;

        response.data = {
          status,
          data,
        };
        return context;
      });
  }

  window.transformResponse = transformResponse;
}());
