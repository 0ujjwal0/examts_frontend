const SubmitButton = ({ handleSubmitTest }) => (
  <div className="flex flex-col my-2 w-2/3 justify-center">
    <button
      type="button"
      className="px-2 relative py-1  border-2 border-green-500 rounded-lg before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-green-500/15 before:border before:border-green-500 before:rounded-md before:scale-0 before:hover:scale-100 before:opacity-0 before:hover:opacity-100 before:transition-all  before:-z-10 text-green-600 hover:text-green-800 transition-colors dark:text-neutral-400 before:ease-out before:duration-200 active:text-neutral-400 before:active:bg-neutral-500/20 transform-gpu before:transform-gpu"
    onClick={handleSubmitTest}
    >
      End Test
    </button>
  </div>
);

export default SubmitButton;
