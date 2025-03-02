import { render, screen } from "@testing-library/react";
import Navbar from "../routes/Navbar";
import { BrowserRouter } from "react-router-dom";

test("renders Navbar with the correct title", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  
  expect(screen.getByText(/claims management/i)).toBeInTheDocument();
});
