import React from "react";
import "./editor.css";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

function Editor({
  shortCutListenerStart,
  shortCutListenerStop,
  placeholder,
  editorId,
  mode,
  value,
  onChange,
  theme,
}) {
  let themeE = theme || "monokai";

  return (
    <span onKeyDown={shortCutListenerStart} onKeyUp={shortCutListenerStop}>
      <AceEditor
        focus={true}
        placeholder={placeholder}
        className="editor-class"
        height={"90vh"}
        width={"100%"}
        fontSize={16}
        mode={mode}
        theme={themeE}
        value={value}
        onChange={(newCode) => onChange(newCode)}
        name={editorId}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        wrapEnabled={true}
      />
    </span>
  );
}

export default Editor;
