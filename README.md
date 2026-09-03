Backpacking Meal Planner

A Wix Velo site that recommends dietary-restriction-friendly meals for camping and backpacking trips, based on trip conditions.

The problem

Campers and backpackers with dietary restrictions (e.g. vegetarians) are often stuck with inadequate meals — think lettuce-and-tomato sandwiches — that aren't enough to sustain a full day on trail. This project was built to fix that: give people meal recommendations that actually match both their trip's demands and their dietary needs.

What it does

A user enters their trip details — intensity level, trip length, and dietary restrictions — and the site:

Estimates a daily calorie target based on trip intensity (Light / Moderate / Intense)
Converts that target into a calorie-range tag
Cross-references that tag plus any dietary restrictions against a tagged collection of meals to surface matching recipes
Status

Piloted with my Boy Scouts troop (80 active members at the time), who also contributed recipes to the meal collection based on real trips. No longer active/maintained.

Project structure

This repo was created via Wix's built-in GitHub integration, so it includes the full site export, not just this project's code. The files relevant to this project are:

src/pages/Home.i2fyp.js — main trip-results page: takes a trip's intensity/restrictions, computes a calorie target, and queries matching recipes
src/pages/Trip info (Item).jyzl3.js, src/pages/Trip info (List).ztli2.js — trip detail views
src/pages/Add Trip.nqs8p.js — trip creation
src/pages/All Trips.c1dmp.js — trip listing
src/pages/Items (Item).tk69f.js, src/pages/Items (List).hcqr4.js, src/pages/Items 1 (Item).cdy29.js, src/pages/Items 1 (List).n0wx7.js — meal/recipe item views

Everything else in src/pages/ (Cart Page, Checkout, Product Page, My Orders, Account Settings, holiday-themed pages, etc.) is unused scaffolding inherited from the Wix starter template this site was built on, not part of this project.

Design notes
Calorie targets are bucketed into tag ranges rather than matched exactly, so the recipe collection doesn't need a recipe for every possible calorie count
Dietary restrictions and calorie tags are combined into a single tag list and matched against a normalized Tags collection (label → ID lookup, then queried against Posts) rather than free-text matching
Defensive error handling throughout: missing trip ID, missing trip data, and failed queries all fall back to a visible message rather than failing silentlyen/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository). Multiple developers can work on a site's code at once.
