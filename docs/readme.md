# Documentation

This document provides an overview of the project, its components and functionality.

## Purpose

The purpose of this project is to demonstrate how to build a modern Next.js application that integrates with the Solid
platform. It provides basic authentication flow, route protection and CRUD operations on RDF/Turtle documents stored in
the user's Solid pod.

## Terminology

- **Solid**: A web decentralization project. It allows users to store their data in personal online data stores (pods)
  and control access to that data.
- **Solid Pod**: Personal online data store, in which users can store the data of apps that utilize the Solid platform.
- **Solid Issuer/Server**: An identity provider that authenticates users on the Solid platform and provides them with a
  Solid pod.
- **WebID**: A URI that serves as an identifier for a user on the Solid platform. It is used for authentication and to
  associate data with a specific user.
- **WebACL**: A standard for access control on the web, used by Solid to manage permissions for resources in a user's
  pod.
- **RDF**: Resource Description Framework, a standard model for data interchange on the web. RDF represents information
  as triples (subject-predicate-object) and is used to express structured data. RDF is the standard of the Solid
  platform for representing data in the user's pod.
- **Turtle**: Syntax for expressing RDF data.
- **LDO**: Linked Data Objects, a set of libraries and tools for working with linked data (RDF) in combination with the
  Solid platform.
- **LDO Shape**: A schema that defines the structure of a resource similar to a class definition in object-oriented
  programming. It is necessary for serializing and deserializing resources between in-memory objects and Turtle
  documents in the user's Solid pod.
- **Route**: A specific URL path in a web application that corresponds to a particular page.
- **Hook**: A special function in React that allows you to "hook into" React features like state and lifecycle methods.

## App Usage

To use the application, the user follows these steps:

1. Visit the app in the browser.
2. Click the "Sign in" button in the header. This will prompt the user to enter their Solid issuer URL (e.g.
   `https://solidcommunity.net`). The user will then be redirected to the issuer's login page.
3. The user authenticates by entering their credentials on the issuer's login page. After successful authentication, the
   user is redirected back to the app.
4. The app detects the authenticated session and retrieves the user's WebID and Solid pod storage location.
5. The app checks for the existence of the `solid-todo/` base container in the user's Solid pod. If it doesn't exist,
   the app creates it.
6. The app loads existing todo items from the Solid pod by fetching all RDF/Turtle documents in the `solid-todo/`
   container and parsing them into a list of todo items.
7. The app provides a UI for listing todo items, creating new todo items, toggling their "done" state, editing their
   names, and deleting them. Each action corresponds to a CRUD operation on the RDF/Turtle documents in the user's Solid
   pod.

## Technology Stack

### TypeScript

TypeScript is a superset of JavaScript which has the main purpose of adding static typing to the language. This allows
for better developer experience and helps catch issues at compile time instead of runtime.

### Next.js 16

Next.js is a meta framework for React that provides page routing, middleware, API endpoints and many other features out
of the box.

### React 19

React is a JavaScript library for building user interfaces by defining HTML snippets in the form of reusable components.
React also tracks state and updates the UI accordingly when the state of a component changes.

### Tailwind CSS 4

Tailwind CSS is a CSS framework that provides CSS utility classes to build styled components directly in the HTML.

### Linked Data Objects (LDO)

The Linked Data Objects (LDO) ecosystem provides libraries and tools for working with linked data (RDF). This project
utilizes `@ldo/ldo` (common utilities for linked data), `@ldo/solid` (Solid-specific utilities), and `@ldo/solid-react`
(React hooks for Solid integration).

## Directory Structure

- `app/`: Contains the routes of the application. Each subdirectory corresponds to a route, and the `page.tsx` file in
  each subdirectory defines the component for that route.
- `components/`: Contains reusable React components used across the app.
- `lib/`: Contains utility functions and LDO shape definitions for the todo items.
- `lib/ldo`: Contains the auto-generated TypeScript types and interfaces for the LDO shapes defined in `lib/shapes`.
- `lib/shapes`: Contains the LDO shape definitions for the todo item resource in Shex syntax.
- `styles/`: Contains global CSS styles for the app.

## Development Workflow

1. Install the NPM dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

This will start the app on `http://localhost:8000`.

### Generate LDO Types

If you make changes to the LDO shapes defined in `lib/shapes`, you need to regenerate the corresponding TypeScript
types:

```bash
npm run build:ldo
```

### Run a local Solid server with Docker

To test the app with a local Solid server, you can use the Community Solid Server:

```bash
docker run -p 3000:3000 solidproject/community-server:latest
```

## Data Model

