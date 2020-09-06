import React from 'react'
const SourceContext = React.createContext({
    source: "abc-news",
    setSource: () => {}
});
export default SourceContext;