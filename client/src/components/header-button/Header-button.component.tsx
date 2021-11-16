type AppProps = {
  text: string
  handleClick: () => void
}

function HeaderButtonComponent({text, handleClick}: AppProps) {
  return (
    <button
      className="p-2 my-6 mx-2 text-sm sm:text-base text-black border-2 border-transparent rounded-md bg-red-300 hover:bg-red-400 transition duration-500 ease-in-out"
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default HeaderButtonComponent
