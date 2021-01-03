# Simply Budget Prototype in React with JSON Server

Simply Budget will be a mobile app for tracking spending against a weekly or monthly goal. Create a budget, give it a name, and then start adding your expenses. Simply Budget will tell you how much you have left to spend for each budget per period and how much over or under budget you are for the lifetime of a budget. Supports multiple currencies. Created for people who don't like to connect their banking apps to third-party apps or install them on their phones.

Allows you to budget your way. Create budgets with categorical names, like "Groceries" and "Utilities", and then add expenses with or without titles. Or just create a budget called "Everything" and expenses with or without titles to that. So you do you.

Simply Budget does not ask you how much money you earn or have in the bank. It does not collect and send your data to the maker of the app. The maker of the app does not want your data. In fact, she doesn't even want to know who you are. Privacy matters.

This prototype is done and will be refactored into a Native app with a proper database. Mathematical functions have been tested, since they are the basis of the app. Other functionality will be tested on the native version as that's where it matters.

## Features:

- Create a budget with a weekly or monthly spending limit
  - Set a future start date if you like
  - Edit name whenever, edit start date until it starts
- View budgets organized by currency and the totals left to spend on each one
  - See how much was spent per period and was left to spend
- Archive a budget (move it out of the main view, delete its expenditures, and display its final state in the Archive view)
  - Not sure if this is a useful feature
- Add and edit expenses for a budget (name, date, amount), or remove
  - Quick add option: add all as untitled, just put in a number (ideal if your budgets have names like "Groceries", "Utilities", etc. and you don't care about the specific expense names)
- Charts: view spending per expense name for a budget
  - Might choose a different package with better handling of text label overflow and small slices
- Automatically delete expenses for a budget when they reach a certain number and remember the total removed
- Mobile only: notifications for adding expenses or when a budget starts
- Dark Mode option
- Export all budget and expense data so it can be transferred to another device

## Lesson Learned

I will not prototype with json-server again. It caused more trouble than it was worth and cost time, as well as leading to some pretty weird code, which will not carry over to the final product. That being said, there's going to be a major refactor of everything. Coding at night after a full day of work with long periods of not being able to work on a project in between leads to some really weird code that is not well thought out. I look at certain parts of this and just wonder who did this. I mean, it was me, but...was it?

## To Do:

- Attribution: <div>Icons made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

## Future Features:

- Pause a budget
- Remove a category

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Start the json-server and app at same time: 8000 and 3000, respectively

### `npm run naked`

Start the json-server w/ a copy of the empty db and run the app: ports 8000 and 3000

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
