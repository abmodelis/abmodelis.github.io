import { Link } from "@mui/material";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <h2>
        <Link href="/#/teachers">Teachers</Link>
      </h2>
      <h2>
        <Link href="/#/students">Students</Link>
      </h2>
    </>
  );
}
export default Home;
