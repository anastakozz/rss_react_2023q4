import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mock/server';
import store from '@/api/store';
import { showsApi } from '@/api/api';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  // store.dispatch(showsApi.util.resetApiState());
});
afterAll(() => server.close());
