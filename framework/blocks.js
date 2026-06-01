const {
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
} = require("docx");

function createModuleTitle(moduleNumber, title) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: {
            before: 200,
            after: 400,
        },
        children: [
            new TextRun({
                text: moduleNumber,
                bold: true,
                size: 32,
            }),
            new TextRun({
                text: "\n" + title,
                bold: true,
                size: 44,
            }),
        ],
    });
}

function createLearningObjectives(objectives) {

    const elements = [];

    elements.push(
        new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: {
                before: 200,
                after: 150,
            },
            children: [
                new TextRun({
                    text: "Learning Objectives",
                    bold: true,
                }),
            ],
        })
    );

    objectives.forEach(item => {
        elements.push(
            new Paragraph({
                bullet: {
                    level: 0,
                },
                children: [
                    new TextRun(item),
                ],
            })
        );
    });

    return elements;
}

function createPartHeading(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: {
            before: 300,
            after: 150,
        },
        children: [
            new TextRun({
                text,
                bold: true,
            }),
        ],
    });
}

function createSubHeading(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: {
            before: 200,
            after: 100,
        },
        children: [
            new TextRun({
                text,
                bold: true,
            }),
        ],
    });
}

function createBody(text) {
    return new Paragraph({
        spacing: {
            after: 120,
        },
        children: [
            new TextRun({
                text,
                size: 24,
            }),
        ],
    });
}

function createBullet(text) {
    return new Paragraph({
        bullet: {
            level: 0,
        },
        spacing: {
            after: 50,
        },
        children: [
            new TextRun({
                text,
                size: 24,
            }),
        ],
    });
}

module.exports = {
    createModuleTitle,
    createLearningObjectives,
    createPartHeading,
    createSubHeading,
    createBody,
    createBullet,
};