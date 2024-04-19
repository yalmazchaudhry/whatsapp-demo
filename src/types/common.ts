export interface Message {
  type: 'sent' | 'received';
  parts: MessageParts[];
  timestamp?: number;
  pinned?: boolean;
}

interface MessageParts {
  text?: string;
  link?: string;
  btn?: Button;
  style?: Style;
  type: string;
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
