import clsx from "clsx";

const Button = ({ text, variant = "fill", className, ...props }) => {
  return (
    <button
      type="button"
      className={clsx(
        "w-44 text-white text-xl py-2 capitalize duration-300",
        className,
        {
          "bg-primary hover:bg-yellow-500": variant === "fill",
          "bg-transparent hover:bg-primary border border-primary":
            variant === "transparent",
            "hover:bg-primary-600 py-2.5 px-5 rounded-lg bg-gradient-to-br from-pink to-orange hover:opacity-80" : variant === 'gradient'
        }
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
