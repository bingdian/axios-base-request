(function () {
  axiosBaseRequest.use(processHeader);
  axiosBaseRequest.use(processRequest);
  axiosBaseRequest.use(transformResponse);

  axiosBaseRequest.request({
    url: './data/users.json',
  }).then((response) => {
    console.log(response);
  }).catch((err) => {
    console.log(err);
  });
}());
