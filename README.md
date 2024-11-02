# course-management-system
 
### For create from stracth 
mkdir CourseManagementSystem
cd CourseManagementSystem
npm init -y

npm install express body-parser
npm install --save-dev typescript ts-node @types/node @types/express jest @types/jest ts-jest

# Course Management System

A backend system for managing courses, built with TypeScript, Node.js, and Express.js. This system allows you to perform CRUD operations on courses, modules, and lessons and uses JSON files to persist data instead of a traditional database.

## Project Overview

The Course Management System enables easy management of course data through a RESTful API, offering type safety and code quality via TypeScript. It also includes error handling, logging, and input validation.

## Features

- RESTful API for managing courses, modules, and lessons.
- Data persistence using JSON files (`courses.json`, `modules.json`, `lessons.json`).
- TypeScript for type safety and improved code quality.
- Error handling and logging with structured messages.
- Unit and integration tests using Jest.
- API documentation with Swagger.

## Technical Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Data Storage**: JSON files
- **Testing**: Jest
- **API Documentation**: Swagger/OpenAPI

## Setup

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/DNA-RNA/course-management-system.git
    cd course-management-system
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Ensure that the `data` folder contains the necessary JSON files (`courses.json`, `modules.json`, `lessons.json`), or create empty files to begin with.


### Running the Project

To start the server:

```bash
npm  start
# or
yarn start

