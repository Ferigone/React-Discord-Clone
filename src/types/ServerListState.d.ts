// Type for a user (owner, author)
interface User {
  id: string;
  username: string;
  status: string;
}

// Type for a message in a channel
interface Message {
  id: string;
  createdAt: string;
  author: User;
}

// Type for a channel in a server
interface Channel {
  id: string;
  name: string;
  messages: Message[];
}

// Type for a server
interface Server {
  id: string;
  name: string;
  owner: User;
  channels: Channel[];
  members: User[];
}

// The complete state type
type ServerListState = Server[];
