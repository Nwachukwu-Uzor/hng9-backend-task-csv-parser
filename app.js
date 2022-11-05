const fs = require("fs");
const parser = require("csv-parser");
const crypto = require("crypto");
const converter = require("json-2-csv");

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

const readCSVFile = () => {
  fs.createReadStream("./public/data/csv_sample.csv")
    .pipe(parser())
    .on("data", (data) => {
      const filePath = `${data?.Filename}.output.json`;
      console.log(`Processing ${filePath} 🛠....`);
      const attributes = getAttribute(data?.Attributes);
      // attributes.push(attribute);
      const jsonValue = {
        format: "CHIP-0007",
        name: data?.Filename,
        description: data?.Description,
        minting_tool: data?.["TEAM NAMES"],
        sensitive_content: false,
        series_number: data?.["Series Number"],
        series_total: 420,
        attributes: attributes,
        collection: {
          name: "Zuri NFT Tickets for Free Lunch",
          id: data?.UUID,
          attributes: [
            {
              type: "description",
              value: "Rewards for accomplishments during HNGi9.",
            },
          ],
        },
      };

      

      fs.writeFileSync(
        `./public/output/json/${filePath}`,
        JSON.stringify(jsonValue)
      );
      const hash = hashFile(filePath);
      data.HASH = hash;
      convertJSONToCSVFile(data, data?.Filename);
      // console.log(data);
    })
    .on("end", () => {
      console.log("Process Done ✔");
    });
};

readCSVFile();

const hashFile = (fileName) => {
  return crypto
    .createHash("sha256")
    .update(`./public/output/${fileName}`)
    .digest("hex");
};

const convertJSONToCSVFile = (data, name) => {
  let file;
  converter.json2csv(data, (err, csv) => {
    if (err) {
      throw err;
    }

    // print CSV string
    const filePath = `${name}.output.csv`;
    fs.writeFileSync(`./public/output/csv/${filePath}`, csv);
  });
  return file;
};
