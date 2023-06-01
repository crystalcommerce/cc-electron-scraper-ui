import React from "react";
// import ReactCodeEditor from 'react-textarea-code-editor-2';
import ReactCodeEditor from '@uiw/react-textarea-code-editor';


export default function CodeEditor({onChange, value, style, placeholder, disabled}) {

    placeholder = placeholder ? placeholder : "Please enter JS code.";

    return (
        <ReactCodeEditor
            value={value}
            language="js"
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            padding={15}
            style={{
                // ...style,
                // fontSize: 18,
                // backgroundColor: "#00000",
                // fontFamily: 'monospace',
            }}
        />
    )
    
}