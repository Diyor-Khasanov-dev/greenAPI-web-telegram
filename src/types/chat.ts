export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  customStatus?: string;
  phone?: string;
  username?: string;
  bio?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  };
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  user: User;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
  isPinned?: boolean;
  messages: Message[];
}
