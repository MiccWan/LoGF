import Enum from "../../util/Enum";

let TerrainType = {
  resource: 0,
  plain: 1,
  forest: 2,
  mountain: 3,
  ocean: 4,
  boss: 5
};

TerrainType = new Enum(TerrainType);

export default TerrainType;