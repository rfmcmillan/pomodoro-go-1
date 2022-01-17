# PomodoroGo

PomodoroGo is a Chrome extension that is a pomodoro timer (https://en.wikipedia.org/wiki/Pomodoro_Technique) and web-site blocker in one. It also provides a dashboard to help the user gain insights from their session history. You can view a demo of the app at https://pomodoro-go-1.herokuapp.com/home or you can download and install the full Chrome extension by following the instructions below.

This is a group project from my time at Fullstack Academy (see below for individual contributions) that I revisited.

![alt text](https://github.com/rfmcmillan/pomodoro-go-1/blob/readme/client/static/PomodoroGo.png?raw=true)

## Installation

1. Within Chrome, navigate to https://chrome.google.com/webstore/detail/pomodorogo/hdkcidbbeignlpjolgfjelpkinmgkefd

2. Click the 'Add to Chrome' button. Your browser should produce a dialog telling you that PomodoroGo can read your browsing history and display notifications. PomodoroGo uses browsing history to block websites and notifications to tell you when your session is complete.

3. Click 'Add extension'. PomodoroGo should now be installed and available in your Chrome extensions.

## Usage

1. To launch PomodoroGo, click the Extensions button in the upper-right of your Chrome window and select 'PomodoroGo'.

2. If you would like to explore the sandbox account, click the 'Sandbox' button. If you'd like to create your own account, click 'Sign Up'.

3. To set a timer...

    - Select a goal in the 'Select Goal' dropdown.
    - Enter the desired length of your session.
    - Click 'Start'. The rest of the app will now be hidden to help you focus. When the timer is complete you will receive a notification from Chrome.

4. To block a website...

    - In the Navbar, click 'BlockList'.
    - In the 'URL' input, type the url of the website you would like to block. e.g. 'facebook.com' or 'https://www.facebook.com/'. Either will work.
    - Select a category from the 'Category' dropdown menu.
    - Click 'Add'. The website should now be blocked and you should see it listed below.

5. To view your info in the Dashboard...
    - In the Navbar, click 'Dashboard'
    - In upper-right-hand corner, you can filter by Time Period or Goal.
    - In the lower-left chart, you can select various charts to display from the 'Display' drop-down.
    - In the lower-right chart, you can select various charts to display from the 'Display' drop-down.

# Contributors

-   Stephen Alas (Front-End: Timer. Back-End: Task model, Session api and model)
-   Yiru Ding (Front-End: Login, About Page. Back-End: Auth API, User API and User model)
-   Russel McMillan (Front-End: Dashboard, Timer, Website Blocker, Blocked-Site View, Login. Back-End: Timer, Website Blocker, Session API and Session Model, Auth API and User Model)
-   Felicity Wu (Front-End: Website Blocker, Friends, Blocked-Site View. Back-End: Website Blocker, Blocklist API and Model, Friendship Blocklist and Model, Sites Blocklist & Model)
