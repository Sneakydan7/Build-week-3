export interface Auth {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    lastName: string;
    biografia: string;
    image:string
  };
}
