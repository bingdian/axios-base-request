const users = [
  { name: 'bingdian' },
];

export default function axios(options) {
  const config = Object.assign({}, {
    headers: { Accept: 'application/json, text/plain, */*' },
    method: 'get',
  }, options);

  return new Promise((resolve) => {
    process.nextTick(() => {
      resolve(
        {
          data: users,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          request: {},
        },
      );
    });
  });
}
