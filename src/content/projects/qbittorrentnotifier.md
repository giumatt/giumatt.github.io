---
title: "qBittorrent Apprise Notifier: Automating Homelab Alerts"
description: "A lightweight Python script to seamlessly bridge qBittorrent completion events with Apprise, delivering push notifications to any platform."
date: 2026-08-14
author: "Giuseppe Mattia Greco"
---

When managing a self-hosted homelab, automation is key. While orchestrating my media stack (Jellyfin, Sonarr, Radarr, etc.) with Docker, I wanted a clean, universal way to receive notifications the moment a download completed in qBittorrent. 

qBittorrent has an excellent *"Run external program on torrent completion"* feature, but wiring it up to individual APIs (like Telegram, Discord, or Slack) is tedious and rigid. Enter **Apprise**.

Apprise is a fantastic Python library that standardizes notifications across almost every platform imaginable. I wrote a lightweight script to bridge these two tools seamlessly.

## How It Works

The project is essentially a targeted Python wrapper (`notifier.py`). Here is the core workflow:

1. **Configuration**: A simple `config.yaml` stores the Apprise URLs (e.g., `tgram://...` or `discord://...`).
2. **qBittorrent Execution**: In qBittorrent's settings, you configure it to call the script upon torrent completion, passing the torrent's name and category as CLI arguments:
   `python3 /path/to/notifier.py "%N" "%L"`
3. **Apprise Delivery**: The script parses the arguments, formats a clean message (including the category, which is incredibly useful for distinguishing between Radarr movies and Sonarr TV shows), and dispatches it via Apprise to all configured endpoints.

## Why Build This?

* **Universal Compatibility**: By leveraging Apprise, this single script supports dozens of notification services out of the box. No need to rewrite API calls if you switch from Telegram to Matrix.
* **Simplicity**: It relies on standard Python libraries and a clean YAML configuration, making it incredibly easy to deploy within a Docker container or directly on a host machine like a Raspberry Pi.
* **Homelab Integration**: It fits perfectly into a larger automated media pipeline, providing instant feedback without bloated middleware.

It’s a small, focused script, but it solves a very specific problem efficiently. 

## Contributing

You can review the code, grab the `config.yaml.example`, and adapt it for your own homelab at the following link:

[![GitHub Repository](https://img.shields.io/badge/GitHub-qBittorrent_Apprise_Notifier-181717?style=for-the-badge&logo=github)](https://github.com/giumatt/qBittorrent-Apprise-Notifier)