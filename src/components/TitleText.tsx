interface Props {
  text: string;
  children?: React.ReactNode | JSX.Element;
  className?: string;
}

const TitleText = ({ text, children, className = '' }: Props) => (
  <h1
    className={`w-full flex gap-2 justify-center items-center font-bold pb-4 pt-2 capitalize text-center text-xl md:text-3xl${className}`}
  >
    {text}
  </h1>
);
export default TitleText;
