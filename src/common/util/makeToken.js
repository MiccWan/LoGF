/**
 * @typedef {import('logf-common/core/data/map/token/Token').default} Token
 */
import MobToken from "logf-common/core/data/map/token/MobToken";
import TokenType from "logf-common/core/constant/TokenType";
import FruitToken from "logf-common/core/data/map/token/FruitToken";
import ExplorerToken from "logf-common/core/data/map/token/ExplorerToken";
import MutationToken from "logf-common/core/data/map/token/MutationToken";
import NullToken from "logf-common/core/data/map/token/NullToken";
import ResourceToken from "logf-common/core/data/map/token/ResourceToken";

const TokenClassByName = {
  [TokenType.fruit]: FruitToken,
  [TokenType.mob]: MobToken,
  [TokenType.explorer]: ExplorerToken,
  [TokenType.mutation]: MutationToken,
  [TokenType.null]: NullToken,
  [TokenType.resource]: ResourceToken
};

/**
 * @param {string} tokenType 
 * @return {Token}
 */
export function makeToken(tokenType, props) {
  const TokenClass = TokenClassByName[TokenType.valueFrom(tokenType)];
  const token = new TokenClass(props);
  return token;
}