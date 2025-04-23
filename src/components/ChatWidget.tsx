
import { useState } from "react";
import { Button } from "./ui/button";
import { MessageSquare, X } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-12 w-12 rounded-full bg-[#FFD700] hover:bg-[#FFE44D] text-black shadow-lg"
          aria-label="Open Julisha Chat Assistant"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh]">
          <div className="flex justify-end p-2 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat Assistant"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <iframe
            src="https://voiceglow.org/app/na/render/x92l42ahvgi8m15/iframe"
            title="Julisha Chat Assistant"
            className="w-full h-[calc(100%-48px)]"
          />
        </div>
      )}
    </div>
  );
}
