export interface Message {
  type: 'sent' | 'received';
  msg: string;
  timestamp?: number;
  pinned?: boolean;
}
