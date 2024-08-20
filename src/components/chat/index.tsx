import { useChat } from "ai/react";
import { ArrowUp, RotateCcw } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";
import Typewriter from "../typewriter";
import CodeBlock from "./codeblock";

const Chat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, reload } =
    useChat();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const detectCodeBlocks = (text: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const segments: Array<{
      type: "code" | "text";
      content: string;
      language?: string;
    }> = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }
      segments.push({
        type: "code",
        content: match[2],
        language: match[1] || "javascript",
      });
      lastIndex = codeBlockRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      segments.push({
        type: "text",
        content: text.slice(lastIndex),
      });
    }

    return segments;
  };

  const handleRegenerate = () => {
    reload();
  };

  return (
    <div className="relative flex w-full h-screen flex-col bg-muted/50 py-4 lg:col-span-2">
      <Badge
        variant="outline"
        className="absolute top-5 right-5 md:right-[170px]"
      >
        Output
      </Badge>
      <ScrollArea className="flex flex-col h-[85%] md:h-5/6 overflow-y-auto mx-auto md:px-[170px] stretch mt-10 w-full">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`flex items-start mt-5 mx-5 md:mx-0 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "assistant" && (
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="/img/llama-2.jpg"
                  alt="profilePic"
                  className="object-cover object-center"
                />
              </Avatar>
            )}
            <div
              className={`whitespace-pre-wrap px-3 md:text-sm ${
                m.role === "user"
                  ? "bg-muted text-stone-50 rounded-tl-lg rounded-br-lg rounded-bl-lg py-2"
                  : "rounded-tr-lg rounded-br-lg rounded-bl-lg text-stone-50 pt-2 pb-20 w-full"
              }`}
            >
              {m.role === "assistant" ? (
                <div>
                  <Typewriter segments={detectCodeBlocks(m.content)} />
                  <button
                    type="button"
                    className="bg-muted w-7 h-7 rounded-full mt-2"
                    onClick={handleRegenerate}
                  >
                    <RotateCcw className="w-3 h-3 stroke-stone-50 m-auto" />
                  </button>
                </div>
              ) : (
                detectCodeBlocks(m.content).map((segment, idx) =>
                  segment.type === "code" ? (
                    <CodeBlock
                      language={segment.language || "plaintext"}
                      code={segment.content}
                    />
                  ) : (
                    <div key={idx}>{segment.content}</div>
                  )
                )
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-5 bg-stone-950 inset-x-4 md:mx-auto border w-11/12 md:w-3/4 h-14 rounded-full flex flex-row"
      >
        <textarea
          className="w-10/12 text-sm resize-none overflow-hidden pt-4 bg-transparent ps-6 focus:outline-none placeholder:text-sm"
          value={input}
          placeholder="Type your message here..."
          onChange={handleInputChange}
          // onKeyDown={handleKeyPress}
        />
        <button
          type="submit"
          className="bg-stone-50 absolute bottom-3 right-3 w-8 h-8 rounded-full"
        >
          <ArrowUp className="w-5 h-5 stroke-stone-950 m-auto" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
