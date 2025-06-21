const detectMentions = (text) => {
    const mentionRegex = /@(\w+)/g;
    const matches = text.match(mentionRegex);
    
    if (!matches) return [];
    
    // Extract usernames without @ and remove duplicates
    const usernames = [...new Set(matches.map(match => match.substring(1).toLowerCase()))];
    return usernames;
  };
  
  module.exports = { detectMentions };