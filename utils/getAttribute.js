const getAttribute = (attributes) => {
  const traits = [];

  if (attributes === null || attributes === undefined) {
    return traits;
  }

  const attributesArray = attributes.split(";");
  for (let attribute of attributesArray) {
    const singleAttribute = attribute.split(":");
    const trait = { trait_type: singleAttribute[0], value: singleAttribute[1] };
    traits.push(trait);
  }
  return traits;
};

module.exports = getAttribute;
