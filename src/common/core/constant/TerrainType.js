import Enum from "../../util/Enum";

let TerrainType = {
  resource: 1,
  plain: 2,
  forest: 3,
  mountain: 4,
  ocean: 5,
  boss: 6
};

TerrainType = new Enum(TerrainType);

export default TerrainType;