// modules/current.js
// SHOWCASE MODULE — demonstrates every available block type
// Replace this file with your actual module content
// Run: node generate.js → output/module.docx

module.exports = (blocks, children) => {

    // ─── MODULE TITLE ───
    children.push(...blocks.createModuleTitle("Module X", "Block Components Showcase"));
    children.push(blocks.createSpacer());

    // ─── LEARNING OBJECTIVES ───
    children.push(...blocks.createLearningObjectives([
        "See every available block component in one document",
        "Understand which blocks use spread (...) vs plain push",
        "Use this as a reference when building new modules",
    ]));

    children.push(blocks.createSpacer());

    // ─── H1 HEADING ───
    children.push(blocks.createPartHeading("1. Text Blocks"));

    // ─── BODY TEXT ───
    children.push(blocks.createBody(
        "This is a body paragraph — createBody(). Use it for regular explanatory text. It renders in Arial 12pt with spacing after each paragraph."
    ));

    // ─── H2 HEADING ───
    children.push(blocks.createSubHeading("This is a Sub Heading — createSubHeading()"));
    children.push(blocks.createBody("Sub headings are blue and slightly smaller than part headings. Use them for subsections within a part."));

    // ─── H3 HEADING ───
    children.push(blocks.createMinorHeading("This is a Minor Heading — createMinorHeading()"));
    children.push(blocks.createBody("Minor headings are dark and smaller still. Use them for topics within a subsection."));

    children.push(blocks.createSpacer());

    // ─── LISTS ───
    children.push(blocks.createPartHeading("2. List Blocks"));

    children.push(blocks.createSubHeading("Bullet List — createBullet()"));
    children.push(blocks.createBullet("First bullet point"));
    children.push(blocks.createBullet("Second bullet point"));
    children.push(blocks.createBullet("Nested bullet — level 1", 1));
    children.push(blocks.createBullet("Nested bullet — level 1", 1));
    children.push(blocks.createBullet("Third bullet point"));

    children.push(blocks.createSubHeading("Numbered List — createNumbered()"));
    children.push(blocks.createNumbered("First step"));
    children.push(blocks.createNumbered("Second step"));
    children.push(blocks.createNumbered("Third step"));

    children.push(blocks.createSubHeading("Checklist — createChecklistItem()"));
    children.push(blocks.createChecklistItem("Completed item one"));
    children.push(blocks.createChecklistItem("Completed item two"));
    children.push(blocks.createChecklistItem("Completed item three"));

    children.push(blocks.createSpacer());

    // ─── CODE BLOCKS ───
    children.push(blocks.createPartHeading("3. Code Block — createCodeBlock()"));
    children.push(blocks.createBody("Code blocks use Courier New, gray background, and a blue left border. Each line is a separate paragraph internally."));

    children.push(blocks.createMinorHeading("Single line"));
    children.push(...blocks.createCodeBlock(`docker volume create my_data`));

    children.push(blocks.createMinorHeading("Multi-line command"));
    children.push(...blocks.createCodeBlock(
`docker run -d \\
  --name my_postgres \\
  -v my_data:/var/lib/postgresql/data \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:15`
    ));

    children.push(blocks.createMinorHeading("ASCII diagram"));
    children.push(...blocks.createCodeBlock(
`Client ──── Request ────► Server
Client ◄─── Response ─── Server`
    ));

    children.push(blocks.createMinorHeading("Multi-step flow"));
    children.push(...blocks.createCodeBlock(
`Home Network
     │
ISP Network
     │
Internet Backbone
     │
Google Network`
    ));

    children.push(blocks.createSpacer());

    // ─── INFO / WARNING BOXES ───
    children.push(blocks.createPartHeading("4. Callout Boxes"));

    children.push(blocks.createSubHeading("Info Box — createInfoBox()"));
    children.push(...blocks.createInfoBox(
        "💡 Pro Tip",
        "Always use named volumes in production. Anonymous volumes are harder to manage and track across container lifecycles."
    ));

    children.push(...blocks.createInfoBox(
        "📘 Key Concept",
        "The Internet is NOT one giant computer. It is a massive collection of interconnected devices — a network of networks."
    ));

    children.push(blocks.createSubHeading("Warning Box — createWarningBox()"));
    children.push(...blocks.createWarningBox(
        "⚠ Warning",
        "Never store sensitive data like passwords or API tokens inside a Docker image layer. Use environment variables or secrets managers instead."
    ));

    children.push(blocks.createSpacer());

    // ─── TABLES ───
    children.push(blocks.createPartHeading("5. Tables — createTable()"));
    children.push(blocks.createBody("Tables have a styled blue header row and alternating light blue/white rows. Column widths must sum to 9360 DXA (the full page width)."));

    children.push(blocks.createSubHeading("Two-column table"));
    children.push(blocks.createTable(
        ["Concept", "Description"],
        [
            ["Packet Switching", "Data split into packets, each routed independently"],
            ["Circuit Switching", "Dedicated path reserved for entire communication"],
            ["Client-Server", "Clients request services from a central server"],
            ["Peer-to-Peer", "Every node acts as both client and server"],
        ],
        [3120, 6240]
    ));

    children.push(blocks.createSpacer(100));

    children.push(blocks.createSubHeading("Three-column comparison table"));
    children.push(blocks.createTable(
        ["Feature", "Circuit Switching", "Packet Switching"],
        [
            ["Path", "Dedicated", "Shared"],
            ["Efficiency", "Low", "High"],
            ["Scalability", "Poor", "Excellent"],
            ["Used By", "Telephone Systems", "Internet"],
            ["Fault Tolerance", "None", "High"],
        ],
        [2800, 3280, 3280]
    ));

    children.push(blocks.createSpacer());

    // ─── SPACER ───
    children.push(blocks.createPartHeading("6. Spacer — createSpacer()"));
    children.push(blocks.createBody("Spacers add vertical whitespace between sections. Default is 200 DXA. Pass a number for custom spacing."));
    children.push(...blocks.createCodeBlock(
`children.push(blocks.createSpacer());       // default — 200
children.push(blocks.createSpacer(400));    // larger gap
children.push(blocks.createSpacer(80));     // tight gap`
    ));

    children.push(blocks.createSpacer());

    // ─── SUMMARY ───
    children.push(blocks.createSubHeading("Showcase Summary"));
    children.push(blocks.createChecklistItem("createModuleTitle — navy banner title block"));
    children.push(blocks.createChecklistItem("createLearningObjectives — objectives list with header"));
    children.push(blocks.createChecklistItem("createPartHeading — H1 navy section heading"));
    children.push(blocks.createChecklistItem("createSubHeading — H2 blue subsection heading"));
    children.push(blocks.createChecklistItem("createMinorHeading — H3 dark minor heading"));
    children.push(blocks.createChecklistItem("createBody — regular paragraph text"));
    children.push(blocks.createChecklistItem("createBullet — bullet list with optional nesting"));
    children.push(blocks.createChecklistItem("createNumbered — numbered list"));
    children.push(blocks.createChecklistItem("createChecklistItem — checkmark list"));
    children.push(blocks.createChecklistItem("createCodeBlock — monospace gray code block"));
    children.push(blocks.createChecklistItem("createInfoBox — blue callout box"));
    children.push(blocks.createChecklistItem("createWarningBox — red/yellow warning box"));
    children.push(blocks.createChecklistItem("createTable — styled table with header row"));
    children.push(blocks.createChecklistItem("createSpacer — vertical whitespace"));

    children.push(blocks.createSpacer());
    children.push(...blocks.createInfoBox(
        "📘 How to Use",
        "Replace this file with your module content. Every block shown here is available in framework/blocks.js. Refer to README.md for the full reference."
    ));

};