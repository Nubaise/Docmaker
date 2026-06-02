# Docmaker

A Node.js DOCX generator for creating beautifully styled educational module documents. Feed it raw content, run one command, get a fully styled Word document.

---

## Two Ways to Use This

### 1. Setting Up from Scratch

Follow the [Setup](#setup) section to clone and run the project locally.

### 2. Just Generate a `current.js`

If someone already has this project running and wants to generate a new module, skip to the [Block Components Reference](#block-components-reference) and [Typical Structure](#typical-currentjs-structure) sections — everything needed to write a perfect `current.js` is there.

---

## Setup

### Prerequisites

- Node.js >= 18
- npm

### Install

```
git clone https://github.com/Nubaise/Docmaker.git
cd Docmaker
npm install
```

### Run

```
node generate.js
```

Output: `output/module.docx`

---

## Project Structure

```
Docmaker/
│
├── generate.js          # Entry point — builds and outputs the DOCX (never edit this)
│
├── framework/
│   ├── blocks.js        # All reusable document components
│   └── theme.js         # All colors, fonts, sizes — single source of truth
│
├── modules/
│   └── current.js       # The module content — THIS IS THE ONLY FILE YOU CHANGE
│
├── output/
│   └── module.docx      # Generated output (gitignored)
│
├── package.json
└── README.md
```

---

## Workflow

1. Write (or generate) `modules/current.js` with your module content
2. Run `node generate.js`
3. Open `output/module.docx` in Word

**Only `modules/current.js` changes. Everything else is frozen.**

---

## Block Components Reference

All blocks live in `framework/blocks.js`. They are passed into `current.js` automatically via the `blocks` argument.

### ⚠️ Critical Rule — Spread vs Push

Some blocks return **arrays** and require the spread operator `...`
Some blocks return a **single element** and use plain `push`

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

### Module Title — navy banner

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

### Headings

```js
children.push(blocks.createPartHeading("1. Main Section")); // H1 — navy, large
children.push(blocks.createSubHeading("Subsection Title")); // H2 — blue
children.push(blocks.createMinorHeading("Minor Topic")); // H3 — dark, smaller
```

### Body Text

```js
children.push(blocks.createBody("This is a paragraph of body text."));
```

### Bullet List

```js
children.push(blocks.createBullet("First point"));
children.push(blocks.createBullet("Nested point", 1)); // level 1 = indented
```

### Numbered List

```js
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

### Code Block — gray bg + blue left border + Courier New

```js
children.push(
  ...blocks.createCodeBlock(
    `docker run -d \\
  --name my_container \\
  nginx`,
  ),
);
```

### Info Box — blue header + light blue body

```js
children.push(
  ...blocks.createInfoBox(
    "💡 Pro Tip",
    "Always use named volumes in production.",
  ),
);
```

### Warning Box — red header + yellow body

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
    [3120, 3120, 3120], // col widths — must sum to 9360
  ),
);
```

### Spacer

```js
children.push(blocks.createSpacer()); // default 200
children.push(blocks.createSpacer(400)); // larger gap
```

---

## Typical `current.js` Structure

Every module follows this pattern:

```js
module.exports = (blocks, children) => {

    // 1. Title
    children.push(...blocks.createModuleTitle("Module N", "Title"));
    children.push(blocks.createSpacer());

    // 2. Learning Objectives
    children.push(...blocks.createLearningObjectives([...]));
    children.push(blocks.createSpacer());

    // 3. Parts — repeat for each section
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

    // 7. Up Next
    children.push(...blocks.createInfoBox("📘 Up Next", "Module N+1 — ..."));
};
```

---

## Theme

Edit `framework/theme.js` to change the look globally.

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

## Adding New Block Types

1. Add the function to `framework/blocks.js`
2. Export it at the bottom
3. Use it in `modules/current.js`

If the function returns multiple paragraphs → return an **array**, use `...spread` when calling.
If it returns one element → return directly, use plain `push`.

---

## Dependencies

| Package       | Purpose                                       |
| ------------- | --------------------------------------------- |
| `docx@^9.7.1` | DOCX generation                               |
| `jszip@^3.x`  | XML patching for Word navigation pane support |

---

## Example

See `modules/current.js` in the repo — it's a full showcase of every block component rendered in one document.
