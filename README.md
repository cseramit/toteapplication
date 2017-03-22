#tote-application
Sample Tote Application demonstrating the algorithm used for calculating dividends, angular js concepts and basic node server setup.

Bet Type - Only valid values are P ( Place ) and W ( Win )
Bet Amount - Any Numeric Value up to 8 digits ( 2 decimal places)
Horse Number - Up to 2 Digits Allowed.

Place Bet - Button to Place the bet. Will be enabled only once 1,2 and 3 are completed.


Results - All three fields are mandatory and accept 2 digit numbers.
Finalize Bet - Will be enabled only when there is at least one bet and Results are input.


How to install and run
1. Clone the repository from master branch.
2. In the current directory, run 'npm install'
3. Execute 'node app'. This will initiate the server which is listening on port no. 3000 on localhost.
4. Access the application at http://localhost:3000/#/ via browser.



Product Backlog
Feature 1.  - Added usage of directive for results and inputs if possible.
Feature 2.  - Write an API in node to calculate dividends and expose it via http call for Angular to consume.
Feature 3.  - Use forms and ng-messages to display appropriate error messages.
Feature 4.  - Ensure appropriate errors when the number of horses and bets don't match.
Feature 5.  - Generalize the behaviour by providing a config page.
Feature 6.  - Use MongoDB to store the Bets and Results. Demonstrating the MEAN Stack.
Feature 7.  - Provide a separate page to view Bet History.
Feature 8.  - Make the package production ready.
Feature 9.  - AWS Capability.
Feature 10. - UI Upgrade


Release/1.0 Backlog
Feature 1. - Added usage of directive for results.
Feature 2. - Move business logic to node server instead of calculating bets logic on UI. Usage of $http/$resource service.


Release/2.0 Backlog
Feature 3.  - Use forms and ng-messages to display appropriate error messages.
Feature 4.  - Ensure appropriate errors when the number of horses and bets don't match.
