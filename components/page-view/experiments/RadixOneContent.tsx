import Head from "next/head";
import React from "react";
import {
  Box,
  Flex,
  Grid,
  Container,
  Section,
  Avatar,
  Card,
  Text,
  IconButton,
} from "@radix-ui/themes";
import { Page } from "../../globals";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const RadixOneContent = () => {
  return (
    <>
      <Head>
        <title>Next Page RadixOneContent</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={true}>
        <IconButton>
          <MagnifyingGlassIcon width="18" height="18" />
        </IconButton>
        <Card style={{ maxWidth: 240 }}>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                Teodros Girmay
              </Text>
              <Text as="div" size="2" color="gray">
                Engineering
              </Text>
            </Box>
          </Flex>
        </Card>
        {/* Row 4 */}
        <Box className="w-50 bg-gray-300">
          <Container size="2">
            <h4>Sidebar</h4>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 2</li>
              <li>Item 2</li>
            </ul>
          </Container>
        </Box>
        <Box>
          <Container size="1" className="bg-purple-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            laborum nemo veniam cumque esse natus id voluptatem. Soluta eius
            nesciunt esse libero eos, velit fugiat eveniet quae deleniti aperiam
            quo?
          </Container>
        </Box>
        {/* <Container
        className="bg-purple-400"
        width={{
          initial: "100%",
          sm: "100%",
          md: "4",
          xl: "4",
        }}
      >
        <h2>Content Title</h2>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
      </Container> */}
        {/* </Flex> */}
      </Page>
    </>
  );
};

export default RadixOneContent;
