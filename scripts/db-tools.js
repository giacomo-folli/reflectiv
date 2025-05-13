#!/usr/bin/env node

/**
 * Database management script for the Reflection Diary app
 * Provides utilities for inspecting and maintaining the SQLite database
 * 
 * Usage:
 * node scripts/db-tools.js info    - Show database info and counts
 * node scripts/db-tools.js export  - Export database data as JSON
 * node scripts/db-tools.js reset   - Reset the database (careful!)
 */

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Default data directory is one level up from scripts folder, in a data subdirectory
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');
const DB_PATH = path.join(DATA_DIR, 'reflection-diary.sqlite');

// Create the rl interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if database exists
function checkDatabase() {
  if (!fs.existsSync(DB_PATH)) {
    console.error(`Database file not found at: ${DB_PATH}`);
    console.error(`Make sure the application has been run at least once to create it.`);
    console.error(`DATA_DIR=${DATA_DIR}`);
    process.exit(1);
  }
  
  return new Database(DB_PATH);
}

// Show database information
function showInfo() {
  const db = checkDatabase();
  
  try {
    // Get table counts
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
    const sessionCount = db.prepare('SELECT COUNT(*) as count FROM sessions').get();
    const linkCount = db.prepare('SELECT COUNT(*) as count FROM links').get();
    
    console.log('Database Information:');
    console.log('---------------------');
    console.log(`Path: ${DB_PATH}`);
    console.log(`Size: ${(fs.statSync(DB_PATH).size / 1024).toFixed(2)} KB`);
    console.log('\nTable Counts:');
    console.log(`- Users: ${userCount.count}`);
    console.log(`- Sessions: ${sessionCount.count}`);
    console.log(`- Links: ${linkCount.count}`);
    
    // Show user emails for debugging
    const users = db.prepare('SELECT id, email, name FROM users').all();
    console.log('\nUsers:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) [ID: ${user.id}]`);
    });
    
    db.close();
    process.exit(0);
  } catch (error) {
    console.error('Error accessing database:', error.message);
    db.close();
    process.exit(1);
  }
}

// Export database data as JSON
function exportData() {
  const db = checkDatabase();
  
  try {
    const data = {
      users: db.prepare('SELECT id, email, name, createdAt FROM users').all(),
      sessions: db.prepare('SELECT * FROM sessions').all(),
      links: db.prepare('SELECT * FROM links').all()
    };
    
    const exportPath = path.join(process.cwd(), 'db-export.json');
    fs.writeFileSync(exportPath, JSON.stringify(data, null, 2));
    
    console.log(`Database exported to: ${exportPath}`);
    db.close();
    process.exit(0);
  } catch (error) {
    console.error('Error exporting database:', error.message);
    db.close();
    process.exit(1);
  }
}

// Reset the database
function resetDatabase() {
  rl.question('Are you sure you want to reset the database? This will delete all data. (y/N): ', (answer) => {
    if (answer.toLowerCase() !== 'y') {
      console.log('Database reset cancelled.');
      rl.close();
      process.exit(0);
    }
    
    if (fs.existsSync(DB_PATH)) {
      try {
        // Close any open connections
        try {
          const tempDb = new Database(DB_PATH);
          tempDb.close();
        } catch (e) {
          // Ignore errors on open/close attempt
        }
        
        // Remove the database file
        fs.unlinkSync(DB_PATH);
        console.log(`Database at ${DB_PATH} has been reset.`);
        console.log('The database will be recreated when the application starts next time.');
        rl.close();
        process.exit(0);
      } catch (error) {
        console.error('Error resetting database:', error.message);
        rl.close();
        process.exit(1);
      }
    } else {
      console.log('Database file does not exist. Nothing to reset.');
      rl.close();
      process.exit(0);
    }
  });
}

// Main function
function main() {
  const command = process.argv[2]?.toLowerCase();
  
  if (!command || command === 'help') {
    console.log('Database Management Tool for Reflection Diary');
    console.log('Usage:');
    console.log('  node scripts/db-tools.js info    - Show database info and counts');
    console.log('  node scripts/db-tools.js export  - Export database data as JSON');
    console.log('  node scripts/db-tools.js reset   - Reset the database (careful!)');
    process.exit(0);
  }
  
  // Show data directory location
  console.log(`Data directory: ${DATA_DIR}`);
  console.log(`Database path: ${DB_PATH}`);
  console.log();
  
  // Handle commands
  switch (command) {
    case 'info':
      showInfo();
      break;
    case 'export':
      exportData();
      break;
    case 'reset':
      resetDatabase();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.log('Use "help" to see available commands.');
      process.exit(1);
  }
}

// Run the script
main();