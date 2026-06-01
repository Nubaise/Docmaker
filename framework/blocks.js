// framework/blocks.js
// All reusable document components styled to match Docker_Fundamentals_Module3.docx

const {
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    ShadingType,
    Table,
    TableRow,
    TableCell,
    WidthType,
    LevelFormat,
    VerticalAlign,
} = require("docx");

const theme = require("./theme");

// ─────────────────────────────────────────────
// NUMBERING CONFIG
// Export this and pass it into new Document({ numbering: ... })
// ─────────────────────────────────────────────
const numberingConfig = {
    config: [
        {
            reference: "bullets",
            levels: [
                {
                    level: 0,
                    format: LevelFormat.BULLET,
                    text: "•",
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 360 },
                            spacing: { after: 60 },
                        },
                    },
                },
                {
                    level: 1,
                    format: LevelFormat.BULLET,
                    text: "○",
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: {
                            indent: { left: 1080, hanging: 360 },
                            spacing: { after: 60 },
                        },
                    },
                },
            ],
        },
        {
            reference: "numbers",
            levels: [
                {
                    level: 0,
                    format: LevelFormat.DECIMAL,
                    text: "%1.",
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 360 },
                            spacing: { after: 60 },
                        },
                    },
                },
            ],
        },
        {
            reference: "checklist",
            levels: [
                {
                    level: 0,
                    format: LevelFormat.BULLET,
                    text: "✓",
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 360 },
                            spacing: { after: 60 },
                        },
                    },
                },
            ],
        },
    ],
};

// ─────────────────────────────────────────────
// STYLES CONFIG
// Pass into new Document({ styles: ... })
// ─────────────────────────────────────────────
const stylesConfig = {
    default: {
        document: {
            run: {
                font: theme.fonts.body,
                size: theme.sizes.body,
                color: theme.colors.text,
            },
        },
    },
    paragraphStyles: [
        {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                size: theme.sizes.h1,
                bold: true,
                font: theme.fonts.heading,
                color: theme.colors.h1,
            },
            paragraph: {
                spacing: { before: 360, after: 180 },
                outlineLevel: 0,
            },
        },
        {
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                size: theme.sizes.h2,
                bold: true,
                font: theme.fonts.heading,
                color: theme.colors.h2,
            },
            paragraph: {
                spacing: { before: 240, after: 120 },
                outlineLevel: 1,
            },
        },
        {
            id: "Heading3",
            name: "Heading 3",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                size: theme.sizes.h3,
                bold: true,
                font: theme.fonts.heading,
                color: theme.colors.h3,
            },
            paragraph: {
                spacing: { before: 180, after: 90 },
                outlineLevel: 2,
            },
        },
    ],
};

// ─────────────────────────────────────────────
// TITLE BLOCKS
// ─────────────────────────────────────────────

function createModuleTitle(moduleNumber, title) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 480 },
        shading: {
            type: ShadingType.CLEAR,
            fill: theme.colors.h1,
        },
        children: [
            new TextRun({
                text: moduleNumber,
                bold: true,
                size: 28,
                font: theme.fonts.heading,
                color: theme.colors.white,
            }),
            new TextRun({
                text: "  —  " + title,
                bold: true,
                size: 32,
                font: theme.fonts.heading,
                color: theme.colors.white,
            }),
        ],
    });
}

// ─────────────────────────────────────────────
// HEADING BLOCKS
// ─────────────────────────────────────────────

function createPartHeading(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text, font: theme.fonts.heading })],
    });
}

function createSubHeading(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text, font: theme.fonts.heading })],
    });
}

function createMinorHeading(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun({ text, font: theme.fonts.heading })],
    });
}

// ─────────────────────────────────────────────
// BODY TEXT
// ─────────────────────────────────────────────

function createBody(text) {
    return new Paragraph({
        spacing: { after: 120 },
        children: [
            new TextRun({
                text,
                size: theme.sizes.body,
                font: theme.fonts.body,
            }),
        ],
    });
}

// ─────────────────────────────────────────────
// LIST BLOCKS
// ─────────────────────────────────────────────

function createBullet(text, level = 0) {
    return new Paragraph({
        numbering: { reference: "bullets", level },
        children: [
            new TextRun({
                text,
                size: theme.sizes.body,
                font: theme.fonts.body,
            }),
        ],
    });
}

function createNumbered(text) {
    return new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
            new TextRun({
                text,
                size: theme.sizes.body,
                font: theme.fonts.body,
            }),
        ],
    });
}

function createChecklistItem(text) {
    return new Paragraph({
        numbering: { reference: "checklist", level: 0 },
        children: [
            new TextRun({
                text,
                size: theme.sizes.body,
                font: theme.fonts.body,
            }),
        ],
    });
}

// ─────────────────────────────────────────────
// LEARNING OBJECTIVES (returns array)
// Usage: createLearningObjectives([...]).forEach(x => children.push(x))
// ─────────────────────────────────────────────

function createLearningObjectives(items) {
    const out = [];
    out.push(createSubHeading("Learning Objectives"));
    out.push(
        createBody(
            "By the end of this module, you should be able to:"
        )
    );
    items.forEach(item => out.push(createBullet(item)));
    return out;
}

// ─────────────────────────────────────────────
// CODE BLOCK
// Exact style from Module 3: F0F4F8 bg, Courier New, blue left border
// ─────────────────────────────────────────────

