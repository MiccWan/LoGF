import Enum from "../../util/Enum";

let TerrainTypes = {
  resource: 0,
  plain: 1,
  forest: 2,
  mountain: 3,
  ocean: 4,
  boss: 5
};

TerrainTypes = new Enum(TerrainTypes);

export default TerrainTypes;


TerrainTypes.names;