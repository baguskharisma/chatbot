import React, { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex(currentIndex + 1);
        },
        text[currentIndex] === " " ? 5 : 5
      );

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, text]);

  return <div>{displayedText}</div>;
};

export default Typewriter;
