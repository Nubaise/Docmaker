// generate.js
const fs = require("fs");

const { Document, Packer } = require("docx");

const blocks = require("./framework/blocks");
const buildModule = require("./modules/current");

const children = [];

buildModule(blocks, children);

const doc = new Document({
    numbering: blocks.numberingConfig,
    styles: blocks.stylesConfig,
    sections: [
        {
            properties: {
                page: {
                    size: {
                        width: 12240,
                        height: 15840,
                    },
                    margin: {
                        top: 1440,
                        right: 1440,
                        bottom: 1440,
                        left: 1440,
                    },
                },
            },
            children,
        },
    ],
});

Packer.toBuffer(doc).then(buffer => {
    if (!fs.existsSync("./output")) {
        fs.mkdirSync("./output");
    }
    fs.writeFileSync("./output/module.docx", buffer);
    console.log("DOCX generated successfully → output/module.docx");
});