import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";



const addedFavoriteManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAddedFavorite: builder.query({
            query: (email: string | undefined) => {
                const params = new URLSearchParams();
                if (email) {
                    params.append('email', email);
                }

                return {
                    url: '/addedFavorites',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['addedFavorite'],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                };
            }
        }),
        addToFavoriteProduct: builder.mutation({
            query: (data) => ({
                url: '/addedFavorites',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['addedFavorite']
        }),
        deleteAddToFavoriteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/addedFavorites/${id}`,
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: ['addedFavorite'],
        }),

    })
})

export const { useGetAddedFavoriteQuery, useAddToFavoriteProductMutation, useDeleteAddToFavoriteProductMutation } = addedFavoriteManagementApi;