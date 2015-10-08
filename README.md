# Traksana

[Heroku link][heroku]

[heroku]: https://traksana.herokuapp.com/

## Minimum Viable Product
Trak is a clone of Asana built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->
- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Form teams
- [ ] Access team projects
- [ ] Create projects
- [ ] Create tasks on projects
- [ ] Assign tasks
- [ ] Comment on tasks and projects
- [ ] Mark tasks and projects as completed

## Design Docs
<!-- * [View Wireframes][views] -->
* [DB schema][schema]

<!-- [views]: ./docs/views.md -->
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Team Creation (~1-2 days)
- Implement user auth, the standard way (overriding password= to create password hash)
- Users will be able to form teams with other users, and see who's on their team
- Push to Heroku, ensure everything checks out and basic skeleton is live

[Details][phase-one]

### Phase 2: Viewing and creating projects and tasks (~1 day)
- Add Rails API routes serving project and task data as JSON
- Add Backbone collections/models fetching data from these routes and display everything with Backbone in single page
- Users will be able to view and create all projects of their team, as well as associated project tasks

[Details][phase-two]

### Phase 3: Editing and Deleting Projects and Tasks, Add Assignments (~1 days)
- Build on top of previous day's work. Create new paths for Users to edit and delete projects and tasks
- Add delegation functionality -- allow users to edit which individuals are assigned to certain tasks

[Details][phase-three]

### Phase 4: Adding Completion and Comments (~1-2 days)
- Create polymorphic associations on comments and completion models, tying it to both projects and tasks. Create accompanying routes to serve up comment and completion data
- Implement Backbone collections and models that fetch comment/completion data from each source, as appropriate
- Allow users to toggle completion attribute of tasks and projects on editing and Deleting, create accompanying Backbone sync events if haven't already
- Users can comment on tasks and projects, as well as toggle completion on either one.

[Details][phase-four]

### Bonus Features (TBD)
- [ ] 2 layers of admin priveleges. Only team leads can create projects and delegate project leads. Only project & team leads can modify projects and assign tasks. Ordinary users can only create tasks within existing projects assigned to themselves.
- [ ] Enhance task view with word-processor capabilities, ENTER creates new task, BACKSPACE on empty task deletes it, clicking into task allows editing
- [ ] "Section" designations within tasks.
- [ ] Draggable tasks. Inter-project, and intra-project between sections.
- [ ] Progress tracker. Changelog (tasks completed, new tasks submitted, renamings, delegations, etc.), # tasks remaining. Visual representation?
- [ ] Assign due-date on tasks.
- [ ] Calendar view for above.
- [ ] Project-specific file uploading and sharing.
- [ ] Multiple session management
- [ ] Pagination/infinite scroll

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
