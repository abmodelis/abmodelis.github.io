import { HashRouter, Route, Routes } from "react-router-dom";
import { Students } from "./views/students";
import Teachers from "./views/teachers";


// import Courses from "views/teachers/courses";
import { CreateDataCurses } from "./components/modals/CreateDataCourses";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
// import { UpdateDataCourse } from "components";
import { SectionCourse } from "components/sections/SectionCourse";
import { SectionMaterials } from "components/sections/SectionMaterial";
import { CreateSection } from "./components/sections/CreateSection";
import { Section } from "components/sections/Section";

function App() {
  return (
    // <HashRouter>
    //   <Routes>
    //     <Route path="/" element={/*<h1>Home</h1>*/<Teachers />} />
    //     <Route path="/students/*" element={<Students />} />
    //     <Route path="/teachers/*" element={<Teachers />} />
    //     <Route path="*" element={<h1>Not Found</h1>} />
    //   </Routes>
    // </HashRouter>
    // <div>
    //   <CreateDataCurses 
    //       addButton={
    //         <Button
    //           variant="contained"
    //           endIcon={<AddIcon />}
    //           sx={{ bgcolor: "#FFFFFF", color: "#110404", "&:hover": { bgcolor: "#E6E6E6" } }}
    //         >
    //           Agregar curso
    //         </Button>
    //       }
    //     />
    //     <CreateDataCurses 
    //       addButton={
    //         <Button size="small">Share</Button>
    //       }
    //     />
    //     {/* <UpdateDataCourse/> */}
        
    // </div>
    <div>
      <SectionCourse addButton={<Button endIcon={<AddIcon style={{ color: 'white' }}/>} sx={{color: 'white', bgcolor: '#1976D2', width:'236px', height:'52px', fontFamily:'Roboto', fontSize:'18px', textTransform: 'none', '&:hover': {bgcolor: '#1976D2',}}}>Agregar clase</Button>}/>
      <Section/>
    </div>
    
    
  );
}

export default App;