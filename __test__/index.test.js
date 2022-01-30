import AxiosBaseRequest from '../src/core';
import axiosBaseRequest from '../src/index';

let axiosBaseRequestInstance;

beforeEach(() => {
  axiosBaseRequestInstance = new AxiosBaseRequest();
});

afterEach(() => {
  axiosBaseRequestInstance = null;
});

describe('axiosBaseRequest', () => {
  it('should axiosReques instanceof AxiosBaseRequest', () => {
    expect(axiosBaseRequest instanceof AxiosBaseRequest).toBe(true);
  });
});

describe('AxiosBaseRequest.use', () => {
  it('should return AxiosBaseRequest instance when argument is function', () => {
    const mockFn = jest.fn();
    expect(axiosBaseRequestInstance.use(mockFn)).toBe(axiosBaseRequestInstance);
  });

  it('should throw error when argument is not function ', () => {
    expect(() => {
      axiosBaseRequestInstance.use();
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosBaseRequestInstance.use('string');
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosBaseRequestInstance.use(100);
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosBaseRequestInstance.use({});
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosBaseRequestInstance.use([]);
    }).toThrowError('Middleware must be composed of functions!');

    expect(() => {
      axiosBaseRequestInstance.use(null);
    }).toThrowError('Middleware must be composed of functions!');
  });

  it('should push function argument to middleware', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const mockFn3 = jest.fn();

    axiosBaseRequestInstance.use(mockFn1);
    axiosBaseRequestInstance.use(mockFn2);
    axiosBaseRequestInstance.use(mockFn3);

    expect(axiosBaseRequestInstance.middleware.length).toEqual(3);
    expect(axiosBaseRequestInstance.middleware[0]).toEqual(mockFn1);
    expect(axiosBaseRequestInstance.middleware[1]).toEqual(mockFn2);
    expect(axiosBaseRequestInstance.middleware[2]).toEqual(mockFn3);
  });
});

describe('AxiosBaseRequest.request', () => {
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

    function transformResponseMiddleware(context, next) {
      order.push('preTransformResponse');
      return next()
        .then(() => {
          const { response } = context;
          const data         = response && response.data;
          const status       = response && response.status;
          response.data      = {
            status,
            data,
          };
          order.push('postTransformResponse');
          return context;
        });
    }

    axiosBaseRequestInstance.use(signMiddleware);
    axiosBaseRequestInstance.use(transformResponseMiddleware);
    axiosBaseRequestInstance.request({
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
          'preTransformResponse',
          'postTransformResponse',
          'postSignMiddleware',
        ],
      );
      done();
    })
      .catch(err => expect(err).toMatch('error'));
  });
});
