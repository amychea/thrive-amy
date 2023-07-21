// Node.js file system module
const fs = require("fs");
const usersData = JSON.parse(fs.readFileSync("users.json"));
const companiesData = JSON.parse(fs.readFileSync("companies.json"));

// Sort company id by id number
function compareCompanyId(a, b) {
  return a.id - b.id;
}

// Compare last names for sorting users
function compareLastName(a, b) {
  const lastNameA = a.last_name.toLowerCase();
  const lastNameB = b.last_name.toLowerCase();

  if (lastNameA < lastNameB) {
    return -1;
  } else if (lastNameA > lastNameB) {
    return 1
  } else {
    return 0;
  }
}

// Filter users where active status is true
const activeUsers = usersData
  .filter((user) => user.active_status)
  .sort(compareLastName);

// Sort companies by company id
const sortedCompanies = companiesData.sort(compareCompanyId);
const outputData = sortedCompanies.map((company) => {
  // Filter users where user.company_id matches company id
  const usersInCompany = activeUsers.filter((user) => user.company_id === company.id);
  // If there are no users in the company, do not output company
  if (usersInCompany.length === 0) {
    return [];
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

  const companyInformation = `    Company Id: ${company.id}\n    Company Name: ${company.name}\n    Users Emailed: \n${emailedUsers}    Users Not Emailed: \n${notEmailedUsers}`;
  const totalTopUp = usersInCompany.reduce((sum, user) => sum + (user.tokens - (user.tokens - company.top_up)), 0,);
  return (companyInformation + `      Total amount of top ups for ${company.name}: ${totalTopUp}\n`);
});

function writeOutputToFile(outputData) {
  fs.writeFileSync("output.txt", outputData.join("\n"));
}

writeOutputToFile(outputData);
