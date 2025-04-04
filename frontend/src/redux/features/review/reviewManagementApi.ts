

import { baseApi } from "@/redux/api/baseApi";
import {TReview, TQueryParam, TResponseRedux } from "@/types";



const reviewManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReviews:builder.query({
            query: (args) => {
                // Base URL
                let url = '/reviews/get-review';
                console.log(url);
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        if (item.value) {
                            params.append(item.name, item.value as string);
                        }
                    });
                }
                
                url += `?${params.toString()}`;
                
                console.log(params);
                console.log('args =>', args);
                return {
                    url: url,
                    method: "GET",
                };
            },
            providesTags: ['review'],
            transformResponse: (response: TResponseRedux<TReview[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
        }),

    

        // get single product
        getSingleReview: builder.query({
            query: (args) => ({
                url: `/reviews/get-review/${args?.productId}`,
                method: "GET"
            }),
            providesTags: ['review'],
            transformResponse: (response: TResponseRedux<TReview>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                }
            }
        }),
        addReview: builder.mutation({
            query: (data) => ({
                url: '/review/create-review',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['review']
        }),

        updateReview: builder.mutation({
            query: (args) => ({
                url: `/products/update-review/${args.id}`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags: ['review']
        }),

        deleteReview: builder.mutation({
            query: (args) => ({
                url: `/products/delete-review/${args.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['review']
        }),
    })
})

export const { useGetAllReviewsQuery, useAddReviewMutation, useUpdateReviewMutation, useGetSingleReviewQuery, useDeleteReviewMutation } = reviewManagementApi;