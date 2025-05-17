#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper function to determine the number of parent directories
function countParentDirectories(importPath) {
  const segments = importPath.split('/');
  let count = 0;
  
  for (const segment of segments) {
    if (segment === '..') {
      count++;
    } else {
      break;
    }
  }
  
  return count;
}

// Convert relative path to absolute path using @ alias
function convertToAliasPath(filePath, importPath) {
  // Skip if it's already using aliases or local imports
  if (importPath.startsWith('@/') || importPath.startsWith('./')) {
    return importPath;
  }
  
  // Only process parent directory imports
  if (!importPath.startsWith('../')) {
    return importPath;
  }
  
  // Get the current file's directory
  const dir = path.dirname(filePath);
  
  // Resolve the absolute path of the import
  const absoluteImportPath = path.resolve(dir, importPath);
  
  // Get the path relative to the src directory
  const srcPath = path.resolve(process.cwd(), 'src');
  const relativeSrcPath = path.relative(srcPath, absoluteImportPath);
  
  // Return the alias path
  return `@/${relativeSrcPath}`;
}

// Process a single file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find import statements using regex
  const importRegex = /from\s+["']([^"']+)["']/g;
  let match;
  let modifiedContent = content;
  let modified = false;

  // Replace all imports
  while ((match = importRegex.exec(content)) !== null) {
    const originalImport = match[1];
    const newImport = convertToAliasPath(filePath, originalImport);
    
    if (originalImport !== newImport) {
      modifiedContent = modifiedContent.replace(
        `from '${originalImport}'`, 
        `from '${newImport}'`
      );
      modifiedContent = modifiedContent.replace(
        `from "${originalImport}"`, 
        `from "${newImport}"`
      );
      modified = true;
    }
  }
  
  // Write back the file if modified
  if (modified) {
    fs.writeFileSync(filePath, modifiedContent, 'utf8');
    console.log(`Updated imports in ${filePath}`);
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
      processFile(fullPath);
    }
  }
}

// Start processing from the src directory
const srcDir = path.join(process.cwd(), 'src');
processDirectory(srcDir);
console.log('Import paths updated successfully!'); 