import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/components/prism-python";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";
import React from "react";

// Optional Error Boundary for safer markdown rendering
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-red-500">❌ Error rendering review</p>;
    }
    return this.props.children;
  }
}

function App() {
  const [code, setCode] = useState(`def sum(a, b):\n  return a + b`);
  const [review, setReview] = useState("");

  async function reviewCode() {
    try {
      const response = await axios.post("/api/ai/get-review", { code });


      const data = response.data;
      const reviewText =
        typeof data === "string" ? data : data?.result || JSON.stringify(data);

      setReview(reviewText);
    } catch (err) {
      setReview("❌ Error reaching AI reviewer.");
      console.error(err);
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCode(e.target.result);
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6">
      <header className="w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-lg">
        AI Code Reviewer 🤖
      </header>

      <div className="flex flex-row gap-6 w-full max-w-6xl">
        {/* Left: Code Editor */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <input
            type="file"
            accept=".js,.py,.css,.cpp,.cs,.ts,.html,.json,.java"
            onChange={handleFileUpload}
            className="mb-4 text-sm text-gray-400 cursor-pointer bg-gray-700 p-2 rounded-lg"
          />

          <div className="border border-gray-600 rounded-lg p-4 bg-gray-900">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.python, "python")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "300px",
              }}
            />
          </div>

          <button
            onClick={reviewCode}
            className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            Review Code 🤖
          </button>
        </div>

        {/* Right: Review Output */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <ErrorBoundary>
            {review ? (
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold mb-2">{children}</h2>,
                  p: ({ children }) => <p className="mb-2 text-gray-300">{children}</p>,
                  code: ({ node, inline, className, children, ...props }) =>
                    inline ? (
                      <code className="bg-gray-700 text-pink-400 px-1 rounded" {...props}>
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm" {...props}>
                        <code>{children}</code>
                      </pre>
                    ),
                  ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                  li: ({ children }) => <li className="text-gray-300">{children}</li>,
                }}
              >
                {review}
              </Markdown>
            ) : (
              <p className="text-gray-500">📝 Your AI review will show up here.</p>
            )}
          </ErrorBoundary>
        </div>
      </div>


      {/* Footer */}
      <footer className="mt-auto w-full text-center py-4 text-sm text-gray-500 border-t border-gray-700">
        Built with by Sri
      </footer>
    </div>

  );
}

export default App;
