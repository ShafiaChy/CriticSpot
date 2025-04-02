import { baseApi } from "@/redux/api/baseApi";
import { TProduct, TQueryParam, TResponseRedux } from "@/types";



const productManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (args) => {
                // Base URL
                let url = '/products/get-product';
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
            providesTags: ['product'],
            transformResponse: (response: TResponseRedux<TProduct[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
        }),
        


        // get single product
        getSingleProduct: builder.query({
            query: (args) => ({
                url: `/products/get-product/${args?.productId}`,
                method: "GET"
            }),
            providesTags: ['product'],
            transformResponse: (response: TResponseRedux<TProduct>) => {
                return {
                    data: response?.data,
                    meta: response?.meta
                }
            }
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: '/products/create-product',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['product']
        }),

        updateProduct: builder.mutation({
            query: (args) => ({
                url: `/products/update-product/${args.id}`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags: ['product']
        }),

        deleteProduct: builder.mutation({
            query: (args) => ({
                url: `/products/delete-product/${args.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['product']
        }),
    })
})

export const { useGetAllProductsQuery, useAddProductMutation, useUpdateProductMutation, useGetSingleProductQuery, useDeleteProductMutation } = productManagementApi;