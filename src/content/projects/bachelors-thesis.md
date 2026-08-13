---
title: "Wearable Data & Machine Learning: Anomaly Detection for Heart Disease"
description: "A deep dive into my Bachelor's thesis project applying Matrix Profile and Machine Learning to real-world wearable data for cardiovascular anomaly detection."
date: 2024-07-01
author: "Giuseppe Mattia Greco"
---

With the widespread adoption of smartwatches, we are continuously generating a massive stream of physiological data. What if we could use this data to predict heart diseases before they become critical?

For my Bachelor's Degree thesis in Computer Engineering at the University of Calabria, I explored exactly this. Under the supervision of Prof. Francesco Lupia and Dr. Marco Lucchese, I developed a system that applies Machine Learning and Anomaly Detection techniques to real-world heartbeat data collected from wearables. 

Here is an overview of the project, the technologies used, and the results achieved.

## The Core Concept: Finding the Outliers

The primary goal of the thesis was to identify anomalies in heart rate time-series data. An anomaly in this context could represent an irregular heartbeat or a sudden physiological change that might indicate a latent cardiovascular issue.

To achieve this, I chose an Unsupervised Learning approach. Instead of training a model on labeled medical data (which is difficult to obtain and process due to strict GDPR and HIPAA regulations), I used the **Matrix Profile** algorithm.

### Why Matrix Profile?

Matrix Profile, introduced in 2015, is an incredibly versatile and fast algorithm for time-series analysis. It works by computing the Euclidean distance between a sliding window (a subsequence of data) and the rest of the dataset. 

The algorithm outputs two main profiles:
1. **Distance Profile:** A vector of the minimum normalized Euclidean distances.
2. **Profile Index:** The location of the nearest neighbor for each subsequence.

By plotting the distance profile, anomalies (called *discords*) naturally stand out as peaks in the graph, representing patterns that do not repeat anywhere else in the data. Conversely, repeated patterns (called *motifs*) show up as valleys. I implemented this using the Python library **STUMPY**.

## The Data Pipeline

The dataset consisted of 75,000 real-world heart rate measurements collected over five months from an Amazfit GTS 2 mini smartwatch, sampled every 10 minutes during the day and continuously at night.

### 1. Exploratory Data Analysis (EDA)
Using `pandas` and `NumPy`, I started with EDA. The data showed an average heart rate of 73.44 BPM with a standard deviation of 10.95 BPM. Visualizing the data via histograms, boxplots, and violin plots revealed a stable median but also highlighted the presence of long tails — clear indicators of potential anomalies exceeding 100 BPM.

### 2. Computing the Matrix Profile
The data was normalized and passed to the `stump` function. To reduce noise and avoid false positives, I applied a moving average to smooth the distance profiles. Anomalies were then flagged dynamically by calculating the difference between the 99.5th and 75th percentiles of the smoothed distances.

### 3. Containerized API Architecture
To make the analysis accessible and scalable, I built a microservices architecture using **Docker**. 
- An internal container ran the Matrix Profile anomaly detection logic.
- An external container hosted a **FastAPI** web service (served by Uvicorn) to handle asynchronous API requests. 

This setup allowed the system to receive payloads containing timestamps, smartwatch IDs, and heart rates, adding them to a DataFrame, and periodically running the anomaly detection job in an isolated, secure environment.

## Beyond Anomaly Detection: Activity Classification

In the final phase of the thesis, I expanded the scope to include supervised Machine Learning for physical activity classification. Using a secondary dataset comprising 49 individuals wearing Apple Watches and Fitbit devices, the goal was to predict the specific activity being performed (e.g., sitting, running at 3 METs, self-paced walking).

### Preprocessing and Training
I used `scikit-learn` to preprocess the data, employing `LabelEncoder` for the target variables and `OneHotEncoder` within a `ColumnTransformer` to handle categorical features like sex and device type.

I trained and evaluated several classifiers, including Decision Trees, Gradient Boosting, Support Vector Machines, and **Random Forest**.

### Results
**Random Forest** outperformed the others significantly, achieving an **85% accuracy** and an ROC AUC of 0.97. The confusion matrices confirmed that Random Forest maintained an excellent balance between precision and recall, minimizing false positives and false negatives across a complex multi-class problem.

I also performed an *ad-personam* analysis, grouping data by demographic keys (age, sex, height, weight) to train personalized models. Even with the limited data per individual, Random Forest maintained an impressive 84.6% average accuracy, proving the viability of highly personalized predictive health models.

## Conclusion

This thesis demonstrated the immense potential of integrating wearable technology with Machine Learning. The Matrix Profile proved highly effective at identifying rare, significant cardiovascular events with minimal false positives. Furthermore, the containerized architecture laid the groundwork for a robust, scalable system that could be deployed in clinical settings, such as monitoring at-risk elderly patients in hospitals or care homes.

As wearable sensors continue to improve, the gap between consumer electronics and medical diagnostics will close, and predictive algorithms like these will become frontline tools in cardiovascular prevention.