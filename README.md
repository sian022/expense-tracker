# Expense Tracker

## Introduction

The Expense Tracker is a single-page application that allows employees to report expenses easily and view past expenses. The app includes features such as adding new expenses, viewing a table of old expenses with a total, searching expenses by description, and showing total expenses by week for a certain year. An added touch as well is employees can also change the currency for the whole application.

## Deployed Website

You can access it temporarily here:
http://157.173.218.6:4450

## Installation Instructions

Follow these steps to clone and run the application locally:

### Clone the Repository

Open a new terminal window to where you want to clone the project.

```bash
git clone https://github.com/sian022/expense-tracker.git
cd expense-tracker
```

### Install Dependencies for the Server

```bash
cd server
npm install
```

### Run Development Server for the Backend Server

```bash
cd server
npm run dev
```
Great. You now have the backend server running. Now open a new terminal at the root of the project directory.

### Install Dependencies for the Client

Go to the newly opened terminal and install dependencies

```bash
cd client
npm install
```

### Run the Development Server for the Client

```bash
npm run dev
```

You can now access it at:
http://localhost::4450

## How My Solution Meets the Project Objectives

### Core Functionalities

- **Expense Entry Form:** The application includes a form that allows users to input new expenses, specifying the date, description, and amount. This ensures that users can easily report their expenses.

- **Expense Table**: A table is provided to display past expenses, which includes a total amount for both all time expenses and those expenses that meet the filter conditions for quick financial overview. This meets the requirement for users to see their past expenses at a glance.

- **Search and Filter**: The application features a search functionality that allows users to filter expenses by description. This makes it easy for users to find specific expenses and manage their records efficiently.

- **Weekly Total Expenses**: An option to show total expenses by week for the a specific year through the year filter is implemented. This feature helps users understand their spending patterns and better manage their finances.

### Additional Features

- **Currency Selector**: This feature allows users to choose between USD, PHP, or CAD to manage their expenses, eliminating the need for manual conversion. Unfortunately, most live APIs for currency exchange rates are paid services, so I implemented static exchange rates at the time of development.

## Important Decisions

### CSS and UI Libary

I chose Material UI as my CSS, UI, and Icons library. Material UI provides prebuilt components that integrate seamlessly with the other libraries I'm using, as well as options for theming and media query breakpoints. This allows for consistent, visually appealing, and responsive user interfaces while saving development time, especially under time constraints.

### State Management

I used Redux Toolkit and Redux Toolkit Query to manage my application and server state. This choice simplifies managing server state, handling errors, loading states, and race conditions.

### Form Handling

I used React Hook Form along with Yup for form validation. React Hook Form provides a performant, flexible way to handle forms in React, and Yup integrates seamlessly for schema validation, reducing the need to manage form validation states manually.

### Routing

I used React Router Dom for managing the application's routing. It is a powerful routing library for React that allows for declarative routing and navigation, enabling the creation of a single-page application.

### Number Formatting

I used React Number Format to handle number formatting, especially for currency inputs, to ensure consistent and user-friendly input formats.

### Component Structure

The app is broken down into smaller components (ExpenseForm, ExpenseList, ExpenseFilter) to promote reusability and maintainability.

### Reusable Components and Hooks

Creating reusable hooks for toasts, debounces, currency conversion etc. promotes reusability and maintanability through abstraction. Reusable components like Modals, Actions, and Navbars also make the development and maintenance smoother.

### Responsive Design

I used Flexbox and Media Queries to create a responsive layout that works well on both desktop and mobile devices.

### Atomic Commits

I ensured commits were atomic, addressing one issue or feature at a time. This makes it easier to track changes and roll back if necessary.

Time Management

## Time Management

I aimed to complete the project within 8 hours and successfully finished it in 7.75 hours. The core functionalities and design were completed in around 5-6 hours. The remaining time was spent cleaning up and refining the UI, adding additional features, and implementing validations for quality of life.

### Timesheet

July 6, 2024

- 10:00 AM - 12:30 PM
- 1:00 PM - 5:00 PM
- 6:00 PM - 7:00 PM
- 10:00 PM - 10:15 PM

## Feedback on Test Process

The test was well-structured and covered important aspects of front-end development. Here are some specific thoughts and suggestions:

### Positive Aspects

- **Clarity of Requirements:** The instructions were clear and concise, making it easy to understand the project scope and objectives.
- **Real-World Application:** The task simulates a real-world scenario, which is beneficial for evaluating practical skills.
- **Time Management:** The 8-hour limit provided a realistic constraint that mirrors actual work conditions, helping to assess how well candidates can manage their time and prioritize tasks.
- **Take-Home Exam Format:** I highly commend the decision to use a take-home application exam rather than a general coding exam. This approach allows candidates to demonstrate their ability to build a complete, functional application, which is a more accurate representation of day-to-day work. It also provides a more comfortable environment to showcase skills without the pressure of an in-person timed test.

### Suggestions for Improvement

- **Detail on Filtering Feature:** Providing a bit more clarity on the expected behavior of the filtering feature would be helpful. For example, specifying whether the search should be case-sensitive or if it should include partial matches could eliminate ambiguity.
- **Test Case Scenarios:** Including a few example test case scenarios or edge cases would help ensure candidates understand all the functional requirements and can plan accordingly.
- **UI/UX Expectations:** More detailed expectations regarding the UI/UX design could guide candidates better. For instance, mentioning any preferred design guidelines or specific user experience features to focus on.
- **Performance Considerations:** Encouraging candidates to consider performance optimizations, especially for handling large datasets, could add another layer of evaluation for efficient coding practices.
- **Accessibility:** Adding a requirement to implement basic accessibility features would ensure candidates are mindful of creating inclusive applications.
- **Error Handling:** Specifying expectations for error handling, both on the frontend and backend, would provide a clearer picture of the robustness required for the application.

### General Feedback

Overall, the test was a great opportunity to showcase my technical and problem-solving skills. The combination of coding, design, and practical application made it a well-rounded challenge. It not only tested my ability to deliver functional code but also emphasized the importance of creating a user-friendly and visually appealing interface.

Thank you for the opportunity to participate in this test. It was an engaging and insightful experience that highlighted areas for improvement while reinforcing my current skill set.
