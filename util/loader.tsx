const Loader: React.FC = () => {
  return (
    <div className="d-flex justify-content-center loader_container">
      <span className="loader" role="progressbar">
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
