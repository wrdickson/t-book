
export function useHandleRequestError () {
  const handleError = (error) => {
    console.log('from comp', error)
  }
  return handleError
}