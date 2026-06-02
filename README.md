# Docmaker

A Node.js DOCX generator for creating beautifully styled educational module documents. You feed it raw module content as a JS file, run one command, and get a fully styled Word document.

---

## Project Structure

```
Docmaker/
│
├── generate.js          # Entry point — builds and outputs the DOCX
│
├── framework/
│   ├── blocks.js        # All reusable document components (heading, code block, table, etc.)
│   └── theme.js         # All colors, fonts, and sizes — single source of truth
│
├── modules/
│   └── current.js       # The module content to generate — THIS IS THE ONLY FILE YOU CHANGE
│
├── output/
│   └── module.docx      # Generated output (gitignored)
│
├── package.json
└── README.md
```

---

## How It Works

1. You write (or generate) `modules/current.js` with the module content
2. Run `node generate.js`
3. `output/module.docx` is created with full styling

```
node generate.js
→ output/module.docx
```

---

## The Only File You Ever Change

### `modules/current.js`

This file exports a single function that receives `blocks` and `children`:

```js
module.exports = (blocks, children) => {
  children.push(
    ...blocks.createModuleTitle("Module 0", "Networking Fundamentals"),
  );
  children.push(blocks.createPartHeading("1. What is a Network?"));
  children.push(blocks.createBody("A network is..."));
  // ... and so on
};
```

---

## Block Components Reference

All blocks live in `framework/blocks.js`. Import is handled automatically.

### ⚠️ Critical Rule

Some blocks return **arrays** and need the spread operator `...`
Some blocks return a **single paragraph** and use plain `push`

| Block                                            | Returns | Usage                                                      |
| ------------------------------------------------ | ------- | ---------------------------------------------------------- |
| `createModuleTitle(moduleNumber, title)`         | array   | `children.push(...blocks.createModuleTitle(...))`          |
| `createLearningObjectives(items[])`              | array   | `children.push(...blocks.createLearningObjectives([...]))` |
| `createCodeBlock(code)`                          | array   | `children.push(...blocks.createCodeBlock(...))`            |
| `createInfoBox(label, text)`                     | array   | `children.push(...blocks.createInfoBox(...))`              |
| `createWarningBox(label, text)`                  | array   | `children.push(...blocks.createWarningBox(...))`           |
| `createPartHeading(text)`                        | single  | `children.push(blocks.createPartHeading(...))`             |
| `createSubHeading(text)`                         | single  | `children.push(blocks.createSubHeading(...))`              |
| `createMinorHeading(text)`                       | single  | `children.push(blocks.createMinorHeading(...))`            |
| `createBody(text)`                               | single  | `children.push(blocks.createBody(...))`                    |
| `createBullet(text, level?)`                     | single  | `children.push(blocks.createBullet(...))`                  |
| `createNumbered(text)`                           | single  | `children.push(blocks.createNumbered(...))`                |
| `createChecklistItem(text)`                      | single  | `children.push(blocks.createChecklistItem(...))`           |
| `createTable(headers[], rows[][], colWidths[]?)` | single  | `children.push(blocks.createTable(...))`                   |
| `createSpacer(spacingAfter?)`                    | single  | `children.push(blocks.createSpacer())`                     |

---

## Block Usage Examples

### Module Title (navy banner)

```js
children.push(
  ...blocks.createModuleTitle("Module 3", "Docker Volumes & Networking"),
);
```

### Learning Objectives

```js
children.push(
  ...blocks.createLearningObjectives([
    "Understand what Docker volumes are",
    "Create and manage named volumes",
  ]),
);
```

### Headings (H1 → H2 → H3)

```js
children.push(blocks.createPartHeading("1. Main Section")); // H1 — navy, large
children.push(blocks.createSubHeading("Subsection Title")); // H2 — blue
children.push(blocks.createMinorHeading("Minor Topic")); // H3 — dark, smaller
```

### Body Text

```js
children.push(blocks.createBody("This is a paragraph of body text."));
```

### Bullets and Numbered Lists

```js
children.push(blocks.createBullet("First point"));
children.push(blocks.createBullet("Nested point", 1)); // level 1 = indented
children.push(blocks.createNumbered("Step one"));
children.push(blocks.createNumbered("Step two"));
```

### Checklist

```js
children.push(blocks.createChecklistItem("I understand packet switching"));
children.push(
  blocks.createChecklistItem("I can explain client-server architecture"),
);
```

