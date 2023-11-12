export const downloadFile = async (fileUrl, fileName) => {
  try {
    // fetch the url
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // BLOB SYNTAX: const blob = new Blob([content], {type: "application/json",});
    // convert response to a blob object that can contain media files, and other types like binary data(tldr on mdn)
    const blob = await response.blob();

    // URL object provides a method createObjectURL and it takes a blob or file object to return a unique url (obj URL) to represent the blob 'content'
    // TLDR: blobUrl is the 'content' parameter in the blob syntax
    const blobUrl = URL.createObjectURL(blob);

    // simulate a "click" event by "creating" a new anchor tag (which is fake or just imagine its not there, its here for functionality of opening up the download window)
    const link = document.createElement("a");
    // set href of the anchor tag
    link.href = blobUrl;
    // sets the download name for the anchor tag
    link.download = fileName;
    // invokes a click on the anchor tag
    link.click();

    // Clean up the Blob URL by releasing the resources associated with the blobUrl (blob content) - why? they are temporary urls and may cause memory leaks if not released
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
