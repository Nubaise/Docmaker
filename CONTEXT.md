# Docmaker — LLM Prompt Guide

How to prompt an LLM to generate `current.js` files for this project.

---

## First Message (One-Time Setup)

Paste this at the start of every new conversation, with the README attached or pasted inline:

```
I have a Node.js DOCX generator project called Docmaker. Here is the README which
explains everything about the project structure, available block components, and
how current.js works:

[paste README here]

Your only job is to generate modules/current.js files from content I give you. Rules:
- Only output the current.js file, nothing else
- Follow the spread vs push rules strictly as documented
- You have full design freedom — choose which blocks to use, where to add tables,
  code blocks, info boxes, warning boxes, spacers etc. based on what best presents
  the content
- Structure the document logically with good visual hierarchy
- Do not ask clarifying questions, just generate
```

---

## Every Follow-Up Message

```
Generate current.js for this content:

[paste raw content]
```

That's it.

---

## What "Design Freedom" Means

You don't need to tell the LLM how to format things. It will decide:

| Content Type            | Likely Block Used                     |
| ----------------------- | ------------------------------------- |
| Comparisons             | `createTable`                         |
| Step-by-step processes  | `createNumbered` or `createCodeBlock` |
| Key tips or context     | `createInfoBox`                       |
| Critical warnings       | `createWarningBox`                    |
| Self-assessment items   | `createChecklistItem`                 |
| Code or syntax examples | `createCodeBlock`                     |
| Plain explanations      | `createBody`                          |
| Lists of points         | `createBullet`                        |

---

## Notes

- The first message only needs to be sent **once per conversation**
- If starting a new chat, send the setup message again with the README
- Raw content can be rough notes, plain text, or structured markdown — the LLM handles formatting
- Column widths in `createTable` must sum to **9360**