The application stores todo data directly in the user's Solid pod.

### Container Layout

- A root container named `solid-todo/` is created inside the user's Solid pod.
- Each todo item is stored as an individual Turtle file inside that container.
- Item file names are UUID-based: `<uuid>.ttl`.

### Shape

Todo items are modeled with a simple LDO shape defined in `lib/shapes/todo.shex`. The shape contains two properties:

- `name`: a string used as the human-readable title of the todo item.
- `done`: a boolean that indicates whether the item has been completed.

The corresponding generated types in `lib/ldo/` are used to read, update, and commit these resources in a type-safe way.

## Behavior

### Authentication

Authentication is handled by the `Auth` component and follows these steps:

1. When the user clicks the "Sign in" button, the app prompts them to enter their Solid issuer URL.
2. The user is redirected to the issuer's login page, where they enter their credentials.
3. After successful authentication, the user is redirected back to the app.
4. The app detects the authenticated session and retrieves the user's WebID and Solid pod storage location.

### Item Read

Item reading and listing is handled by the `ItemIndex` component and follows these steps:

1. When the app loads, it checks for an authenticated session. If a session exists, it retrieves the user's WebID and
   pod storage location.
2. The app checks for the existence of the `solid-todo/` base container in the user's Solid pod. If it doesn't exist,
   the app creates it.
3. The app resolves the `solid-todo/` container as a resource and reads its children to collect the URIs of all item
   documents.
4. Each item URI is passed to an `ItemEntry` component, which loads the individual resource and binds it to the todo
   shape.
5. The app displays the list of todo items in the UI by rendering an `ItemEntry` component for each resource.

### Item Create

Item creation is handled by the `ItemCreate` component and follows these steps:

1. The user clicks the "Add Item" button in the UI.
2. The app generates a new UUID for the item and creates a new RDF/Turtle document named `<uuid>.ttl` in the
   `solid-todo/` container in the user's Solid pod.
3. The app creates a resource according to the LDO shape of the todo item.
4. The attributes of the resource are set according to the users input.
5. The app commits the new resource to the user's Solid pod, which will serialize it into the corresponding RDF/Turtle
   document.

### Item Update

Item updating is handled by the `ItemEntry` component and follows these steps:

1. The user changes the name of an item or toggles its "done" state in the UI.
2. The app extracts the new value of the changed attribute.
3. The app updates the corresponding attribute of the resource in memory.
4. The app commits the updated resource to the user's Solid pod.

### Item Delete

Item deletion is also handled by the `ItemEntry` component and follows these steps:

1. The user clicks the delete button on a todo item.
2. The app resolves the resource for the selected item URI.
3. The app deletes the resource from the user's Solid pod.

## Components

### `Auth`

This component provides a button for the authentication flow. It shows a "Sign in" button when the user is not
authenticated, and a "Sign out" button when the user is authenticated. It uses the `useSolidAuth` hook from
`@ldo/solid-react` to manage the authentication.

### `Button`

A generic button component.

### `CheckboxInput`

A generic checkbox input component.

### `HeaderBar`

The header bar of the app, which contains the app title and the `Auth` component.

### `Heading`

A generic heading component that can be used for section titles.

### `InputField`

A generic input field that provides a label and received error messages for an input component that must be provided as
a child.

### `ItemCreate`

This component provides the UI for creating new todo items. It contains an input field for the item name and an add
button. It uses the `useLdo` hook to create and commit a new resource in the user's Solid pod when the add button is
clicked.

### `ItemEntry`

This component represents a single todo item row in the list. It displays the item's name, a checkbox for toggling the
"done" state, and a delete button. It allows inline editing of the item name, which will be saved after the enter key is
pressed or the focus is lost. It requires the URI of the corresponding item as a property and uses the `useLdo` hook to
read and update the corresponding resource in the user's Solid pod.

### `ItemIndex`

This component displays the list of todo items. It determines the base container for the todo items by retrieving the
user's Solid pod storage location from their WebID. It uses the `useLdo` hook to fetch the URIs of all item resource
(without fetching the full data) in the base container and renders an `ItemEntry` for each URI. It also renders the
`ItemCreate` component for creating new items.

### `LdoContext`

This component provides a context for the app which holds the LDO configuration. It wraps all components that need
access to LDO functionality. Without it, the LDO hooks will not work.

### `Protected`

This component provides route protection by checking the authentication status of the user. If the user is
authenticated, it renders its children.

### `Section`

A generic section component that can be used to group related UI elements together.

### `Spinner`

A generic rotating loading spinner that can be used to indicate loading states in the UI.

### `TextInput`

A generic text input component.
