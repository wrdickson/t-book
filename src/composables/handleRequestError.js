
export default () => {

  const handleError = (error) => {
    console.log('from comp', error)
  }
  
  return { handleError }
}