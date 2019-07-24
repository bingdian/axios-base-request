(function () {
  axiosRequest.use(processHeader);
  axiosRequest.use(processRequest);
  axiosRequest.use(transformResponse);

  axiosRequest.request({
    url: './data/users.json',
  }).then((response) => {
    console.log(response);
  }).catch((err) => {
    console.log(err);
  });
}());
