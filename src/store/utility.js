export const updatedObject = (oldObject, updatedProperties) => (
  {
    ...oldObject,
    ...updatedProperties
  }
)