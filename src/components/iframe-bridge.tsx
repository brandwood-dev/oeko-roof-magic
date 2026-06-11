import { useEffect } from "react";

export function IframeBridge() {
  useEffect(() => {
    if (window.parent === window) return;

    window.parent.postMessage(
      {
        type: "oeko:iframe-ready",
        scrollMode: "iframe",
      },
      "https://www.oeko.fr",
    );
  }, []);

  return null;
}
