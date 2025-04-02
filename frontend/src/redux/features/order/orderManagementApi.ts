import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";



const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ email, page, limit }) => {
        const params = new URLSearchParams();

        if (email) {
          params.append('email', email);
        }
        if (page) {
          params.append('page', page);
        }
        if (limit) {
          params.append('limit', limit);
        }

        return {
          url: '/orders/get-order',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['order'],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response?.data,
          meta: response?.meta
        };
      }
    }),


    createOrder: builder.mutation({
      query: (data) => (
        {
          url: '/orders/create-order',
          method: "POST",
          body: data
        }),
      invalidatesTags: ['order']
    }),
    updateOrderStatus: builder.mutation({
      query: ({ email, orderId, status }) => ({
        url: '/orders/update-OrderStatus',
        method: "PUT",
        body: { email, orderId, status }
      }),
      invalidatesTags: ['order']
    }),
    deleteOrder: builder.mutation({
      query: (args) => ({
        url: `/orders/delete-order/${args.id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['order']
    }),

  })
})

export const { useCreateOrderMutation, useGetOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } = orderManagementApi;