import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, IconButton, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { StyledMuiMarkdown } from "components/Markdown/indext";
import { useState } from "react";
import Player from "react-player";
import { Content } from "types";

type ClassAccordionProps = {
  classNumber: number;
  content: Content;
};

const ClassesAccordion: React.FC<ClassAccordionProps> = ({ classNumber, content }: ClassAccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div>
      <Accordion
        expanded={expanded}
        sx={{
          width: "100%",
          border: expanded ? "1px solid #1976D2" : "none",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              onClick={() => setExpanded(!expanded)}
              sx={{ color: expanded ? "#FFFFFF" : "inherit", ml: "auto" }}
              onChange={handleChange}
            />
          }
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: expanded ? "#1976D2" : "transparent",
            ".MuiAccordionSummary-content": {
              color: expanded ? "#FFFFFF" : "inherit",
            },
          }}
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
        >
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
            Clase {classNumber}: {content.title}
            <Box sx={{ display: "inline-flex", opacity: isHovering ? 1 : 0, transition: "opacity 0.3s" }}>
              <IconButton
                onClick={() => {
                  /* Coloca aquí la lógica para editar */
                }}
                sx={{ color: expanded ? "#FFFFFF" : "inherit", ml: 1 }}
              >
                <EditIcon sx={{ visibility: "visible" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  /* Coloca aquí la lógica para eliminar */
                }}
                sx={{ color: expanded ? "#FFFFFF" : "inherit", ml: 1 }}
              >
                <DeleteIcon sx={{ visibility: "visible" }} />
              </IconButton>
            </Box>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StyledMuiMarkdown>{content.html_text}</StyledMuiMarkdown>
          <Box py={2}>
            <Player url={content.media_path} width="100%" height="420px" />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ClassesAccordion;
