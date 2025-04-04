
import { baseApi } from "@/redux/api/baseApi";
import { TLoginUser, TResponseRedux } from "@/types";



const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
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
                url: '/users/get-user',
                method: 'GET',
                params: params,
              };
            },
            providesTags: ['user'],
            transformResponse: (response: TResponseRedux<TLoginUser[]>) => {
              return {
                data: response?.data,
                meta: response?.meta,
              };
            },
          }),
          
        createUser: builder.mutation({
            query: (data) => ({
                url: '/users/create-user',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['user']
        }),
        updateUserRole: builder.mutation({
            query: (args) => ({
                url: `/auth/update-role/${args.id}`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags: ['user']
        }),
        
        updateUser: builder.mutation({
            query: (args) => ({
                url: `/users/update-user/${args.id}`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags: ['user']
        }),

        deleteUser: builder.mutation({
            query: (args) => ({
                url: `/users/delete-user/${args.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['user']
        }),
    })
})

export const { useGetAllUserQuery, useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation, useUpdateUserRoleMutation } = userManagementApi;