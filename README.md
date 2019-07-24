# axiosRequest

http request library based axios for the browser.

## Installing

	<script src="axios.min.js"></script>
	<script src="axios.request.js"></script>
	
## API

### axiosRequest.use(fn)

Use middleware function

### axiosRequest.request(config)

Send http request.
    
The `config` param is same as `axios` [https://github.com/axios/axios#request-config](https://github.com/axios/axios#request-config)

## Example

	// process request data
	function signMiddleware(context, next) {
      const { options } = context;
      options.headers   = { 'x-sign': '123456' };
      return next();
    }
    
    // process response data
    function transfromResponseMiddleware(context, next) {
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
	axiosRequest.use(signMiddleware);
	axiosRequest.use(transfromResponseMiddleware);
	
	// request
	axiosRequest.request({
	  url: '/api/users',
	  method: 'get'
	}).then((response) => {
	  console.log(response)
	}).catch((error) => {
	 console.log(error);
	})

## License

MIT
