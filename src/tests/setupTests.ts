import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../mock/api/server';
import store from '../store';
import { showsApi } from '../store/api';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(showsApi.util.resetApiState());
});
afterAll(() => server.close());
