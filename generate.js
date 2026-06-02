// generate.js
const fs = require("fs");
const { Document, Packer } = require("docx");
const JSZip = require("jszip");

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
                    size: { width: 12240, height: 15840 },
                    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
                },
            },
            children,
        },
    ],
});

// Patch outlineLvl into heading styles so Word shows Navigation Pane
async function generateDoc() {
    const buffer = await Packer.toBuffer(doc);
    const zip = await JSZip.loadAsync(buffer);

    let stylesXml = await zip.file("word/styles.xml").async("string");

    const headingPatches = [
        { id: "Heading1", level: 0 },
        { id: "Heading2", level: 1 },
        { id: "Heading3", level: 2 },
    ];

    for (const { id, level } of headingPatches) {
        const regex = new RegExp(
            `(<w:style[^>]*w:styleId="${id}"[^>]*>)(.*?)(</w:style>)`,
            "gs"
        );
        stylesXml = stylesXml.replace(regex, (match, open, body, close) => {
            if (body.includes("w:outlineLvl")) return match;
            // Insert outlineLvl inside existing <w:pPr> or add new one
            if (body.includes("</w:pPr>")) {
                body = body.replace(
                    "</w:pPr>",
                    `<w:outlineLvl w:val="${level}"/></w:pPr>`
                );
            } else {
                body += `<w:pPr><w:outlineLvl w:val="${level}"/></w:pPr>`;
            }
            return open + body + close;
        });
    }

    zip.file("word/styles.xml", stylesXml);

    const patched = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });

    if (!fs.existsSync("./output")) fs.mkdirSync("./output");
    fs.writeFileSync("./output/module.docx", patched);
    console.log("DOCX generated successfully → output/module.docx");
}

generateDoc().catch(console.error);