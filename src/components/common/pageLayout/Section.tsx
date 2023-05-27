import { Paper, PaperProps, styled } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";

type SectionProps = PaperProps &
  CommonProps & {
    centerText?: boolean;
  };

const Section = styled(Paper)<SectionProps>(({ theme, centerText }) => ({
  margin: theme.spacing(3, 0),
  padding: theme.spacing(3),
  textAlign: centerText ? "center" : undefined,
}));

export default Section;
