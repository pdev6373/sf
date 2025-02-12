
'use client'
const Button = ({ children, fill, className, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`h-[50px] border-2 px-10 border-primary mb-4 duration-300 transition-all hover:shadow-md font-bold ${className} ${
          fill ? 'text-white bg-primary' : 'text-primary bg-white'
        }`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  