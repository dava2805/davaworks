---
title: "Privacy Policy for Tabula"
coverImage: "../../assets/projects/tabula_icon.002.png"
---

# Privacy Policy for Tabula
**Last Updated:** June 27, 2026

## 1. Introduction 
Welcome to Tabula: Kanban & Daily Focus ("we," "our," or "us"). We are deeply committed to protecting your personal privacy. This Privacy Policy outlines how your data is processed, stored, and protected when you use our mobile application (the "App").

## 2. Information We Collect & Process 
Tabula operates on a strict privacy-first, decentralized model. We do not have a central database for your tasks.
- **Local User Data:** Your core task lists, private project boards, markdown notes, custom themes, and historic daily records are handled completely on-device using a local Isar database. We do not have access to, nor do we store copies of, your personal boards or task text on our servers.
- **Cloud Sync & Project Sharing (Google Drive):** You have the option to connect your Google account to enable cloud synchronization and board sharing. This securely backs up your local data directly to your personal Google Drive account. If you choose to share a Kanban board, the App generates an open sharing link to a specific file hosted entirely within your own Google Drive. We do not intercept, host, or have access to these shared files.
- **Anonymous Authentication:** Upon launching the App, you are authenticated anonymously and assigned a secure unique identifier (UID) via Firebase. This string contains zero personal details and serves purely as a security key to authenticate your app instance with our server cloud.
- **Analytics and Usage Milestones:** We collect anonymous interaction data via Firebase Analytics to monitor application performance and stability. Additionally, when specific non-identifiable daily milestones occur, this information is securely transmitted to our backend Cloud Firestore server with your anonymous UID attached.

## 3. Data Types We Track
- **Identifiers:** Randomly generated Firebase Auth UIDs and device/vendor tokens.
- **Usage Data:** Anonymous user product interactions tracked via Firebase Analytics.
- **Diagnostics:** Error logs, execution velocity metrics, and crash reporting.

## 4. How Your Information is Used 
All data transmitted off your physical device is fully anonymized and used strictly for:
- Preventing unauthorized write access to our database cluster.
- Aggregating high-level app performance metrics (e.g., tracking average completion rates to optimize the daily reset mechanics).
- Fixing technical bugs and crash failures.

We strictly do not engage in data broker programs, we do not integrate third-party advertising SDKs, and we will never sell or rent any analytical tracking profiles to outside corporations.

## 5. Third-Party Infrastructure Providers 
We leverage Google Cloud Platform and Google Drive to handle our server security, statistical pipelines, and optional data backups:
- **Google Firebase:** Powers our anonymous authentication, event analytics, and Cloud Firestore databases.
- **Google Drive:** Facilitates the optional cloud sync and sharing functionality, storing your encrypted backup against your personal storage quota.

**Optional AI Assistant Integrations:**
If you choose to enable the AI Assistant (Brain Dump) features, your recorded speech and text are processed securely:
- **Direct API Connections:** We do not route your AI requests through our own servers. Your data is transmitted directly from your device to your chosen AI provider (Google Gemini, OpenAI, or Grok) using the personal API key you provide.
- **Data Privacy:** We do not store, log, or monitor the contents of your transcripts or AI conversations. The handling of any data processed by the AI is strictly governed by the respective privacy policies of the provider you have configured (e.g., Google, OpenAI, or xAI). Your API keys are stored securely and locally on your device. Google’s treatment of this information is strictly subject to their corporate Privacy Policy, which can be evaluated at: [https://policies.google.com/privacy](https://policies.google.com/privacy?authuser=1)

## 6. Google API Services Limited Use Disclosure 
Tabula's use and transfer of information received from Google APIs to any other app will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy?authuser=1), including the Limited Use requirements. Specifically:
- **Access & Use:** We only request access to your Google Drive to create, read, modify, and generate sharing links for Tabula-specific project and backup files. We do not read, access, or modify any other personal files in your Google Drive.
- **Storage:** Your backup and shared project files are stored entirely within your own Google Drive quota. We do not store any of your Google Drive backup or project data on our own servers.
- **Sharing:** We do not share, sell, or transfer your Google Drive data to any third-party tools, AI models, or data brokers.

## 7. Data Retention and Erasure
- **Local Device Data:** Your task documents live locally and are removed instantly if you wipe the app data or uninstall Tabula from your operating system.
- **Cloud Sync Data:** You maintain absolute control over your synced data. You can choose to disconnect your account, revoke sharing links, or permanently delete your cloud data from Google Drive at any time directly through the App.
- **Server Records:** Because our database server records entries via anonymous UIDs, we possess no manual administrative capacity to correlate specific analytics records back to an individual user identity.

## 8. Compliance Frameworks (GDPR & CCPA) 
We comply fully with regional privacy regulations by ensuring no personally identifiable information (PII) is gathered. Your local device context and personal cloud backups remain entirely within your sovereign physical control.

## 9. Contact Information 
For technical assistance or privacy inquiries, reach us directly at:
Email: mindthetrack25@gmail.com
