/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Swagger Petstore - OpenAPI 3.0
 * This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about
Swagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!
You can now help us improve the API whether it's by making changes to the definition itself or to the code.
That way, with time, we can improve the API in general, and expose some of the new features in OAS3.

Some useful links:
- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)
 * OpenAPI spec version: 1.0.19
 */
import { customHttpClient } from '.././http-client';
import type { GetInventory200, Order } from '.././models';

/**
 * Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 */
export type getInventoryResponse = {
  data: GetInventory200;
  status: number;
  headers: Headers;
};

export const getGetInventoryUrl = () => {
  return `/store/inventory`;
};

export const getInventory = async (
  options?: RequestInit,
): Promise<getInventoryResponse> => {
  return customHttpClient<getInventoryResponse>(getGetInventoryUrl(), {
    ...options,
    method: 'GET',
  });
};

/**
 * Place a new order in the store
 * @summary Place an order for a pet
 */
export type placeOrderResponse = {
  data: Order | null;
  status: number;
  headers: Headers;
};

export const getPlaceOrderUrl = () => {
  return `/store/order`;
};

export const placeOrder = async (
  order: Order,
  options?: RequestInit,
): Promise<placeOrderResponse> => {
  return customHttpClient<placeOrderResponse>(getPlaceOrderUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(order),
  });
};

/**
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 * @summary Find purchase order by ID
 */
export type getOrderByIdResponse = {
  data: Order | null;
  status: number;
  headers: Headers;
};

export const getGetOrderByIdUrl = (orderId: number) => {
  return `/store/order/${orderId}`;
};

export const getOrderById = async (
  orderId: number,
  options?: RequestInit,
): Promise<getOrderByIdResponse> => {
  return customHttpClient<getOrderByIdResponse>(getGetOrderByIdUrl(orderId), {
    ...options,
    method: 'GET',
  });
};

/**
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 * @summary Delete purchase order by ID
 */
export type deleteOrderResponse = {
  data: null;
  status: number;
  headers: Headers;
};

export const getDeleteOrderUrl = (orderId: number) => {
  return `/store/order/${orderId}`;
};

export const deleteOrder = async (
  orderId: number,
  options?: RequestInit,
): Promise<deleteOrderResponse> => {
  return customHttpClient<deleteOrderResponse>(getDeleteOrderUrl(orderId), {
    ...options,
    method: 'DELETE',
  });
};
