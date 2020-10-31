import { useEffect, useState, useRef } from "react";
import "./editorHeader.css";
import FloatingPanel from "../FloatingPanel/FloatingPanel";
import logo from "../icons/logo.png";

export default function EditorHeader({ docTitle, setDocTitle }) {
  const [titleEditToggle, setTitleEditToggle] = useState(false);
  const textInputRef = useRef();

  const handleKeyPress = (e) => {
    let codeEntered = typeof e.which == "number" ? e.which : e.keyCode;
    if (codeEntered === 13) setTitleEditToggle(false);
  };

  useEffect(() => {
    if (titleEditToggle) {
      textInputRef.current.focus();
      textInputRef.current.select();
    }
  }, [titleEditToggle]);

  return (
    <div className="editor-header-container">
      <a
        className="web-name"
        href="https://www.linkedin.com/in/debashish-gogoi-drun/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logo} className="logo" alt="oops" />
        Devsandbox /
      </a>
      <div className="document-title" onClick={() => setTitleEditToggle(true)}>
        {docTitle}
      </div>

      {/* FloatingPanel */}
      {titleEditToggle && (
        <FloatingPanel>
          <div className="name-container">
            <input
              ref={textInputRef}
              type="text"
              value={docTitle}
              className="text-input-name"
              onChange={(e) => setDocTitle(e.target.value)}
              maxLength="30"
              onKeyPress={handleKeyPress}
            />
            <button
              className="done-button"
              onClick={() => setTitleEditToggle(false)}
            >
              Done
            </button>
          </div>
        </FloatingPanel>
      )}
    </div>
  );
}
