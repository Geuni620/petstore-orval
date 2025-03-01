import { getInventory } from 'src/api/store/store';
import { getGetInventoryMockHandler } from 'src/api/store/store.msw';
import { server } from 'src/mocks/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getInventory API', () => {
  it('fetches inventory data successfully', async () => {
    const expectedData = {
      approved: 57,
      placed: 2,
      delivered: 50,
    };

    server.use(getGetInventoryMockHandler());
    const response = await getInventory();
    console.log('response', response);

    expect(response).toBeDefined();
    expect(response).toEqual(expectedData);
  });
});
