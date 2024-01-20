// userApi.js
import { apiSlice } from "./apiSlice";

const USER_URL = "/api/v1/users";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (newUser) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: newUser,
      }),
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: build.mutation({
      query: (updatedUser) => ({
        url: `${USER_URL}/update`,
        method: "PUT",
        body: updatedUser,
      }),
    }),
    deleteUser: build.mutation({
      query: () => ({
        url: `${USER_URL}/delete`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
