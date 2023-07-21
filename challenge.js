// Node.js file system module
const fs = require("fs");

// Add error handling for JSON
function readJSONFile(filename) {
  try {
    const rawData = fs.readFileSync(filename);
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading or parsing JSON file "${filename}":`, error.message);
    throw new Error(error.message);
  }
}

// Compare last names for sorting users
function compareLastName(a, b) {
  const lastNameA = a.last_name.toLowerCase();
  const lastNameB = b.last_name.toLowerCase();
  return lastNameA.localeCompare(lastNameB);
}

function processCompanyData(usersData, companiesData) {
  // Filter users where active status is true
  const activeUsers = usersData.filter((user) => user.active_status);
  // Sort company data by id 
  const sortedCompanies = companiesData.sort((a, b) => a.id - b.id);
  const outputData = sortedCompanies.map((company) => {
    // Filter users where users company id matches company id
    const usersInCompany = activeUsers.filter((user) => user.company_id === company.id);
    
    // For companies with no active users
    if (usersInCompany.length === 0) {
      return null;
    }

    let emailedUsers = "";
    let notEmailedUsers = "";

    for (const user of usersInCompany) {
      // Calculate token balance by adding users current token and the company top up value
      const newTokenBalance = company.top_up + user.tokens;
      const userInfo = `      ${user.last_name}, ${user.first_name}, ${user.email}\n        Previous Token Balance: ${user.tokens}\n        New Token Balance: ${newTokenBalance}\n`;
      
      // User email status and company email status is true
      if (user.email_status && company.email_status) {
        // Add userInfo to the emailed users section
        emailedUsers += userInfo;
      } else {
        // Add userInfo to the not emailed users section
        notEmailedUsers += userInfo;
      }
    }

    const totalTopUp = usersInCompany.reduce((sum, user) => sum + (user.tokens - (user.tokens - company.top_up)), 0,);
    const companyInformation = `    Company Id: ${company.id}\n    Company Name: ${company.name}\n    Users Emailed: \n${emailedUsers}    Users Not Emailed: \n${notEmailedUsers}`;
    return (companyInformation + `      Total amount of top ups for ${company.name}: ${totalTopUp}\n`);
  });

  return outputData;
}

function writeOutputToFile(outputData) {
  try {
    fs.writeFileSync("output.txt", outputData.join("\n"));
    console.log("Output written to 'output.txt'.");
  } catch (error) {
    console.error("Error writing output to 'output.txt':", error.message);
  }
}

try {
  const usersData = readJSONFile("users.json");
  const companiesData = readJSONFile("companies.json");

  // if usersData or companiesData is falsy throw an error
  if (!usersData || !companiesData) {
    throw new Error("Failed to read or parse JSON files.");
  }

  const outputData = processCompanyData(usersData, companiesData);
  writeOutputToFile(outputData);
} catch (error) {
  console.error("An error occurred:", error.message);
}
