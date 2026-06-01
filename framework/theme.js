// framework/theme.js
// Colors extracted directly from Docker_Fundamentals_Module3.docx

module.exports = {
    colors: {
        // Heading colors (exact from docx styles.xml)
        h1: "1A3C5E",        // Deep navy
        h2: "2E75B6",        // Medium blue
        h3: "2C3E50",        // Dark slate

        // Box backgrounds
        codeBg: "F0F4F8",    // Code block background (most used - 275 times)
        infoBg: "F0F7FF",    // Info box light blue (63 times)
        warningBg: "FFF8E1", // Warning box yellow (3 times)
        successBg: "E8F5E9", // Success/tip box green

        // Table colors
        tableHeader: "2E75B6",   // Table header row fill
        tableRow: "EBF5FB",      // Table alternating row fill
        tableRowAlt: "FFFFFF",   // Table white row

        // Borders
        codeLeftBorder: "2E75B6", // Left border on code blocks
        tableBorder: "CCCCCC",

        // Text
        text: "222222",
        white: "FFFFFF",
    },

    fonts: {
        heading: "Arial",
        body: "Arial",
        code: "Courier New",   // Exact font used in Module 3 code blocks
    },

    sizes: {
        h1: 34,   // Half-points (17pt)
        h2: 26,   // 13pt
        h3: 22,   // 11pt
        body: 24, // 12pt
        code: 20, // 10pt
    },
};