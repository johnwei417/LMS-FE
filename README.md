# Learning Management System
Learning Management System (LMS) that will store multimedia “modules” and present them to students for studying. The materials for students over the topics the modules cover as well as students' results are all stored in a local database in real-time. The local database will periodically update and pull from a statewide database, but it is important that these databases are kept separate for security reasons. Students’ results can be viewed by a teacher, parents, or system admin (with increasing scope given to higher permission ranks) in real-time. It will be possible for teachers to launch a remedial “intervention” module for any number of struggling students at the instructor's own discretion. The ultimate goal of this system will be to estimate and improve student’s projected standardized test scores throughout a whole state.

Authors: Chee Kong Wong, Hong Lin Wei

# How to deploy on local environment

## Run on MacOS 
1. Install Homebrew in the terminal(/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" )
2. Install node via brew, type "brew install node" in the terminal
3. Install yarn via 'brew install yarn'
4. 'cd' to the directory of the 'senior-design-frontend'
5. Type 'yarn install' to install all dependencies needed for deployment
6. Type 'yarn add node-sass' to install newest version of sass dependencies
7. Type 'yarn run build' to build production environment
8. Type 'yarn run dev' to run development environment

'yarn run dev' will automatically open your default browser and run project on local machine

Backend API instructions: https://laravel-lsm.herokuapp.com/docs/1.0/overview (removed)

Documentation:
docs/

Source Code:
src/


