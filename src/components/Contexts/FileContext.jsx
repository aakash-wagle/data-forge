import React, { createContext } from 'react';
const FileContext = createContext(null);

export default (props) => {
    <FileContext.Provider value={null}>
        { props.children }
    </FileContext.Provider>
};    