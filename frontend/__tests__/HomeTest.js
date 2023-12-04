jest.mock('next/router', () => require('../__mocks__/next-router-mock'));

import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { render } from '../test-utils';
import Login from "../pages/login"; 

test("Check for Login Text", () => {
  render(<Login />);
  expect(screen.getByText("Log In")).toBeInTheDocument(); 
});

test("Renders email input field", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email:");
    expect(emailInput).toBeInTheDocument();
  });
// test("Renders email input field", () => {
//     render(<Login />);
//     const emailInput = screen.getByPlaceholderText("email");
//     expect(emailInput).toBeInTheDocument();
//   });
  
  

