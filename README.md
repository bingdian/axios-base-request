# axiosBaseRequest


[![NPM version][npm-image]][npm-url]
[![Continuous Integration][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]


[npm-image]: https://img.shields.io/npm/v/axios-base-request.svg?style=flat-square
[npm-url]: https://npmjs.org/package/axios-base-request
[ci-image]: https://github.com/bingdian/axios-base-request/workflows/CI/badge.svg?branch=master&event=push
[ci-url]: https://github.com/bingdian/axios-base-request/actions?query=branch%3Amaster
[codecov-image]: https://img.shields.io/codecov/c/github/bingdian/axios-base-request.svg?style=flat-square
[codecov-url]: https://codecov.io/github/bingdian/axios-base-request?branch=master
[download-image]: https://img.shields.io/npm/dm/axios-base-request.svg?style=flat-square
[download-url]: https://npmjs.org/package/axios-base-request

http request library based axios for the browser.

## Installing

### Using npm:

```
npm install axios-base-request --save
```

### Using yarn:

```
yarn add axios-base-request 
```

## Usage

Once the package is installed, you can `import` the library using import:

    import axiosBaseRequest from 'axios-base-request';

or you can use script tag:

    <script src="axios.base.request.js"></script>

## API

### axiosBaseRequest.use(fn)

Use middleware function

### axiosBaseRequest.request(config)

Send http request.

The `config` param is same
as `axios` [https://github.com/axios/axios#request-config](https://github.com/axios/axios#request-config)

## Example

	// process request data
	function signMiddleware(context, next) {
      const { options } = context;
      options.headers   = { 'x-sign': '123456' };
      return next();
    }
    
    // process response data
    function transformResponseMiddleware(context, next) {
      return next()
        .then(() => {
          const { response } = context;
          const data         = response && response.data;
          const status       = response && response.status;
          response.data      = {
            status,
            data,
          };
          return context;
        });
    }

	// use middleware
	axiosBaseRequest.use(signMiddleware);
	axiosBaseRequest.use(transformResponseMiddleware);
	
	// request
	axiosBaseRequest.request({
	  url: '/api/users',
	  method: 'get'
	}).then((response) => {
	  console.log(response)
	}).catch((error) => {
	 console.log(error);
	})

## License

MIT
