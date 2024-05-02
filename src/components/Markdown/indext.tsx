import { Typography } from "@mui/material";
import { MuiMarkdown, MuiMarkdownProps, getOverrides } from "mui-markdown";

export const StyledMuiMarkdown: React.FC<MuiMarkdownProps> = (props) => {
  const { children } = props;
  return (
    <MuiMarkdown
      overrides={{
        ...getOverrides(),
        h1: {
          component: Typography,
          props: {
            variant: "h3",
          },
        },
        h2: {
          component: Typography,
          props: {
            variant: "h4",
          },
        },
        h3: {
          component: Typography,
          props: {
            variant: "h5",
          },
        },
        h4: {
          component: Typography,
          props: {
            variant: "h5",
          },
        },
      }}
    >
      {children}
    </MuiMarkdown>
  );
};
