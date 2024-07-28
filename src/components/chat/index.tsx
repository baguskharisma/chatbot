import { useChat } from "ai/react";
import { ArrowUp, RotateCcw } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Typewriter from "../typewriter";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, reload } =
    useChat();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleRegenerate = () => {
    reload();
  };

  return (
    <>
      <div className="relative flex w-full h-screen md:h-4/5 md:w-1/4 min-h-[50vh] flex-col md:rounded-xl bg-muted/50 py-4 lg:col-span-2">
        <Badge variant="outline" className="absolute top-5 right-5">
          Output
        </Badge>
        <ScrollArea className="flex flex-col h-[85%] md:h-5/6 overflow-y-auto mx-auto stretch mt-10 w-full">
          {messages.map((m, index) => (
            <div
              key={index}
              className={`flex items-start mt-5 mx-5 ${
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
                className={`whitespace-pre-wrap py-2 px-3 md:text-xs ${
                  m.role === "user"
                    ? "bg-muted text-stone-50 rounded-tl-lg rounded-br-lg rounded-bl-lg max-w-60"
                    : "rounded-tr-lg rounded-br-lg rounded-bl-lg text-stone-50"
                }`}
              >
                {m.role === "assistant" ? (
                  <div>
                    <Typewriter text={m.content} />
                    <button
                      type="button"
                      className="bg-muted w-7 h-7 rounded-full mt-2"
                      onClick={handleRegenerate}
                    >
                      <RotateCcw className="w-3 h-3 stroke-stone-50 m-auto" />
                    </button>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
        <form
          onSubmit={handleSubmit}
          className="absolute bottom-5 bg-stone-950 md:bottom-4 inset-x-4 border w-11/12 h-14 rounded-full flex flex-row"
        >
          <textarea
            className="w-10/12 text-sm resize-none overflow-hidden pt-4 bg-transparent ps-6 focus:outline-none placeholder:text-sm"
            value={input}
            placeholder="Type your message here..."
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button
            type="submit"
            className="bg-stone-50 absolute bottom-3 right-3 w-8 h-8 rounded-full"
          >
            <ArrowUp className="w-5 h-5 stroke-stone-950 m-auto" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