### Code Block (gray bg + blue left border + Courier New)

```js
children.push(
  ...blocks.createCodeBlock(
    `docker run -d \\
  --name my_container \\
  nginx`,
  ),
);
```

### Info Box (blue header + light blue body)

```js
children.push(
  ...blocks.createInfoBox(
    "💡 Pro Tip",
    "Always use named volumes in production.",
  ),
);
```

### Warning Box (red header + yellow body)

```js
children.push(
  ...blocks.createWarningBox(
    "⚠ Warning",
    "Never store secrets in a Docker image layer.",
  ),
);
```

### Table

```js
children.push(
  blocks.createTable(
    ["Feature", "Option A", "Option B"], // headers
    [
      ["Speed", "Fast", "Slow"], // rows
      ["Cost", "High", "Low"],
    ],
    [3120, 3120, 3120], // optional col widths (must sum to 9360)
  ),
);
```

### Spacer

```js
children.push(blocks.createSpacer()); // default 200
children.push(blocks.createSpacer(400)); // larger gap
```

---

## Theme

All colors and fonts are in `framework/theme.js`. Edit here to change the look globally.

```js
colors: {
    h1: "1A3C5E",          // Deep navy  — Part headings
    h2: "2E75B6",          // Medium blue — Sub headings
    h3: "2C3E50",          // Dark slate  — Minor headings
    codeBg: "F0F4F8",      // Code block background
    infoBg: "F0F7FF",      // Info box background
    warningBg: "FFF8E1",   // Warning box background
    tableHeader: "2E75B6", // Table header row
    tableRow: "EBF5FB",    // Table alternating row
}

fonts: {
    heading: "Arial",
    body: "Arial",
    code: "Courier New",
}
```

---

## Dependencies

```json
{
  "docx": "^9.7.1", // DOCX generation
  "jszip": "^3.x" // XML patching for Word navigation pane
}
```

Install:

```
npm install
```

---

## How to Add a New Feature to blocks.js

If you need a new block type (e.g. `createNoteBox`, `createDiagram`, `createCoverPage`):

1. Add the function to `framework/blocks.js`
2. Export it at the bottom of the file
3. Use it in `modules/current.js`

If the function returns multiple paragraphs, return an **array** and document it as requiring `...spread`.
If it returns a single element, return it directly.

---

## Typical current.js Structure

Every module follows this pattern:

```js
module.exports = (blocks, children) => {

    // 1. Title
    children.push(...blocks.createModuleTitle("Module N", "Title"));
    children.push(blocks.createSpacer());

    // 2. Learning Objectives
    children.push(...blocks.createLearningObjectives([...]));
    children.push(blocks.createSpacer());

    // 3. Parts (repeat for each section)
    children.push(blocks.createPartHeading("1. Section Name"));
    children.push(blocks.createBody("..."));
    children.push(blocks.createSubHeading("Subsection"));
    children.push(blocks.createBullet("..."));
    children.push(...blocks.createCodeBlock(`...`));
    children.push(...blocks.createInfoBox("💡 Tip", "..."));
    children.push(...blocks.createWarningBox("⚠ Warning", "..."));
    children.push(blocks.createTable(headers, rows));
    children.push(blocks.createSpacer());

    // 4. Interview Questions
    children.push(blocks.createSubHeading("Interview Questions"));
    children.push(blocks.createMinorHeading("Easy"));
    children.push(blocks.createBullet("..."));

    // 5. Assignment
    children.push(blocks.createSubHeading("Assignment"));
    children.push(blocks.createNumbered("..."));

    // 6. Summary Checklist
    children.push(blocks.createSubHeading("Module N Summary"));
    children.push(blocks.createChecklistItem("..."));

    // 7. Up Next box
    children.push(...blocks.createInfoBox("📘 Up Next", "Module N+1 — ..."));
};
```

---

## Git History

```
fix: resolve array nesting bug in multi-paragraph block components
feat: wire numbering config, styles, and US Letter page size to document
feat: add tables, code blocks, info/warning boxes, checklists, numbered lists
feat: sync theme colors with Docker Module 3 reference doc
feat: implement core document block components
feat: add centralized document theme configuration
feat: create initial document generator structure
chore: initialize Node.js project with docx dependency
```
