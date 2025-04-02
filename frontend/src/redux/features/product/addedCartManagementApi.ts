import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";



const addedCartManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAddedCart: builder.query({
            query: (email: string | undefined) => {
              const params = new URLSearchParams();
              if (email) {
                params.append('email', email);
              }
      
              return {
                url: '/addedCarts/get-addedCart',
                method: 'GET',
                params: params,
              };
            },
            providesTags: ['addedCart'],
            transformResponse: (response: TResponseRedux<any>) => {
              return {
                data: response?.data,
                meta: response?.meta
              };
            }
          }),
        addToCartProduct: builder.mutation({
            query: (data) => ({
                url: '/addedCarts/add-cart',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['addedCart']
        }),

        updateCartQuantity: builder.mutation({
          query: ({ email, productId, change }) => ({
              url: `/addedCarts/update-quantity`,
              method: "PATCH",
              body: { email, productId, change },
          }),
          invalidatesTags: ['addedCart']
      }),
        deleteAddToCartProduct: builder.mutation({
            query: ({ email, productId }) => ({
                url: `/addedCarts/delete-addedCart?email=${email}`,
                method: "DELETE",
                body: {
                    productId,
                }
            }),
            invalidatesTags: ['addedCart'],
        }),
        
    })
})

export const { useGetAddedCartQuery ,useAddToCartProductMutation , useDeleteAddToCartProductMutation , useUpdateCartQuantityMutation} = addedCartManagementApi;