import React, { createContext, useState } from "react";

interface User {
    mail: string | null;
    setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<User | null>(null);


const UserContextProvider = ({ children }: any) => {

    const [mail, setEmail] = useState<any>({ mail: null, setEmail: () => {} });


    return <UserContext.Provider value={{mail, setEmail}}>{children}</UserContext.Provider>
}

export default UserContextProvider;