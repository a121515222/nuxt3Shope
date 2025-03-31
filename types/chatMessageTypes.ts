export interface ChatMessageType {
  senderId: string;
  receiverId: string;
  receiverName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  _id: string;
}
export  interface ChatMessageResponseType {
  status: boolean;
  message: string;
  data: {
    latestMessages: ChatMessageType[];
    messageTimestamp: string;
  };
}