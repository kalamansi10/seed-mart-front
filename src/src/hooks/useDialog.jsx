import { useEffect, useState, useRef } from "react";

// Custom hook for managing dialogs
export default function useDialog() {
  const [status, setStatus] = useState("closed");
  // Reference to the dialog element
  const ref = useRef();

  useEffect(() => {
    const bodyScroll = document.body;
    status == "open"
      ? (bodyScroll.style.overflow = "hidden")
      : (bodyScroll.style.overflow = "visible");
  }, [status]);

  // Function to close the dialog
  const close = () => {
    // Check if the dialog is defined and open before attempting to close it
    if (ref.current && ref.current.open) {
      // Close the dialog
      ref.current.close();
      setStatus("closed");
      // Remove the event listener for outside clicks
      removeListener();
    }
  };

  // Function to show the dialog
  const show = () => {
    // Show the dialog using the showModal method
    ref.current.showModal();
    setStatus("open");
    // Add an event listener for outside clicks to close the dialog
    ref.current.addEventListener("click", handleOutsideClick);
  };

  // Event handler for outside clicks to close the dialog
  const handleOutsideClick = (e) => {
    // Get the dimensions of the dialog
    const dialogDimensions = ref.current.getBoundingClientRect();
    // Check if the click is outside the dialog boundaries
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      // Close the dialog
      close();
    }
  };

  const removeListener = () => {
    ref.current.removeEventListener("click", handleOutsideClick);
  };

  // Return the dialog reference and functions for showing and closing the dialog
  return { ref, show, close, removeListener, status };
}
