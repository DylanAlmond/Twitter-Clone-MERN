export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  _id: string,
  name: string,
  username: string,
  avatar: string,
}

export interface Post {
  _id: string,
  owner: User,
  content: string,
  createdAt: string,
  updatedAt: string
}