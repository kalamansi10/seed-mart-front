import { useRef } from 'react'

export default function useDialog() {
  const dialogRef = useRef()
  const closeDialog = () => dialogRef.current.close()

  const showDialog = () => {
    dialogRef.current.showModal()
    dialogRef.current.addEventListener('click', handleOutsideClick)
  }

  const handleOutsideClick = e => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeDialog()
      dialogRef.current.removeEventListener('click', closeDialog)
    }
  }

  return {dialogRef, showDialog, closeDialog}
}
