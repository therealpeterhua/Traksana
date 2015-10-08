# Traksana
A single-page app inspired by the popular "teamwork without email" webapp Asana.

###[Live URL][live_url]
[live_url]: https://traksana.herokuapp.com/

PICTURE

## Core Tech
Rails, PostGres, Backbone

## Features
* Users can form teams and add other Traksana users as teammates
* Users can create projects and associated tasks
* Any user can assign tasks to a teammate, and comment on any task in a team they belong to
* Tasks and descriptions can be edited in-place
* Adding new members and assigning tasks is a breeze with search and filter on keydown
* Supports multiple-device sign-in from the same user via custom Sessions table
* Supports user avatar upload via Paperclip and AWS S3, and Facebook authentication through omniauth


### Features in Progress
* Polymorphic search for teams, projects, tasks, and comments
* Orderable and draggable tasks within and between projects
* ChangeLog to display status/changes on tasks and projects.
* Pagination of user search results
* User home page listing all tasks assigned to the current user