function createCodeBlock(code) {
    const lines = code.trim().split("\n");
    return lines.map((line, i) =>
        new Paragraph({
            spacing: {
                before: i === 0 ? 160 : 0,
                after: i === lines.length - 1 ? 160 : 0,
                line: 276,
            },
            border: {
                left: {
                    color: theme.colors.codeLeftBorder,
                    size: 14,
                    style: BorderStyle.SINGLE,
                    space: 8,
                },
            },
            shading: {
                type: ShadingType.CLEAR,
                fill: theme.colors.codeBg,
            },
            children: [
                new TextRun({
                    text: line || " ",
                    font: theme.fonts.code,
                    size: theme.sizes.code,
                    color: "2C3E50",
                }),
            ],
        })
    );
}

// ─────────────────────────────────────────────
// INFO BOX (light blue)
// ─────────────────────────────────────────────

function createInfoBox(label, text) {
    const out = [];

    if (label) {
        out.push(
            new Paragraph({
                spacing: { before: 160, after: 0 },
                shading: { type: ShadingType.CLEAR, fill: theme.colors.h2 },
                children: [
                    new TextRun({
                        text: "  " + label,
                        bold: true,
                        color: theme.colors.white,
                        font: theme.fonts.body,
                        size: 20,
                    }),
                ],
            })
        );
    }

    out.push(
        new Paragraph({
            spacing: {
                before: label ? 0 : 160,
                after: 160,
            },
            shading: { type: ShadingType.CLEAR, fill: theme.colors.infoBg },
            children: [
                new TextRun({
                    text: "  " + text,
                    font: theme.fonts.body,
                    size: theme.sizes.body,
                    color: theme.colors.h1,
                }),
            ],
        })
    );

    return out;
}

// ─────────────────────────────────────────────
// WARNING BOX (yellow)
// ─────────────────────────────────────────────

function createWarningBox(label, text) {
    const out = [];

    if (label) {
        out.push(
            new Paragraph({
                spacing: { before: 160, after: 0 },
                shading: { type: ShadingType.CLEAR, fill: "E67E22" },
                children: [
                    new TextRun({
                        text: "  ⚠  " + label,
                        bold: true,
                        color: theme.colors.white,
                        font: theme.fonts.body,
                        size: 20,
                    }),
                ],
            })
        );
    }

    out.push(
        new Paragraph({
            spacing: {
                before: label ? 0 : 160,
                after: 160,
            },
            shading: { type: ShadingType.CLEAR, fill: theme.colors.warningBg },
            children: [
                new TextRun({
                    text: "  " + text,
                    font: theme.fonts.body,
                    size: theme.sizes.body,
                    color: "7D6608",
                }),
            ],
        })
    );

    return out;
}

// ─────────────────────────────────────────────
// TABLE
// headers: string[]        — column headers
// rows: string[][]         — data rows (array of arrays)
// colWidths: number[]      — optional DXA widths (must sum to 9360)
// ─────────────────────────────────────────────

function createTable(headers, rows, colWidths) {
    const totalWidth = 9360;
    const cols = headers.length;
    const defaultColWidth = Math.floor(totalWidth / cols);
    const widths = colWidths || Array(cols).fill(defaultColWidth);

    const border = {
        style: BorderStyle.SINGLE,
        size: 4,
        color: theme.colors.tableBorder,
    };
    const borders = {
        top: border,
        bottom: border,
        left: border,
        right: border,
        insideHorizontal: border,
        insideVertical: border,
    };

    // Header row
    const headerRow = new TableRow({
        tableHeader: true,
        children: headers.map((h, i) =>
            new TableCell({
                width: { size: widths[i], type: WidthType.DXA },
                borders,
                shading: {
                    type: ShadingType.CLEAR,
                    fill: theme.colors.tableHeader,
                },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                verticalAlign: VerticalAlign.CENTER,
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: h,
                                bold: true,
                                color: theme.colors.white,
                                font: theme.fonts.body,
                                size: theme.sizes.body,
                            }),
                        ],
                    }),
                ],
            })
        ),
    });

    // Data rows
    const dataRows = rows.map((row, ri) =>
        new TableRow({
            children: row.map((cell, ci) =>
                new TableCell({
                    width: { size: widths[ci], type: WidthType.DXA },
                    borders,
                    shading: {
                        type: ShadingType.CLEAR,
                        fill: ri % 2 === 0
                            ? theme.colors.tableRow
                            : theme.colors.tableRowAlt,
                    },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: cell,
                                    font: theme.fonts.body,
                                    size: theme.sizes.body,
                                }),
                            ],
                        }),
                    ],
                })
            ),
        })
    );

    return new Table({
        width: { size: totalWidth, type: WidthType.DXA },
        columnWidths: widths,
        rows: [headerRow, ...dataRows],
    });
}

// ─────────────────────────────────────────────
// SPACER
// ─────────────────────────────────────────────

function createSpacer(spacingAfter = 200) {
    return new Paragraph({
        spacing: { after: spacingAfter },
        children: [new TextRun("")],
    });
}

// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────

module.exports = {
    // Config objects (pass to Document constructor)
    numberingConfig,
    stylesConfig,

    // Blocks
    createModuleTitle,
    createPartHeading,
    createSubHeading,
    createMinorHeading,
    createBody,
    createBullet,
    createNumbered,
    createChecklistItem,
    createLearningObjectives,
    createCodeBlock,
    createInfoBox,
    createWarningBox,
    createTable,
    createSpacer,
};