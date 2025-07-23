# Tiny Manage Portal

This is a simple [React](https://react.dev/) and TypeScript based user manage portal page. The UI is build with [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) components. And both the database and user authentication utilizes [Supabase](https://supabase.com/).

This project utilizes [Jotai](https://jotai.org/) for React global state management. [React Hook Form](https://react-hook-form.com/) is adopted for a more clear and flex form data validaation. The data fetch as well as form submission are wrapped with [Tanstack React Query](https://tanstack.com/query) for a more robust and efficient error process.

<p>

<img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
<img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white" />
<img alt="TailwindCSS" src="https://img.shields.io/badge/-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
<img alt="DaisyUI" src="https://img.shields.io/badge/-DaisyUI-1AD1A5?style=flat-square&logo=daisyui&logoColor=white" />
<img alt="Vite" src="https://img.shields.io/badge/-Vite-646cff?style=flat-square&logo=vite&logoColor=white" />
<img alt="React Router" src="https://img.shields.io/badge/-ReactRouter-ca4245?style=flat-square&logo=reactrouter&logoColor=white" />
<img alt="Supabase" src="https://img.shields.io/badge/-Supabase-3fcf8e?style=flat-square&logo=supabase&logoColor=white" />
</p>

## Environment

-   React: v19.1
-   TailwindCSS: v4.1
-   DaisyUI: v5.0
-   Vite: v7.0
-   Jotai: v2.12

To install the dependencies, please run:

```sh
npm install
```

To run the project on your local device, please run:

```sh
npm run dev
```

To build the project into a static website, please first create the `.env` file in the project root directory and add static values as:

```
VITE_SUPABASE_KEY=  // your supabase key
VITE_SUPABASE_URL=  // your supabase url
VITE_SUPABASE_TOKEN=  // token generated in your browser localstorage, only the value is needed
VITE_PAGE_SIZE=10
```

and then execute the following command:

```sh
npm run build
```

## Screenshots

![](./screenshots/Login.png)

![](./screenshots/Register.png)

![](./screenshots/Portal1.png)

![](./screenshots/Portal2.png)

## Demo

You can test this project here: [Demo](https://leafy-lolly-c81e09.netlify.app)

> Example Login Credential:  
> Email: Emmie.Mohr96@gmail.com  
> Password: iJkIQnYoLcbZx5H

## Acknowledge

-   HD_Alex
