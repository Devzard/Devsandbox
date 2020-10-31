import React from "react";
import "./floatingPanel.css";

export default function FloatingPanel({ onClickOutside, children }) {
  return (
    <>
      <div className="FP-shade" onClick={onClickOutside}></div>
      <div className="FP-container">{children}</div>
    </>
  );
}
