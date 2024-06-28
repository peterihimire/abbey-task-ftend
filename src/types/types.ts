export type Post = {
  id: number;
  profilePic: string;
  userId: number;
  desc: string;
  img?: string;
  name: string;
};

export type PostProps = {
  post: Post;
};

export type UserRegPayloadProps = {
  fullname: string;
  email: string;
  password: string;
};

export type UserPayloadProps = {
  email: string;
  password: string;
};

export type UserResponseProps = {
  acct_id: string;
  email: string;
};