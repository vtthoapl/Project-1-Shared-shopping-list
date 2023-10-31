# Project 1: Shared shopping list

Overview: this project is a shared shopping list web application allowing users to create lists, items inside lists, deactive the list and mark the items.

Online location : https://shrared-shopping-lists-project-1-aalto.onrender.com

Guildelines for running application locally:
Application built using deno, docker. opening the app locally: using the command: "docker compose up" in the terminal to open.
the web architecture: view -> app -> controller -> service
Testing: end-to-end test using playwright. to run the test using these under command:
"docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf"