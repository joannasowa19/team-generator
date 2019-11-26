const Manager = require("./Manager");
// need to add other positions too - engineer, intern
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const teamMembers = [];
const idArray = [];

function appMenu() {
  // manager
  function createManager() {
    inquirer
      .prompt([
        /* prompt choices here */
        {
          type: "input",
          name: "managerName",
          message: "What is your manager's name?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        },
        {
          type: "input",
          name: "managerId",
          message: "What is your manager's id?",
          validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is your manager's email?",
          validate: answer => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is your manager's office number?",
          validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          }
        }
      ])
      .then(answers => {
        /* build manager */
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        buildTeam();
        createTeam();
      });
  }
  // engineer
  function createEngineer() {
    inquirer
      .prompt([
        /* prompt choices here */
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's id?",
          validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email?",
          validate: answer => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "engineerOfficeNumber",
          message: "What is your engineer's office number?",
          validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          }
        }
      ])
      .then(answers => {
        /* build engineer */
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerOfficeNumber
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        buildTeam();
        createTeam();
      });
  }
  // intern
  function createIntern() {
    inquirer
      .prompt([
        /* prompt choices here */
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern's id?",
          validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
          validate: answer => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "internOfficeNumber",
          message: "What is your intern's office number?",
          validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          }
        }
      ])
      .then(answers => {
        /* build intern */
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internOfficeNumber
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        buildTeam();
        createTeam();
      });
  }

  // create Team
  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members"
          ]
        }
      ])
      .then(userChoice => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function buildTeam() {
    let htmlString = "";
    let headHTML = ``;
    const htmlFile = `<html>${teamMembers[0].name}</html>`;
    let footerHTML = ``;
    htmlString = headHTML + footerHTML;
    fs.writeFileSync("team.html", htmlString, "utf-8");
  }
  createManager();
  createEngineer();
  createIntern();
}
appMenu();
