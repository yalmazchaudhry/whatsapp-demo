export interface Message {
  id: number;
  type: 'sent' | 'received';
  parts: MessageParts[];
  timestamp?: number;
  pinned?: boolean;
  rating?: number;
}

interface MessageParts {
  id: number;
  text?: string;
  link?: string;
  btn?: Button;
  style?: Style;
  type: string;
  showOnRating?: boolean;
  hideOnRating?: boolean;
}

interface Style {
  [key: string]: string;
}

interface Button {
  text: string;
  link?: Link;
  style?: Style;
}

interface Link {
  style?: Style;
  link: string;
}
