import { Link } from "react-router-dom";
import theme from "styles/theme";

interface PropsType {
  children: React.ReactNode;
  to: string;
}

const CustomLink = ({ children, to }: PropsType) => {
  return (
    // react router dom에서 제공하는 Link
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: `${theme.palette.text.primary}`,
      }}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
