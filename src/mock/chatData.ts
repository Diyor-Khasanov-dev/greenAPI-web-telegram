import type { Chat, User } from '../types/chat';

export const currentUser: User = {
  id: 'me',
  name: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  status: 'online',
  username: '@alex_rivera',
  phone: '+1 (555) 019-2834',
  bio: 'Minimalist designer & frontend enthusiast. Crafting clean interfaces.'
};

export const initialChats: Chat[] = [
  {
    id: 'chat-1',
    type: 'direct',
    user: {
      id: 'user-1',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      status: 'online',
      username: '@elena_rostova',
      phone: '+1 (555) 234-5678',
      bio: 'UI/UX Designer | Architecture lover'
    },
    lastMessage: 'The new minimalist design system looks super crisp!',
    lastMessageTimestamp: '10:42 AM',
    unreadCount: 2,
    isPinned: true,
    messages: [
      {
        id: 'm1',
        senderId: 'user-1',
        text: 'Hey Alex! Did you get a chance to check the updated color tokens?',
        timestamp: '10:38 AM',
        status: 'read'
      },
      {
        id: 'm2',
        senderId: 'me',
        text: 'Yes! Loved how clean the interface feels with the custom accent color.',
        timestamp: '10:40 AM',
        status: 'read'
      },
      {
        id: 'm3',
        senderId: 'user-1',
        text: 'The new minimalist design system looks super crisp!',
        timestamp: '10:42 AM',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat-2',
    type: 'direct',
    user: {
      id: 'user-2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'offline',
      username: '@marcus_chen',
      phone: '+1 (555) 876-5432',
      bio: 'Software Architect & Open Source advocate'
    },
    lastMessage: 'Let us sync up on the deployment tomorrow.',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0,
    isPinned: true,
    messages: [
      {
        id: 'm4',
        senderId: 'me',
        text: 'Hi Marcus, build pipeline is optimized and ready.',
        timestamp: 'Yesterday 4:15 PM',
        status: 'read'
      },
      {
        id: 'm5',
        senderId: 'user-2',
        text: 'Awesome work. Let us sync up on the deployment tomorrow.',
        timestamp: 'Yesterday 4:20 PM',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat-3',
    type: 'group',
    user: {
      id: 'user-3',
      name: 'Design Systems Team',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
      status: 'online',
      bio: 'Official channel for UI template guidelines and feedback.'
    },
    lastMessage: 'Sophia: Added the minimalist color presets!',
    lastMessageTimestamp: 'May 12',
    unreadCount: 0,
    isPinned: false,
    messages: [
      {
        id: 'm6',
        senderId: 'user-3',
        text: 'Sophia: Added the minimalist color presets!',
        timestamp: 'May 12 2:00 PM',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat-4',
    type: 'direct',
    user: {
      id: 'user-4',
      name: 'Sophia Laurent',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      status: 'away',
      username: '@sophia_l',
      phone: '+1 (555) 432-1098',
      bio: 'Creative Lead @ Agency'
    },
    lastMessage: 'Can you share the Vite preview link?',
    lastMessageTimestamp: 'May 10',
    unreadCount: 0,
    isPinned: false,
    messages: [
      {
        id: 'm7',
        senderId: 'user-4',
        text: 'Can you share the Vite preview link?',
        timestamp: 'May 10 11:15 AM',
        status: 'read'
      }
    ]
  }
];
