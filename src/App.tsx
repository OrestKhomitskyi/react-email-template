import { useRef } from "react";
import "./App.css";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { saveAs } from "file-saver";

function App() {
  const emailEditorRef = useRef<EditorRef>(null);
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      const obj = { json: JSON.stringify(design), html };
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

  const handleSubmitImport = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      json: { value: string };
    };
    try {
      const obj = JSON.parse(JSON.parse(target.json.value));
      emailEditorRef.current?.editor?.loadDesign(obj);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
      <button onClick={exportHtml}>Export</button>
      <form onSubmit={handleSubmitImport}>
        <input type="text" name="json" placeholder="json" />
        <input type="submit" value="Import" />
      </form>
    </>
  );
}

export default App;
