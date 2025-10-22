import styled from "styled-components";

const LegendWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; // This is the key property! It wraps items to a new line when they run out of space.
  justify-content: center;
  gap: 1rem 0.8rem; // Vertical and horizontal gap
  padding: 1rem 0;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #333;
`;

const LegendColorBox = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color};
  border-radius: 2px;
`;

const CustomLegend = ({ payload }) => {
  return (
    <LegendWrapper>
      {payload.map((entry, index) => (
        <LegendItem key={`legend-${index}`}>
          <LegendColorBox color={entry.color} />
          <span>{entry.value}</span>
        </LegendItem>
      ))}
    </LegendWrapper>
  );
};

export default CustomLegend;
