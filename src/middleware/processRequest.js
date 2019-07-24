export default function processRequest(context) {
  return axios(context.options)
    .then((response) => {
      Object.assign(context, {
        response,
      });
      return context;
    });
}
