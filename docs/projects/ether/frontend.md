---
title: Dashboard
sidebar_position: 4
---

# Frontend UI/UX

The E.T.H.E.R. dashboard is a multi-page web application built with **Astro** and **React**, styled entirely with **Tailwind CSS**.

## Design Philosophy
The user interface follows a strict **"Heads-Up Display" (HUD)** architecture. 
- **Zero-Scroll Desktop:** The main application window is locked to the viewport height (`h-screen overflow-hidden`), mimicking a native desktop application. 
- **Aesthetic:** Dark-Mode Industrial Sci-Fi, featuring frosted Glassmorphism panels over an animated Aurora background gradient.
- **Bento Box Grid:** All data is compartmentalized into strict, distinct, rounded rectangular grids for high legibility during engineering presentations.

## Routing System
The application utilizes Astro's file-based routing combined with View Transitions to ensure seamless navigation without white flashes:
- `/` - **Home:** The main command center displaying live power flux and the emotive status dial.
- `/history` - **History:** A scrollable timeline of wattage readings with color-coded emotive state markers.
- `/insights` - **Insights:** AI-generated analysis and personalized energy-saving recommendations based on the last 24 hours of data.
- `/settings` - **Settings:** User preferences for alert thresholds, display themes, and admin controls for the hardware nodes.