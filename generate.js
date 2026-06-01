const fs = require("fs");

const {
    Document,
    Packer,
} = require("docx");

const blocks = require("./framework/blocks");
const buildModule = require("./modules/current");

const children = [];

buildModule(blocks, children);

const doc = new Document({
    sections: [
        {
            children,
        },
    ],
});

Packer.toBuffer(doc).then(buffer => {

    if (!fs.existsSync("./output")) {
        fs.mkdirSync("./output");
    }

    fs.writeFileSync(
        "./output/module.docx",
        buffer
    );

    console.log("DOCX generated successfully.");
});