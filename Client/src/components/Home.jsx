import styled from "styled-components";

const GridContent = styled.div`
  display: grid;
  /* for laptops */
  grid-template-rows: 10vh 25vh 25vh 10vh 10vh;
  gap: 3vh;
  background-color: blue;

  .item_1 {
    background-color: aqua;
  }

  .item_2 {
    background-color: blueviolet;
  }

  .item_3 {
    background-color: cadetblue;
  }

  .item_4 {
    background-color: coral;
  }

  .item_5 {
    background-color: violet;
  }

  @media (min-width: 320px) {
    grid-template-rows: 15vh 30vh 30vh 15vh 15vh;
  }

  @media (min-width: 425px) {
    grid-template-rows: 15vh 50vh 50vh 15vh 15vh;
  }

  @media (min-width: 768px) {
    grid-template-rows: 20vh 55vh 55vh 20vh 20vh;
  }

  @media (min-width: 1024px) {
    gap: 3vh;
    grid-template-columns: auto auto;
    grid-template-rows: 15vh 40vh 15vh;

    .item_1 {
      grid-column: 1/3;
    }

    .item_2 {
      grid-column: 1/2;
    }

    .item_3 {
      grid-column: 2/3;
    }

    .item_4 {
      grid-column: 1/2;
    }

    .item_5 {
      grid-column: 2/3;
    }
  }
`;

const Home = () => {
  return (
    <GridContent>
      <div className="item_1">INFO</div>
      <div className="item_2">GRAPH</div>
      <div className="item_3">TRANSACTION</div>
      <div className="item_4">FOOTER 1</div>
      <div className="item_5">FOOTER 2</div>
    </GridContent>
  );
};

export default Home;
