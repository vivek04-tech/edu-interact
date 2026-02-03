"use client";
import { useEffect, useState } from "react";

export default function InstallButton() {
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: any) => {
      e.preventDefault();
      setPrompt(e);
    });
  }, []);

  if (!prompt) return null;

  return (
    <button
      onClick={() => {
        prompt.prompt();
      }}
    >
      Install App
    </button>
  );
}
