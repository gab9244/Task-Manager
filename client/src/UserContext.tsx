/* eslint-disable @typescript-eslint/no-explicit-any */

//O context do React nada mais é do que uma maneira de passar dados para todos os componentes que forem embrulhados pelo UserContextProvider, nesse caso queremos passar as state variables userInfo e setUserInfo
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

// Define the shape of your user info
type UserInfoType = {
  username: string;
  password: string;
} | null;

type TaskContentType = {
  title: string;
  content: string;
} | null;

// Define the shape of your user context
interface UserContextType {
  userInfo: UserInfoType;
  setUserInfo: Dispatch<SetStateAction<UserInfoType>>;
  
  taskContent: TaskContentType;
  setTaskContent: Dispatch<SetStateAction<TaskContentType>>

}
interface UserContextProviderProps {
    children: ReactNode;
  }

// Create the context with an initial empty object
export const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextProvider({children}: UserContextProviderProps) {
  const [userInfo,setUserInfo] = useState<UserInfoType>({ username: '', password: ''});
  const [taskContent, setTaskContent] = useState<TaskContentType>({ title: '', content: ''});
  return (
    <UserContext.Provider value={{userInfo, setUserInfo, taskContent,setTaskContent }}>
      {children}
    </UserContext.Provider>
  );
}
