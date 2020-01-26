import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default ({ children }) => (
  <SyntaxHighlighter language='javascript' style={docco}>
    {JSON.stringify(children)}
  </SyntaxHighlighter>
);
