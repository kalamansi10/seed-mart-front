import { useRef } from 'react'

// Custom hook for managing dialogs
export default function useDialog() {
  // Reference to the dialog element
  const dialogRef = useRef()

  // Function to close the dialog
  const closeDialog = () => {
    // Check if the dialog is defined and open before attempting to close it
    if (dialogRef.current && dialogRef.current.open) {
      // Close the dialog
      dialogRef.current.close()
      // Remove the event listener for outside clicks
      dialogRef.current.removeEventListener('click', handleOutsideClick)
    }
  }

  // Function to show the dialog
  const showDialog = () => {
    // Show the dialog using the showModal method
    dialogRef.current.showModal()
    // Add an event listener for outside clicks to close the dialog
    dialogRef.current.addEventListener('click', handleOutsideClick)
  }

  // Event handler for outside clicks to close the dialog
  const handleOutsideClick = e => {
    // Get the dimensions of the dialog
    const dialogDimensions = dialogRef.current.getBoundingClientRect()
    // Check if the click is outside the dialog boundaries
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      // Close the dialog
      closeDialog()
    }
  }

  // Return the dialog reference and functions for showing and closing the dialog
  return { dialogRef, showDialog, closeDialog }
}
