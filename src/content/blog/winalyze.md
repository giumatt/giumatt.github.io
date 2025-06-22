---
title: "Winalyze"
description: "A real-world machine learning project using Python, Azure Functions, and GitHub Actions to predict wine quality — fully automated, scalable, and cloud-native."
date: 2025-06-22
author: "Giuseppe Mattia Greco"
---

What if you could predict the quality of a wine just by uploading a dataset — no servers, no manual steps, just **pure automation**?

This project, developed as part of a Distributed Systems and Cloud Computing course, is a full-fledged, serverless **machine learning pipeline** deployed on **Microsoft Azure**. It handles every phase of the ML lifecycle — from data ingestion to prediction — using **Function-as-a-Service (FaaS)** principles, **GitHub Actions**, and a reactive **Vue.js web frontend**.

Let’s dive into how it works.

---

## The Use Case: Predicting Wine Quality with ML

We used the famous **Wine Quality Dataset** (UCI), which contains physicochemical measurements of red and white wines, along with quality scores from human tasters.

The goal: train a supervised model (Random Forest) to classify wine quality and make real-time predictions on new samples.

---

## Architecture at a Glance

The system is composed of **five Azure Functions**, each responsible for a distinct phase in the ML pipeline:

- `upload_function`: accepts CSV files from users and stores them in Azure Blob Storage.
- `train_function`: triggered by a timer, it preprocesses the data, trains a model, and stores it.
- `validate_function`: compares new models against existing ones and promotes only improvements.
- `infer_function`: exposes a real-time HTTP endpoint for predictions.
- `model_status`: provides the frontend with live model readiness updates.

Each function is **stateless**, **event-driven**, and independently deployable — following the best practices of cloud-native software engineering.

---

## The ML Side: Random Forest in Python

All logic is written in **Python 3.12**, leveraging:

- `scikit-learn` for training, inference, and model serialization.
- `pandas` and `numpy` for data manipulation.
- Azure SDKs for storage integration and async I/O.

Each model is trained separately for red and white wines to improve specialization and accuracy (70% for red, 97% for white).

All training steps are wrapped in `async` functions to maximize performance in resource-constrained serverless environments.

---

## Cloud Native by Design

Built entirely on **Microsoft Azure**, the architecture includes:

- **Azure Functions** for compute logic (event-driven).
- **Azure Blob Storage** for datasets, models, and preprocessing artifacts.
- **Azure Static Web Apps** for frontend deployment.
- **GitHub Actions** for CI/CD — from build to deploy with auto-merge logic on model validation.

Thanks to the serverless model, you **only pay per execution**. There’s no need to manage infrastructure or worry about scaling — Azure handles it all.

---

## Frontend: A Minimal but Reactive Vue.js App

The frontend is a **Vue.js single-page application** with three states:

1. **Upload**: User uploads a CSV (e.g. `uploaded_red.csv`).
2. **Training**: The system trains a model and polls for readiness.
3. **Predict**: The user submits new wine features and receives an instant prediction.

Key features:

- Uses `localStorage` to persist app state across reloads.
- Polls `model_status` endpoint every 5 seconds for model readiness.
- Displays dynamic notifications and real-time inference results.

Each interaction with the backend is **asynchronous and error-resilient**, ensuring a smooth user experience even in edge cases.

---

## Security & DevOps

Security is handled with care:

- **Environment variables** for cloud credentials.
- **GitHub Secrets** for CI tokens.
- **Scoped HTTP exposure** of Azure Functions with controlled access levels.

The deployment process is fully automated via GitHub Actions, with **auto-promotion of better-performing models** using performance benchmarks and versioning logic.

---

## Key Features Recap

- Fully **automated ML pipeline** using serverless functions
- Training and validation logic designed for **continuous improvement**
- Scalable, modular architecture with **low operational cost**
- Reactive, user-friendly web app for easy dataset uploads and predictions
- Built-in security and CI/CD pipelines

---

## What’s Next?

There’s room to grow:

- **Containerization with Docker** and `docker-compose` for full portability
- Deployment via **Azure Container Apps** or **Kubernetes**
- Support for **additional ML models** and datasets
- Graphical analytics and export features in the frontend

The current system already meets real-world standards for robustness, modularity, and automation — and is ready to scale.