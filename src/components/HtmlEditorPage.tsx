import React, { useState, ChangeEvent } from "react";

const HtmlEditorPage: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("<p>Hello, World!</p>");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value);
  };

  return (
    <div style={{ display: "flex", height: "100vh", gap: "20px", padding: "20px" }}>
      {/* Editor */}
      <div style={{ flex: 1 }}>
        <h2>HTML Editor</h2>
        <textarea
          style={{ width: "100%", height: "90%", fontFamily: "monospace", fontSize: "16px" }}
          value={htmlContent}
          onChange={handleChange}
        />
      </div>

      {/* Preview */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <h2>Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

export default HtmlEditorPage;
