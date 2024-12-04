import { appendHistory } from "../../features/chats/chatHistorySlice";
import { addMessage, updateMessages } from "../../features/chats/chatSlice";

import { api } from "../api";

const chatApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (payload) => ({
        url: `chat/messages/${payload.chatId}`,
        method: "GET",
        params: {
          page: payload.page,
          limit: payload.limit,
        },
      }),
      providesTags: (result) =>
        result ? [{ type: "Chat", id: result.chatId }] : [{ type: "Chat" }],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.error) {
            console.log(result);
            return;
          }
          const msgs = result?.data?.[0]?.totalCount
            ? result?.data?.[0]?.data.map((message) => message.message).flat()
            : [];

          dispatch(
            updateMessages({
              messages: msgs,
              next: result?.data?.[0]?.nextPage,
              prev: result?.data?.[0]?.prevPage,
            })
          );
        } catch (_error) {
          console.error(_error);
        }
      },
    }),
    sendMessage: builder.mutation({
      query: (payload) => ({
        url: "chat/generate",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(addMessage({ role: "user", content: arg.message }));
          const result = await queryFulfilled;

          const resultMessage = result.data.response.choices[0].message;
          dispatch(
            addMessage({
              role: resultMessage.role,
              content: resultMessage.content,
            })
          );
          if (!arg.chatId) {
            dispatch(api.util.invalidateTags([{ type: "ChatHistory" }]));
          }
        } catch (_error) {
          console.error(_error);
        }
      },
    }),
    getChatHistory: builder.query({
      query: (payload) => ({
        url: "chat/history",
        method: "GET",
        params: {
          page: payload.page,
          limit: payload.limit,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            appendHistory({
              data: result.data?.[0].data,
              nextPage: result.data?.[0].nextPage,
              prevPage: result.data?.[0].prevPage,
            })
          );
        } catch (_error) {
          console.error(_error);
        }
      },
      providesTags: (result, _err, arg) =>
        result
          ? [{ type: "ChatHistory", id: arg.page }]
          : [{ type: "ChatHistory" }],
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `chat/message/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ChatHistory" }],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetChatHistoryQuery,
  useDeleteChatMutation,
} = chatApiSlice;
