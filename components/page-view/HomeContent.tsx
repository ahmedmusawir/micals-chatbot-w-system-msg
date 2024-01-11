import Container from "../ui-ux/common/Container";
import Hero from "../ui-ux/restaurant/Hero";

interface Props {
  // homePageContent: HomePageData;
}

// const HomeContent = ({ homePageContent }: Props) => {
const HomeContent = () => {
  // const title = homePageContent?.attributes?.heroTitle;
  // const slogan = homePageContent?.attributes?.heroSlogan;

  return (
    <Container className="" FULL={true}>
      {/* <Hero title={title} slogan={slogan} /> */}
      <Hero />
    </Container>
  );
};

export default HomeContent;
