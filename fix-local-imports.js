#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Process a single file to ensure proper local imports
function processLocalImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const directory = path.dirname(filePath);
  
  // Get all files in the same directory
  const dirFiles = fs.readdirSync(directory)
    .filter(f => !fs.statSync(path.join(directory, f)).isDirectory())
    .map(f => path.parse(f).name);
  
  // Find bare imports (without ./)
  const importRegex = /from\s+["']([^@./][^"']+)["']/g;
  let match;
  let modifiedContent = content;
  let modified = false;

  while ((match = importRegex.exec(content)) !== null) {
    const importName = match[1];
    
    // Skip node modules and known packages
    if (
      importName === 'react' || 
      importName === 'react-dom' || 
      importName.startsWith('next') ||
      importName.includes('/') // Skip imports with paths
    ) {
      continue;
    }
    
    // Check if this is a local file
    const importBasename = importName.split('/')[0];
    if (dirFiles.includes(importBasename) || 
        dirFiles.includes(`${importBasename}.ts`) || 
        dirFiles.includes(`${importBasename}.tsx`)) {
      
      // Replace with ./ prefix
      const newImport = `./${importName}`;
      modifiedContent = modifiedContent.replace(
        `from '${importName}'`, 
        `from '${newImport}'`
      );
      modifiedContent = modifiedContent.replace(
        `from "${importName}"`, 
        `from "${newImport}"`
      );
      modified = true;
    }
  }
  
  // Write back the file if modified
  if (modified) {
    fs.writeFileSync(filePath, modifiedContent, 'utf8');
    console.log(`Updated local imports in ${filePath}`);
  }
}

// Process a directory recursively
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and hidden directories
      if (entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
        processDirectory(fullPath);
      }
    } else if (
      entry.isFile() && 
      (fullPath.endsWith('.ts') || 
       fullPath.endsWith('.tsx') || 
       fullPath.endsWith('.js') || 
       fullPath.endsWith('.jsx'))
    ) {
      processLocalImports(fullPath);
    }
  }
}

// Start processing from the src directory
const srcDir = path.join(process.cwd(), 'src');
processDirectory(srcDir);
console.log('Local imports updated successfully!'); 