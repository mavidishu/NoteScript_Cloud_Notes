// Just to import context api

const { createContext } = require("react");

// Creating new context used to hold state related to notes
const NoteContext = createContext();

export default NoteContext;