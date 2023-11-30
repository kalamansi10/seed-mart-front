import { useRef } from 'react'

export default function useDialog() {
  const domNode = useRef()
  const quickClose = () => domNode.current.close()

  const showDialog = () => {
    domNode.current.showModal()
    domNode.current.addEventListener('click', closeDialog)
  }

  const closeDialog = e => {
    const dialogDimensions = domNode.current.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      domNode.current.close()
      domNode.current.removeEventListener('click', closeDialog)
    }
  }

  return [domNode, showDialog, quickClose]
}
