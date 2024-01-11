import Head from "next/head";
import React from "react";
import { Box, Flex, Grid, Container, Section } from "@radix-ui/themes";
import { Page } from "../../globals";

const RadixOneContent = () => {
  return (
    <>
      <Head>
        <title>Next Page RadixOneContent</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={true}>
        {/* Row 1 */}
        {/* <Section className="prose max-w-3xl mx-auto"> */}
        <h1>This is the Page RadixOneContent (Copy Me)</h1>
        <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit</h2>
        <p>Lorem ipsum dolor sit amet...</p>
        {/* </Section> */}

        {/* Row 2 */}

        {/* <Container size="4">
          <Flex className="flex-wrap gap-4">
            {[...Array(4)].map((_, index) => (
              <Box key={index} className="w-full  lg:w-1/4 p-4 bg-gray-200">
                <h2>Box Title {index + 1}</h2>
                <p>Lorem ipsum dolor sit amet...</p>
              </Box>
            ))}
          </Flex>
        </Container>

   

        {/* Row 3 */}
        {/* <Grid className="grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Section key={index} className="p-4 bg-gray-300">
              <h3>Section Title {index + 1}</h3>
              <p>Lorem ipsum dolor sit amet...</p>
            </Section>
          ))}
        </Grid> */}

        {/* Row 4 */}
        <Flex className="gap-4 flex-wrap">
          <Container className="w-1/4 bg-gray-200 p-4">
            <h4>Sidebar</h4>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 2</li>
              <li>Item 2</li>
            </ul>
          </Container>
          <Container className="w-3/4 bg-purple-300 p-4">
            <h2>Content Title</h2>
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Lorem ipsum dolor sit amet...</p>
          </Container>
        </Flex>

        {/* Row 4 */}
        <Flex className="gap-4 mt-5">
          <Section className="w-1/4 bg-gray-200 p-4">
            <h4>Sidebar</h4>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 2</li>
              <li>Item 2</li>
            </ul>
          </Section>
          <Section className="w-3/4 bg-purple-300 p-4">
            <h2>Content Title</h2>
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Lorem ipsum dolor sit amet...</p>
          </Section>
        </Flex>

        {/* Row 5 */}
        <Flex className="gap-4 flex-wrap mt-5">
          {[...Array(4)].map((_, index) => (
            <Box key={index} className="p-4 bg-gray-200">
              <img
                src={`https://picsum.photos/400/200`}
                alt={`Blog ${index}`}
              />
              <h3>Blog Title {index + 1}</h3>
              <p>Lorem ipsum dolor sit amet...</p>
            </Box>
          ))}
        </Flex>

        {/* Row 6 */}
        {/* <Grid className="grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Box key={index} className="p-4 bg-gray-300">
              <img
                src={`https://picsum.photos/400/200`}
                alt={`Post ${index}`}
              />
              <h3>Post Title {index + 1}</h3>
              <p>Lorem ipsum dolor sit amet...</p>
            </Box>
          ))}
        </Grid> */}
      </Page>
    </>
  );
};

export default RadixOneContent;
