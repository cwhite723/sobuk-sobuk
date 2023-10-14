import { Link } from "react-router-dom";
import theme from "styles/theme";

interface PropsType {
  children: React.ReactNode;
  to: string;
}

const CommonLink: React.FC<PropsType> = (props) => {
  return (
    <Link
      to={props.to}
      style={{
        textDecoration: "none",
        color: `${theme.palette.text.primary}`,
      }}
    >
      {props.children}
    </Link>
  );
};

export default CommonLink;
