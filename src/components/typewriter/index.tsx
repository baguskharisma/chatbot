import React, { useEffect, useState } from "react";
import CodeBlock from "../chat/codeblock";

interface Segment {
  type: "code" | "text";
  content: string;
  language?: string;
}

interface TypewriterProps {
  segments: Segment[];
}

const Typewriter: React.FC<TypewriterProps> = ({ segments }) => {
  const [displayedSegments, setDisplayedSegments] = useState<Segment[]>([]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentSegmentIndex < segments.length) {
      const segment = segments[currentSegmentIndex];
      if (currentIndex < segment.content.length) {
        const timeoutId = setTimeout(
          () => {
            setCurrentText((prev) => prev + segment.content[currentIndex]);
            setCurrentIndex(currentIndex + 1);
          },
          segment.content[currentIndex] === " " ? 5 : 5
        );

        return () => clearTimeout(timeoutId);
      } else {
        setDisplayedSegments((prev) => [
          ...prev,
          { ...segment, content: currentText },
        ]);
        setCurrentText("");
        setCurrentIndex(0);
        setCurrentSegmentIndex(currentSegmentIndex + 1);
      }
    }
  }, [currentIndex, currentSegmentIndex, segments, currentText]);

  return (
    <div>
      {displayedSegments.map((segment, idx) => {
        if (segment.type === "code") {
          return (
            <CodeBlock
              key={idx}
              language={segment.language || "plaintext"}
              code={segment.content}
            />
          );
        } else {
          return (
            <div key={idx} className="mb-5">
              {segment.content}
            </div>
          );
        }
      })}
      {currentSegmentIndex < segments.length && (
        <div className="whitespace-pre-wrap">
          {segments[currentSegmentIndex].type === "code" ? (
            <CodeBlock
              language={segments[currentSegmentIndex].language || "plaintext"}
              code={currentText}
            />
          ) : (
            currentText
          )}
        </div>
      )}
    </div>
  );
};

export default Typewriter;
