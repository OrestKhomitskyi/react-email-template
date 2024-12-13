import { useRef, useState } from "react";
import "./App.css";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { saveAs } from "file-saver";

function App() {
  const emailEditorRef = useRef<EditorRef>(null);
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      // console.log("exportHtml", html);
      // console.log("∂esign", design);
      const obj = { json: design, html };
      const blob = new Blob([JSON.stringify(obj)], {
        type: "application/json",
      });
      saveAs(blob, "design.json");
    });
  };

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  };
  return (
    <>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
      <button onClick={exportHtml}>Export</button>
    </>
  );
}

export default App;
