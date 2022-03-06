# Notes App
## Andrew Fulton
Deployed Site: https://upbeat-agnesi-735b00.netlify.app/

Frontend Repository: https://github.com/theandrewfulton/notes-frontend

Backend Repository: https://github.com/theandrewfulton/notes-rails-backend

## Description

### Purpose

The Notes App creates a place where users can save things they want to keep a record of. This can be anything from shopping lists, notes for school or a business plan for their next big idea! I created the Notes App to continue building my skills with React as well as to explore Material-UI. This app will also serve as a jumping off point for me to learn the full MERN stack (the backend is currently Ruby on Rails), React Native and Electron.

### Target Audience

The target audience for this application is users who want a simple way to keep track of their notes all in one place. It will also showcase my skills to family, friends and potential recruiters.

### Functionality and Features

#### Create an Account

From the main page users can create an account by entering a valid email address, a password and confirming their password. Successfully creating an account generates a JSON Web Token (JWT) which is saved in the browser's local storage and used to authenticate the user. Users who create an account are automatically logged in.

#### Log In

Successfully entering the username and password of an existing account generates a JWT which is used for backend authentication. Users can then see notes they have already created.

#### Log Out

Clicking Log Out deletes the JWT from the browser's local storage and the user is no longer able to access their account data unless they log in again.

#### Create a Note

Once logged in users can create a note. The title is optional but notes must have a body to successfully saved. A note is not visible to anyone other than the user who created it.

#### View a note / view a summary of notes

Users can view summaries of all of their notes on a single screen.

#### Update a Note

Users can view the full contents of a note by clicking on it. They can also make any changes they desire to the note provided there is something in the note body on save.

#### Delete a Note

Clicking delete sends a destroy command to the backend database, permanently deleting the current note.

### Tech Stack

#### Frontend

- React

- Material-UI - for styling

- Axios - for asynchronous access to the backend

- Router - to add pages and navigation to the React app
- Hosted on Netlify

#### Backend

- Ruby on Rails in API mode

- PostgreSQL

- bcrypt - for password hashing and salting (has_secure_password)

- rack-cors - for Cross-Origin Resource Sharing
- jwt - for administering JSON Web Tokens for user authentication
- Hosted on Heroku

## Installation

You are welcome do [visit the deployed site](https://upbeat-agnesi-735b00.netlify.app/) and explore the features and functionality there. The following installation instructions are for downloading the source code if you want to run the notes app locally in a development environment.

Please note the following notes were tested on Linux and should also work for macOS. They may also work for Windows Subsytem on Linx (WSL). If you are running Windows you can [find out more about WSL here](https://docs.microsoft.com/en-us/windows/wsl/).

## Frontend

[Install Node.js](https://nodejs.org/en/)

[Install Yarn](https://yarnpkg.com/) (or just use npm - which ships with Node.js)

[Install git](https://git-scm.com/) if you want to clone the repository using the command line and use git for version control

[Go to the repository](https://github.com/theandrewfulton/notes-frontend)

click the Code button

Download ZIP or select the appropriate terminal option (https, ssh or Github CLI)

If you chose to download the Zip, extract it to your directory of choice once it has downloaded. Open notes-frontend

If using command line, navigate to your directory of choice (either by using the ```cd``` command, followed by the directory path) or by opening your file manager, navigating to the directory and then right-clicking and choosing *Open in Terminal*. Please note not all file managers support this.
clone the directory using ```git clone [add url from github here]```

e.g. ``` git clone git@github.com:theandrewfulton/notes-frontend.git```

Once this is complete, navigate into the directory with ```cd notes-frontend```

### Install packages

run ``` yarn install``` to install the required packages.

[add npm command]

Once this is complete, run ```yarn start``` to launch the frontend.

You can now also explore the project using the source code editor of choice.

### Backend

Git

[Ruby](https://www.ruby-lang.org/en/) - version 3. I suggest using a version manager such as [RVM](http://rvm.io/rvm/install)

Rails - once ruby is installed run ```gem install rails``` - version 7 is used here

[postgresql](https://www.postgresql.org/) - you may also need to install libpq-dev. [DigitalOcean has a great Postgresql tutorial for Linux](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-ruby-on-rails-application-on-ubuntu-18-04)

Need to create a user for postgresql

install instructions from repo the same as above

```bundle install```

```rails db:create```

```rails db:migrate```

```rails db:seed```

```rails s -p 4000```

## Control Flow Diagram

## Dataflow Diagram

## Application Architecture Diagram

## User Stories

As a **Visitor** I want to **create an account as easily as possible** so that **I can begin using the app right away**.

As a **User** I want to **log in** so that **I can view the notes I have created**.

As a **User** I want to **log out** so that **I can keep my account secure when not using the app or on shared devices**.

As an **Administrator** I want **logins on a device to expire after 7 days** so that **I can better balance user convenience with security**.

As a **User** I want to **add a note** so that **I can keep a record of things in my life**.

As a **User** I want **the option of adding a title to my note** so that **I can make my notes easier to find or focus on adding information as quickly as possible depending on the circumstances**.

As a **User** I want to **view all of the notes I have created** so that **I can see what I had added to both remind me and avoid duplicates**.

As a **User** I want to **edit a note** so that **I can make corrections, add or remove text as desired**.

As a **User** I want to **delete a note** so that **I can keep my list of notes relevant and manageable**.

## Screenshots
