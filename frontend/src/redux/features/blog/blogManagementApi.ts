
import { baseApi } from "@/redux/api/baseApi";
import { TBlog, TQueryParam, TResponseRedux } from "@/types";




const blogManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlog: builder.query({
            query: (args) => {
                // Build dynamic URL query parameters
                let url = '/blogs';
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
            providesTags: ['blog'],
            transformResponse: (response: TResponseRedux<TBlog[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
        }),


        // get single blog
        getSingleBlog: builder.query({
            query: (args) => ({
                url: `/blogs/${args?.id}`,
                method: "GET"
            }),
            providesTags: ['blog'],
            transformResponse: (response: TResponseRedux<TBlog>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                }
            }
        }),
        addBlog: builder.mutation({
            query: (data) => ({
                url: '/blogs',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['blog']
        }),

        updateBlog: builder.mutation({
            query: (args) => ({
                url: `/blogs/${args.id}`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags: ['blog']
        }),

        deleteBlog: builder.mutation({
            query: (args) => ({
                url: `/blogs/${args.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['blog']
        }),
    })
})

export const { useGetAllBlogQuery , useAddBlogMutation,useDeleteBlogMutation, useGetSingleBlogQuery, useUpdateBlogMutation } = blogManagementApi;