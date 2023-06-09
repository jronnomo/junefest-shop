import { PRODUCTS_URL } from '../constants';
//use apiSlice because we're dealing with endpoints that are dealing with async requests
import { apiSlice } from './apiSlice';

//injects endpoints into the main apiSlice
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
