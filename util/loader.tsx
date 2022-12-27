const Loader = () => {
  return (
    <div className="flex justify-center loader_container absolute left-2/4">
      <span className="loader">
        <svg viewBox="22 22 44 44">
          <circle
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            strokeWidth="3.6"
          ></circle>
        </svg>
      </span>
    </div>
  )
}

export default Loader
