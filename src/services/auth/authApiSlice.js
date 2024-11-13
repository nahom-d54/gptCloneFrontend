import { setCredentials } from "../../features/auth/authSlice";
import { api } from "../api";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "user/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { token, ...user } = result;
          dispatch(
            setCredentials({
              user: user,
              token: token,
            })
          );
        } catch (_error) {
          console.error(_error);

          dispatch(
            setCredentials({
              user: null,
              token: null,
            })
          );
        }
      },
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "user/register",
        method: "POST",
        body: payload,
      }),
    }),

    resendVerificationEmail: builder.mutation({
      query: (payload) => ({
        url: "user/resend-verification-email",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResendVerificationEmailMutation,
} = authApiSlice;
