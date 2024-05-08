import { createContext, useState } from "react";
import movieData from "../movieData";
const UserContext = createContext();
function MovieContext({ children }) {
  const [data, setData] = useState(movieData);
  const updateData = (rows) => {
    setData([...rows]);
  };

  return (
    <>
      <UserContext.Provider value={{ data, setData: updateData }}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export { UserContext, MovieContext };
