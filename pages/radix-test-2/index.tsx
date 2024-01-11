import { Box, Container } from "@radix-ui/themes";
import React from "react";

const index = () => {
  return (
    <>
      <Box
        width="9"
        className="w-50 bg-gray-300 border-solid border-4 border-red-500"
      >
        {/* <Container size="2" className="border-solid border-4 border-red-500"> */}
        <h4>Sidebar</h4>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 2</li>
          <li>Item 2</li>
        </ul>
        {/* </Container> */}
      </Box>
      <Box>
        <Container size="1" className="bg-purple-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          laborum nemo veniam cumque esse natus id voluptatem. Soluta eius
          nesciunt esse libero eos, velit fugiat eveniet quae deleniti aperiam
          quo?
        </Container>
      </Box>
    </>
  );
};

export default index;
