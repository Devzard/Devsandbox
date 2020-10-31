import React, { useState } from "react";
import "./sidemenu.css";
import { BiFullscreen } from "react-icons/bi";
import { MdSettings, MdFileDownload, MdHelp } from "react-icons/md";

import FLoatingPanel from "../FloatingPanel/FloatingPanel";
import FloatingPanel from "../FloatingPanel/FloatingPanel";

export default function SideMenu({
  clearAllPages,
  code,
  editorThemes,
  setTheme,
  docTitle,
  html,
  css,
  js,
}) {
  const [editorFullScreen, setEditorFullScreen] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  // toglle editor, preview css width
  const toggleEditorScreen = () => {
    let root = document.documentElement;
    if (!editorFullScreen) {
      root.style.setProperty("--editor-width", "0%");
      root.style.setProperty("--preview-width", "100%");
      root.style.setProperty("--home-screen-visibility", "hidden");
      setEditorFullScreen((prevState) => !prevState);
    } else {
      root.style.setProperty("--editor-width", "50%");
      root.style.setProperty("--preview-width", "50%");
      root.style.setProperty("--home-screen-visibility", "visible");
      setEditorFullScreen((prevState) => !prevState);
    }
  };

  // download
  const download = (filename, text) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", `${docTitle}.${filename}`);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <div className="sidemenu-container">
      {/* top icons */}
      <div className="sidemenu-top">
        {/* full screen toggler */}
        <div
          className="icon center tooltip"
          onClick={() => toggleEditorScreen()}
        >
          <BiFullscreen />
          <span className="tooltiptext">Toggle editor screen</span>
        </div>

        {/* download */}
        <div
          className="icon center tooltip"
          onClick={() => setShowDownload(true)}
        >
          <MdFileDownload />
          <span className="tooltiptext">
            <div className="tooltip-options">Download</div>
          </span>
        </div>
      </div>

      {/* bottom icons */}
      <div className="sidemenu-bottom">
        {/* settings */}
        <div className="icon center tooltip">
          <MdSettings />
          <span className="tooltiptext">
            <div
              className="tooltip-options"
              onClick={() => setShowThemes(true)}
            >
              Theme
            </div>
            <div className="tooltip-options" onClick={() => clearAllPages()}>
              Clear All
            </div>
          </span>
        </div>

        {/* help */}
        <div className="icon center tooltip">
          <MdHelp />
          <span className="tooltiptext">
            <div>&#183; Press Alt + T to change tab quickly</div>
            <div>The editor has to be on focus</div>
            <div>&#183; Click on the name to change it</div>
            <a
              href="https://www.linkedin.com/in/debashish-gogoi-drun/"
              target="_blank"
              rel="noreferrer"
              className="tooltip-options hover-item"
            >
              Provide Feedback
            </a>
          </span>
        </div>
      </div>

      {/* floating windows */}
      {showThemes && (
        <FLoatingPanel onClickOutside={() => setShowThemes(false)}>
          {editorThemes.map((item, index) => {
            return (
              <div
                key={index}
                className="list-options"
                onClick={() => setTheme(index)}
              >
                {`${item.toUpperCase()}`}
              </div>
            );
          })}
        </FLoatingPanel>
      )}

      {showDownload && (
        <FloatingPanel onClickOutside={() => setShowDownload(false)}>
          <div
            className="list-options"
            onClick={() => {
              download("devsandbox.html", code);
              setShowDownload(false);
            }}
          >
            Download in a signle html file
          </div>
          <div
            className="list-options"
            onClick={() =>
              download(
                "devsandbox.html",
                `<!DOCTYPE html><html lang="en"><head><title>${docTitle}</title></head><body>${html}</body></html>`
              )
            }
          >
            Download html only
          </div>
          <div
            className="list-options"
            onClick={() => download("devsandbox.css", css)}
          >
            Download css only
          </div>
          <div
            className="list-options"
            onClick={() => download("devsandbox.js", js)}
          >
            Download javascript only
          </div>
        </FloatingPanel>
      )}
    </div>
  );
}
