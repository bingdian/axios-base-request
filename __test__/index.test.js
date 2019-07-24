import AxiosRequest from '../src/core';
import axiosRequest from '../src/index';

let axiosRequestInstance;

beforeEach(() => {
  axiosRequestInstance = new AxiosRequest();
});

afterEach(() => {
  axiosRequestInstance = null;
});

describe('axiosRequest', () => {
  it('should axiosReques instanceof AxiosRequest', () => {
    expect(axiosRequest instanceof AxiosRequest).toBe(true);
  });
});

describe('AxiosRequest.use', () => {
  it('should return AxiosRequest instance when argument is function', () => {
    const mockFn = jest.fn();
    expect(axiosRequestInstance.use(mockFn)).toBe(axiosRequestInstance);
  });

  it('should throw error when argument is not function ', () => {
    expect(() => {
      axiosRequestInstance.use();
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosRequestInstance.use('string');
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosRequestInstance.use(100);
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosRequestInstance.use({});
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosRequestInstance.use([]);
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosRequestInstance.use(null);
    }).toThrowError('Middleware must be composed of functions!');
  });

  it('should push function argument to middleware', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const mockFn3 = jest.fn();

    axiosRequestInstance.use(mockFn1);
    axiosRequestInstance.use(mockFn2);
    axiosRequestInstance.use(mockFn3);

    expect(axiosRequestInstance.middleware.length).toEqual(3);
    expect(axiosRequestInstance.middleware[0]).toEqual(mockFn1);
    expect(axiosRequestInstance.middleware[1]).toEqual(mockFn2);
    expect(axiosRequestInstance.middleware[2]).toEqual(mockFn3);
  });
});

describe('AxiosRequest.request', () => {
  it('should process middleware function ', (done) => {
    const order = [];

    function signMiddleware(context, next) {
      const { options } = context;
      options.headers   = { 'x-sign': '123456' };
      order.push('preSignMiddleware');
      return next().then(() => {
        order.push('postSignMiddleware');
        return context;
      });
    }

    function transfromResponseMiddleware(context, next) {
      order.push('preTransfromResponse');
      return next()
        .then(() => {
          const { response } = context;
          const data         = response && response.data;
          const status       = response && response.status;
          response.data      = {
            status,
            data,
          };
          order.push('postTransfromResponse');
          return context;
        });
    }

    axiosRequestInstance.use(signMiddleware);
    axiosRequestInstance.use(transfromResponseMiddleware);
    axiosRequestInstance.request({
      url: '/api/user',
    }).then((response) => {
      expect(response.config.headers['x-sign']).toEqual('123456');
      expect(response.data).toEqual({
        status: 200,
        data: [
          { name: 'bingdian' },
        ],
      });
      expect(order).toEqual(
        [
          'preSignMiddleware',
          'preTransfromResponse',
          'postTransfromResponse',
          'postSignMiddleware',
        ],
      );
      done();
    })
      .catch(err => expect(err).toMatch('error'));
  });
});
