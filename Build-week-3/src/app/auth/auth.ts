export interface Auth {
  accessToken: string;
  user: {
    userId: number;
    email: string;
    name: string;
    lastName: string;
    biografia: string;
    image:string
  };
}
