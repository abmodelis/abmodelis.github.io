import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Course } from "types";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SectionAccordion from "components/CourseContent/sections";
import { useState } from "react";
import { CourseSectionForm } from "components/forms/CourseSectionForm";
import { Section } from "types/Section";

type Props = {
  course: Course;
};

export const CourseData: React.FC<Props> = ({ course }) => {

  const [sections, setSections] = useState<JSX.Element[]>([]);

  const [showSectionForm, setShowSectionForm] = useState(false);

  const handleAddSectionClick = () => {
    setShowSectionForm(true);
  };

  const handleFormSubmit = (sectionData: Section) => {
    // Aquí agregas la nueva sección con los datos del formulario
    setSections(prevSections => [
      ...prevSections,
      <Box key={prevSections.length} sx={{ mb: 2 }}>
        <SectionAccordion key={prevSections.length} sectionNumber={prevSections.length + 1} title={sectionData.title} />
      </Box>
    ]);
    setShowSectionForm(false); // Oculta el formulario después de agregar la sección
  };

  const handleCancel = () => {
    setShowSectionForm(false); // Oculta el formulario si se cancela
  };

  const visibilityStatus: Record<number, JSX.Element> = {
    0: (
      <>
        Visible <Visibility sx={{ ml: 1 }} />
      </>
    ),
    1: (
      <>
        Oculto <VisibilityOff sx={{ ml: 1 }} />
      </>
    ),
  };

  return (
    <Grid container rowSpacing={2} sx={{ p: 3 }}>
      <Card sx={{ display: "flex", maxHeight: "240px", maxWidth: "1025px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              textAlign={"left"}
              variant="h4"
            >
              {course.title}
            </Typography>
            <br />
            <Typography
              textAlign={"left"}
              variant="body1"
              color="text.secondary"
            >
              {course.description}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pb: 1 }}>
            <Typography px={2} textAlign={"start"} variant="h6">
              {course.price ? `Bs. ${course.price}` : "Gratis"}
            </Typography>
            <Typography px={2} textAlign={"start"} variant="h6" display={"flex"} alignItems={"center"}>
              {visibilityStatus[course.status]}
            </Typography>
          </Box>
        </Box>
        <CardMedia component="img" sx={{ width: "342px", height: "240px" }} image={course.image_path} alt={course.title} />
      </Card>
      <Grid sx={{ width: "100%" }}>
        <Box sx={{ display: "felx", maxWidth: "1025px", pt: 4 }}>
          {sections.map((section) => section)}
          {
            showSectionForm ? (
              <CourseSectionForm onFormSubmit={handleFormSubmit} onCancel={handleCancel} />
            ) : (
              <Button variant="contained" onClick={handleAddSectionClick}>Agregar sección</Button>
            )
          }
        </Box>
      </Grid>
    </Grid>
  );
};