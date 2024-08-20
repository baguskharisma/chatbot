import React, { useEffect, FC } from "react";
import "prismjs/themes/prism-okaidia.css";
import { Copy } from "lucide-react";

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ language = "plaintext", code }) => {
  useEffect(() => {
    const Prism = require("prismjs");
    const loadLanguage = async () => {
      if (language === "jsx") {
        await require("prismjs/components/prism-jsx");
      } else if (language === "typescript") {
        await require("prismjs/components/prism-typescript");
      } else if (language === "python") {
        await require("prismjs/components/prism-python");
      } else if (language === "sql") {
        await require("prismjs/components/prism-sql");
      } else if (language === "bash") {
        await require("prismjs/components/prism-bash");
      } else if (language === "shell-session") {
        await require("prismjs/components/prism-shell-session");
      } else if (language === "yaml") {
        await require("prismjs/components/prism-yaml");
      } else if (language === "json") {
        await require("prismjs/components/prism-json");
      } else if (language === "markdown") {
        await require("prismjs/components/prism-markdown");
      }

      Prism.highlightAll();
    };

    loadLanguage();
  }, [code, language]);

  return (
    <>
      <div className="mt-2 md:mt-5">
        <pre className="relative rounded-md">
          <code className={`language-${language}`}>{code}</code>
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="absolute top-4 right-4"
          >
            <Copy className="w-5 h-5 hover:stroke-white/50 duration-300" />
          </button>
        </pre>
      </div>
    </>
  );
};

export default CodeBlock;
