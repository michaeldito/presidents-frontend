import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('React Redux', () => {

  let store;
  let httpMock;

  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('stubby', async () => {
    
    httpMock.onGet('localhost:3000').reply(200, {
      status: 'success',
    });
    
  });
  
});