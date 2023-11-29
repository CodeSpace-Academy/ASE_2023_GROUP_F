/**
 * HandleError Component
 * 
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - The content to be displayed within the error message.
 * 
 * @returns {JSX.Element} HandleError component
 */

function HandleError(props) {

  const {children} = props

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
        <span className="block sm:inline">{children}</span>
      </div>
  )
}

export default HandleError

