export const copyTextToClipboard = (text, setIsCopied) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Reset the state after 2 seconds
    })
    .catch((err) => {
      console.error("Failed to copy text:", err);
    });
};
