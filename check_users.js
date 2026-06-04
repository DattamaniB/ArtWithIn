import fs from 'fs';
import bcrypt from 'bcryptjs';

const DB_PATH = './db.json';

function getDb() {
  if (!fs.existsSync(DB_PATH)) {
    console.error("Database file db.json not found. Run the server first to seed/create it.");
    process.exit(1);
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading db.json", e);
    process.exit(1);
  }
}

function saveDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log("Database successfully updated.");
  } catch (e) {
    console.error("Error writing to db.json", e);
    process.exit(1);
  }
}

function showUsage() {
  console.log(`
ArtWithin - Local Account Inspection Utility
-------------------------------------------
Usage:
  node check_users.js                       List all users in the local database
  node check_users.js reset <email> [pass]  Reset password of user to [pass] (defaults to password123)
`);
}

async function main() {
  const args = process.argv.slice(2);
  const db = getDb();

  if (args.length === 0) {
    console.log("\nArtWithin - Registered Accounts Ledger");
    console.log("======================================");
    
    db.users.forEach((user, index) => {
      console.log(`\n[User #${index + 1}]`);
      console.log(`ID:        ${user._id}`);
      console.log(`Name:      ${user.name}`);
      console.log(`Email:     ${user.email}`);
      console.log(`Role:      ${user.role}`);
      console.log(`Type:      ${user.userType || "undefined"}`);
      console.log(`Onboarded: ${user.onboarded ? "Yes" : "No"}`);
      
      const isSeeded = ["aarav@example.com", "meera@example.com", "info@pixelforge.com", "kabir@example.com"].includes(user.email);
      if (isSeeded) {
        console.log(`Password:  password123 (Seeded default)`);
      } else {
        console.log(`Password:  [Encrypted Hash: ${user.password.slice(0, 15)}...]`);
      }
    });

    console.log("\n* Note: Seeded accounts (Aarav, Meera, PixelForge, Kabir) use 'password123' by default.");
    console.log("To reset any password, run: node check_users.js reset <email> [newPassword]");
    return;
  }

  if (args[0] === 'reset') {
    const email = args[1];
    if (!email) {
      console.error("Error: Please provide the user's email.");
      showUsage();
      return;
    }

    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      console.error(`Error: User with email "${email}" not found.`);
      return;
    }

    const newPass = args[2] || "password123";
    console.log(`Hashing new password for ${user.name} (${user.email})...`);
    
    const hash = await bcrypt.hash(newPass, 10);
    user.password = hash;

    saveDb(db);
    console.log(`Success! Password for ${user.email} has been reset to: "${newPass}"`);
    return;
  }

  showUsage();
}

main().catch(console.error);
