/**
 * Message Formatter - Parse and format AI responses with markdown-like support
 */

export const formatMessage = (text) => {
  // Parse script format
  if (text.toLowerCase().includes("title:") && text.toLowerCase().includes("characters:")) {
    return { type: "script", content: parseScript(text) };
  }

  // Parse bullet points and formatting
  return { type: "text", content: parseTextContent(text) };
};

// Parse script-like format
const parseScript = (text) => {
  const sections = {
    title: "",
    characters: [],
    scene: "",
    dialogues: [],
  };

  const lines = text.split("\n");
  let currentSection = null;
  let currentContent = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().startsWith("title:")) {
      if (currentSection) sections[currentSection] = currentContent.trim();
      sections.title = trimmed.substring(6).trim();
      currentSection = null;
    } else if (trimmed.toLowerCase().startsWith("characters:")) {
      if (currentSection) sections[currentSection] = currentContent.trim();
      currentSection = "characters";
      currentContent = "";
    } else if (trimmed.toLowerCase().startsWith("scene:")) {
      if (currentSection) sections[currentSection] = currentContent.trim();
      sections.characters = sections.characters
        ? sections.characters.split(",").map((c) => c.trim())
        : [];
      currentSection = "scene";
      currentContent = "";
    } else if (trimmed.toLowerCase().startsWith("dialogues:")) {
      if (currentSection === "scene") sections.scene = currentContent.trim();
      currentSection = "dialogues";
      currentContent = "";
    } else if (currentSection) {
      currentContent += (currentContent ? "\n" : "") + line;
    }
  }

  if (currentSection) {
    if (currentSection === "characters") {
      sections.characters = currentContent
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c);
    } else if (currentSection === "scene") {
      sections.scene = currentContent.trim();
    } else if (currentSection === "dialogues") {
      sections.dialogues = currentContent
        .split("\n")
        .map((d) => d.trim())
        .filter((d) => d);
    }
  }

  return sections;
};

// Parse text content with formatting
const parseTextContent = (text) => {
  const elements = [];
  const lines = text.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      elements.push({ type: "paragraph", content: "" });
      continue;
    }

    if (trimmed.startsWith("##")) {
      elements.push({ type: "heading", level: 2, content: trimmed.substring(2).trim() });
    } else if (trimmed.startsWith("#")) {
      elements.push({ type: "heading", level: 1, content: trimmed.substring(1).trim() });
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push({ type: "bullet", content: trimmed.substring(2).trim() });
    } else if (trimmed.startsWith("1.") || /^\d+\./.test(trimmed)) {
      const match = trimmed.match(/^\d+\.\s*(.*)/);
      elements.push({ type: "numbered", content: match ? match[1] : trimmed });
    } else {
      elements.push({ type: "paragraph", content: trimmed });
    }
  }

  return elements;
};
