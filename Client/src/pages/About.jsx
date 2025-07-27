import styled from "styled-components";
import InfoSection from "../components/InfoSection";

const GridContentAbout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
`;

const About = () => {
  return (
    <GridContentAbout>
      <InfoSection title="Who We Are">
        We are a passionate team of developers, designers, and productivity
        enthusiasts committed to helping learners take control of their time and
        focus. Our mission is to build intuitive tools that boost productivity,
        track growth, and eliminate digital distractions.
      </InfoSection>

      <InfoSection title="Our Mission">
        Our mission is to empower learners and professionals to master their
        goals by providing seamless focus tracking, time analytics, and gamified
        motivation. Whether you're coding, revising, or creating, we’re here to
        help you stay consistent and intentional with your time.
      </InfoSection>

      <InfoSection title="What Makes Us Different">
        Unlike traditional productivity apps, we combine distraction tracking,
        real-time session analytics, and gamified leveling — all in one place.
        You don’t just track time — you grow through it. Every session counts
        toward your progress, XP, and level-ups.
      </InfoSection>

      <InfoSection title="Our Vision">
        We envision a world where self-discipline becomes second nature. By
        blending beautiful interfaces with deep focus strategies, we aim to
        transform how people work and learn in the digital age.
      </InfoSection>

      <InfoSection title="Technologies We Use">
        Our stack includes React, Node.js, MongoDB, Express, and modern UI/UX
        principles using styled-components and component-driven design. We
        continuously evolve our stack to stay cutting-edge and efficient.
      </InfoSection>
    </GridContentAbout>
  );
};

export default About;
