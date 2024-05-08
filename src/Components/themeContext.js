import React, { useContext } from 'react';
import { createContext,useState } from 'react';

const ThemeContext=createContext();
function Theme({children})
{
    const[theme,setTheme]=useState('light');

    const darkTheme=()=>
    {
        setTheme('dark');
    }

    const lightTheme=()=>
    {
        setTheme('light');
    }

    return(

        <>
<ThemeContext.Provider value={{theme,setTheme}}>{children}</ThemeContext.Provider>

        </>
    )
}

export default Theme;


