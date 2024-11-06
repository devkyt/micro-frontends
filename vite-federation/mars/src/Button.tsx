import useCount from "./store";

const Button = () => {
  const [state, setState] = useCount();

  return (
    <div>
        <button className="shared-btn" onClick={() => setState((s) => s + 1)}>
            Click me gently: {state}
        </button>
    </div>
    )
}

export default Button;