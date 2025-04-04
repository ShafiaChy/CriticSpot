

import { baseApi } from "@/redux/api/baseApi";
import { TCategory, TQueryParam, TResponseRedux } from "@/types";




const categoryManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: (args) => {
                // Build dynamic URL query parameters
                let url = '/categories';
                if (args) {
                    const params = new URLSearchParams();
                    args.forEach((item: TQueryParam) => {
                        if (item.value) {
                            params.append(item.name, item.value as string);
                        }
                    });
                    url += `?${params.toString()}`;
                }
                return {
                    url: url,
                    method: "GET",
                };
            },
            providesTags: ['category'],
            transformResponse: (response: TResponseRedux<TCategory[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
        }),


        // get single category
        getSingleCategory: builder.query({
            query: (args) => ({
                url: `/categories/${args?.id}`,
                method: "GET"
            }),
            providesTags: ['category'],
            transformResponse: (response: TResponseRedux<TCategory>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                }
            }
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: '/categories',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['category']
        }),

        updateCategory: builder.mutation({
            query: (args) => ({
                url: `/categories/${args.id}`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags: ['category']
        }),

        deleteCategory: builder.mutation({
            query: (args) => ({
                url: `/categories/${args.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['category']
        }),
    })
})

export const { useGetAllCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation, useGetSingleCategoryQuery, useUpdateCategoryMutation } = categoryManagementApi;