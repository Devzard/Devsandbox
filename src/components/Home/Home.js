import React, { useState, useEffect } from "react";
import "./home.css";
import Editor from "../Editor/Editor";
import SideMenu from "../SideMenu/SideMenu";
import useLocalStorage from "../../hooks/useLocalStorage";
import EditorHeader from "../EditorHeader/EditorHeader";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Home() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [docTitle, setDocTitle] = useLocalStorage("docTitle", "unnamed");

  const [code, setCode] = useState("");
  const editorThemes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized_dark",
    "solarized_dark",
    "terminal",
  ];
  const [theme, setTheme] = useLocalStorage("theme", 0);
  const [tabIndexState, setTabIndexState] = useState(0);

  // clear all state
  const clearAllPages = () => {
    setHtml("");
    setCss("");
    setJs("");
  };

  //short cuts
  let command = { altPressed: false };
  const shortCutListenerStart = (e) => {
    let codeEntered = typeof e.which == "number" ? e.which : e.keyCode;
    if (codeEntered === 18) command.altPressed = true; // alt key = 18
    if (codeEntered === 84 && command.altPressed) {
      let newTab = (tabIndexState + 1) % 3;
      setTabIndexState(newTab);
    }
  };
  const shortCutListenerStop = (e) => {
    let codeEntered = typeof e.which == "number" ? e.which : e.keyCode;
    if (codeEntered === 18) command.altPressed = false;
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCode(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${docTitle}</title>
</head>
<style>
${css}
</style>
<body>
${html}
</body>
<script>
${js}
</script>
</html>
    `);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [html, css, js, docTitle]);

  return (
    <div className="home-container">
      <div className="home-menu-bar">
        <SideMenu
          clearAllPages={clearAllPages}
          editorThemes={editorThemes}
          setTheme={setTheme}
          code={code}
          html={html}
          css={css}
          js={js}
          docTitle={docTitle}
        />
      </div>
      <div className="home-editor-container">
        <Tabs
          className="home-tabs"
          defaultFocus={true}
          selectedIndex={tabIndexState}
          onSelect={(tabIndex) => setTabIndexState(tabIndex)}
        >
          <EditorHeader docTitle={docTitle} setDocTitle={setDocTitle} />
          <TabList>
            <Tab selectedClassName="home-active-tab">HTML</Tab>
            <Tab selectedClassName="home-active-tab">CSS</Tab>
            <Tab selectedClassName="home-active-tab">JS</Tab>
          </TabList>

          <TabPanel>
            <Editor
              placeholder="HTML goes here"
              editorId="editor-html-1"
              mode="xml"
              value={html}
              onChange={setHtml}
              theme={editorThemes[theme]}
              shortCutListenerStart={shortCutListenerStart}
              shortCutListenerStop={shortCutListenerStop}
            />
          </TabPanel>
          <TabPanel>
            <Editor
              placeholder="CSS goes here"
              editorId="editor-css-1"
              mode="css"
              value={css}
              onChange={setCss}
              theme={editorThemes[theme]}
              shortCutListenerStart={shortCutListenerStart}
              shortCutListenerStop={shortCutListenerStop}
            />
          </TabPanel>
          <TabPanel>
            <Editor
              placeholder="Javascript goes here"
              editorId="editor-js-1"
              mode="javascript"
              value={js}
              onChange={setJs}
              theme={editorThemes[theme]}
              shortCutListenerStart={shortCutListenerStart}
              shortCutListenerStop={shortCutListenerStop}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="home-preview">
        <iframe
          srcDoc={code}
          title="output"
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
