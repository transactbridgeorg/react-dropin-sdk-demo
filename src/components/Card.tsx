import CardCVV from "./Inputs/CardCVV"
import CardExpiry from "./Inputs/CardExpiry"
import CardHolder from "./Inputs/CardHolder";
import CardNumber from "./Inputs/CardNumber"

const CardInputs = () => {
  return (
    <div id="cardContainer">
        <CardNumber />
        <CardExpiry />
        <CardCVV />
        <CardHolder />
    </div>
  );
};

export default CardInputs