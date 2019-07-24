// https://medium.com/@justintulk/how-to-mock-an-external-library-in-jest-140ac7b210c2
import axios from 'axios';

global.axios = axios;
