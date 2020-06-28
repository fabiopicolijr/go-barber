import { createContext } from 'react';

interface AuthContexData {
  name: string;
}

const AuthContex = createContext<AuthContexData>({} as AuthContexData);

export default AuthContex;
