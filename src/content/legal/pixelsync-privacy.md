---
title: "Privacy Policy for PixelSync"
coverImage: "../../assets/projects/pixelsync_app_icon_transparent.png"
---

# Privacy Policy
**Last Updated:** March 2026

At PixelSync, we believe your art should be yours, and your data should stay private. This policy explains how we handle information when you use our app, including our collaborative features and performance tools.

## 1. No Accounts Required
We do not require you to create an account, provide an email address, or link your social media profiles to use the app. You remain completely anonymous.

## 2. Anonymous Identity
When you join a shared canvas, you may set a "Global Artist Name." This name is a pseudonym used solely to identify your edits to other collaborators in real-time. It is not linked to your real-world identity and is temporarily tied to your session.

## 3. Data Storage & Art Ownership
- **Local Projects:** Art created in "My Projects" is stored entirely locally on your device. We cannot see, access, or restore this art if the app is deleted.
- **Shared Projects (Online Collaboration):** When you host or join a project via a 6-digit code, the canvas data (pixels, layers, and palette) is temporarily stored on Supabase (our backend database provider) to enable real-time syncing between devices. This data automatically expires and is permanently deleted after 7 days to preserve server space. Additionally, the host of a collaborative project may delete the project from their device at any time, which immediately and permanently deletes the shared canvas data from our servers.
- **Pixel Mail Drops:** When you send pixel art to a friend's widget, the art is securely stored on Supabase so their device can download it in the background. These drops are automatically deleted after 30 days to free up storage space. Users can also delete a Pixel Mail group at any time, which instantly purges all associated art and connections from our servers.

## 4. Data Collection & Analytics
To help us improve the drawing tools and ensure the app runs smoothly, we collect limited, non-identifying information via Google Firebase Analytics:
- **Usage Data:** We track high-level actions, such as what canvas sizes are created or when a multiplayer room is hosted. This helps us prioritize future feature updates.
- **Identifiers:** The app uses a device-specific ID (IDFV on iOS) to distinguish unique sessions for analytics purposes. This is *not* used to track you across other apps or websites.
- **Diagnostics:** We collect performance data and crash reports. If the app closes unexpectedly, we receive technical data to help us fix the bug in the next update.

## 5. Third-Party Services
We use two primary third-party services:
1. **Supabase:** Used to provide the real-time database for collaborative drawing. We implement Row Level Security (RLS) policies to prevent unauthorized access, modification, or deletion of shared projects by third parties. You can view Supabase's Privacy Policy [here](https://supabase.com/privacy).
2. **Google Firebase:** Used exclusively for anonymous usage analytics and crash reporting. You can view Google’s Privacy Policy [here](https://policies.google.com/privacy).

## 6. Safety & Security
Please do not share sensitive personal information (like your phone number, email, or home address) within a "Global Artist Name" or a project title, as these are visible to anyone who has your specific 6-digit join code.

## Feedback & Support
We are constantly refining the experience and would love to hear from you!
- **Feature Requests:** Want a new tool or better folder management? Reach out.
- **Bug Reports:** If syncing or tools are not behaving as expected, please include your device model and the 6-digit room code if applicable.
**Contact:** [mindthetrack25@gmail.com](mailto:mindthetrack25@gmail.com).
