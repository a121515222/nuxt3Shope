import type { Pagination } from "@/types/paginationTypes";
export interface ConversationType {
  _id: string;
  userId: string;
  participantId: string;
  participantName: string;
  chatId: string;
  lastMessageTime: string;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}
export interface ConversationResponseType {
  status: boolean;
  message: string;
  data: {
    conversations: ConversationType[];
    pagination: Pagination;
  };
}
export interface ChatIdUsersDataMapType {
  // chatId: { participantId, participantName, isParticipantOnline:false }
  [key: string]: {
    participantId: string;
    participantName: string;
    isParticipantOnline: boolean;
    unreadCount: number;
    lastMessageTime: string;
  };
}