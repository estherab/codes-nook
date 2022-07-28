const LogoIcon = ({ className = "" }) => {
  const parsedClassName = `logo-icon ${className}`;
  return (
    <svg
      className={parsedClassName}
      width='59'
      height='65'
      viewBox='0 0 59 65'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M58.7312 24.4761L33.1147 47.5124V40.3135L56.4724 64.5293H41.8208L21.5965 43.936L42.931 24.4761H58.7312Z'
        fill='#4641D9'
      />
      <path
        d='M17.2336 39.8672L27.9397 29.7519L27.9397 5.34443L17.2336 5.34443L17.2336 39.8672Z'
        fill='#4641D9'
      />
    </svg>
  );
};

export default LogoIcon;
