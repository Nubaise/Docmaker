// framework/blocks.js
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
            },
        },
    ],
};

// ─────────────────────────────────────────────
// TITLE
// ─────────────────────────────────────────────

function createModuleTitle(moduleNumber, title) {
    // Returns array — use children.push(...blocks.createModuleTitle(...))
    return [
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0 },
            shading: { type: ShadingType.CLEAR, fill: theme.colors.h1 },
            children: [
                new TextRun({
                    text: " ",
                    size: 16,
                    font: theme.fonts.heading,
                }),
            ],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0 },
            shading: { type: ShadingType.CLEAR, fill: theme.colors.h1 },
            children: [
                new TextRun({
                    text: moduleNumber,
                    bold: true,
                    size: 28,
                    font: theme.fonts.heading,
                    color: theme.colors.white,
                }),
            ],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0 },
            shading: { type: ShadingType.CLEAR, fill: theme.colors.h1 },
            children: [
                new TextRun({
                    text: title,
                    bold: true,
                    size: 40,
                    font: theme.fonts.heading,
                    color: theme.colors.white,
                }),
            ],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 400 },
            shading: { type: ShadingType.CLEAR, fill: theme.colors.h1 },
            children: [
                new TextRun({
                    text: " ",
                    size: 16,
                    font: theme.fonts.heading,
                }),
            ],
        }),
    ];
}

// ─────────────────────────────────────────────
// HEADINGS (return single Paragraph — safe to push directly)
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
// BODY & LISTS (single paragraph — safe to push directly)
// ─────────────────────────────────────────────

function createBody(text) {
    return new Paragraph({
        spacing: { after: 120 },
        children: [
            new TextRun({ text, size: theme.sizes.body, font: theme.fonts.body }),
        ],
    });
}

function createBullet(text, level = 0) {
    return new Paragraph({
        numbering: { reference: "bullets", level },
        children: [
            new TextRun({ text, size: theme.sizes.body, font: theme.fonts.body }),
        ],
    });
}

function createNumbered(text) {
    return new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
            new TextRun({ text, size: theme.sizes.body, font: theme.fonts.body }),
        ],
    });
}

function createChecklistItem(text) {
    return new Paragraph({
        numbering: { reference: "checklist", level: 0 },
        children: [
            new TextRun({ text, size: theme.sizes.body, font: theme.fonts.body }),
        ],
    });
}

function createSpacer(spacingAfter = 200) {
    return new Paragraph({
        spacing: { after: spacingAfter },
        children: [new TextRun("")],
    });
}

// ─────────────────────────────────────────────
// LEARNING OBJECTIVES (returns array)
// Usage: children.push(...blocks.createLearningObjectives([...]))
// ─────────────────────────────────────────────

function createLearningObjectives(items) {
    return [
        createSubHeading("Learning Objectives"),
        createBody("By the end of this module, you should be able to:"),
        ...items.map(item => createBullet(item)),
    ];
}

// ─────────────────────────────────────────────
// CODE BLOCK (returns array)
// Usage: children.push(...blocks.createCodeBlock(`...`))
// Each line = its own paragraph (required for proper DOCX rendering)
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
// INFO BOX — light blue (returns array)
// Usage: children.push(...blocks.createInfoBox("💡 Tip", "text..."))
// ─────────────────────────────────────────────

function createInfoBox(label, text) {
    return [
        new Paragraph({
            spacing: { before: 200, after: 0 },
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
        }),
        new Paragraph({
            spacing: { before: 0, after: 200 },
            shading: { type: ShadingType.CLEAR, fill: theme.colors.infoBg },
            children: [
                new TextRun({
                    text: "  " + text,
                    font: theme.fonts.body,
                    size: theme.sizes.body,
                    color: theme.colors.h1,
                }),
            ],
        }),
    ];
}

// ─────────────────────────────────────────────
// WARNING BOX — yellow (returns array)
// Usage: children.push(...blocks.createWarningBox("⚠ Warning", "text..."))
// ─────────────────────────────────────────────

function createWarningBox(label, text) {
    return [
        new Paragraph({
            spacing: { before: 200, after: 0 },
            shading: { type: ShadingType.CLEAR, fill: "C0392B" },
            children: [
                new TextRun({
                    text: "  " + label,
                    bold: true,
                    color: theme.colors.white,
                    font: theme.fonts.body,
                    size: 20,
                }),
            ],
        }),
        new Paragraph({
            spacing: { before: 0, after: 200 },
            shading: { type: ShadingType.CLEAR, fill: theme.colors.warningBg },
            children: [
                new TextRun({
                    text: "  " + text,
                    font: theme.fonts.body,
                    size: theme.sizes.body,
                    color: "7D6608",
                }),
            ],
        }),
    ];
}

// ─────────────────────────────────────────────
// TABLE (returns Table — push directly)
// Usage: children.push(blocks.createTable(headers, rows))
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
        top: border, bottom: border,
        left: border, right: border,
        insideHorizontal: border, insideVertical: border,
    };

    const headerRow = new TableRow({
        tableHeader: true,
        children: headers.map((h, i) =>
            new TableCell({
                width: { size: widths[i], type: WidthType.DXA },
                borders,
                shading: { type: ShadingType.CLEAR, fill: theme.colors.tableHeader },
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

    const dataRows = rows.map((row, ri) =>
        new TableRow({
            children: row.map((cell, ci) =>
                new TableCell({
                    width: { size: widths[ci], type: WidthType.DXA },
                    borders,
                    shading: {
                        type: ShadingType.CLEAR,
                        fill: ri % 2 === 0 ? theme.colors.tableRow : theme.colors.tableRowAlt,
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
// EXPORTS
// ─────────────────────────────────────────────

module.exports = {
    numberingConfig,
    stylesConfig,
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