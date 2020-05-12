import Enum from "../../util/Enum";

let TokenType = {
  fruit: 1,
  mob: 2,
  explorer: 3,
  mutation: 4,
  null: 5,
  resource: 6
};

TokenType = new Enum(TokenType);

export default TokenType;