/* eslint-disable react/prop-types */
const Button = ({ label, onClick, disabled,bgColor, small, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          capitalize
          transition
          px-4
          ${bgColor ? 'bg-[#E5D283]' : 'bg-rose-500'}
          ${bgColor ? 'border-[#E5D283]' : 'border-rose-500'}
          ${bgColor ? 'text-black' : 'text-white'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'py-1' : 'py-3'}
          ${small ? 'font-light' : 'font-semibold'}
          ${small ? 'border-[1px]' : 'border-2'}
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className='
              absolute
              left-4
              top-3
            '
        />
      )}
      {label}
    </button>
  )
}

export default Button
