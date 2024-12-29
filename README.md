# JSONify-It: JSON Editor

## Overview
JSONify-It is a sleek and intuitive single-page JSON editor built using **Next.js**, styled with **Tailwind CSS**, and enhanced with **ShadCN UI components**. This app allows users to view, edit, delete, and download JSON files with ease. Additionally, it includes five robust validation checks to ensure the integrity and correctness of JSON data.

---

## Features
- **View, Edit, Delete, and Download JSON**: A versatile editor to manage JSON data efficiently.
- **Real-Time Validation**: Five powerful validations to catch errors during JSON editing.
- **Responsive Design**: Optimized for various screen sizes, ensuring seamless usage across devices.
- **Modern UI**: Minimalist and user-friendly interface powered by Tailwind CSS and ShadCN UI.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jsonify-it.git
   cd jsonify-it
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

---

## Validations

### 1. **Test Non-Empty `id` and `title`**
- **How to Test:**
  1. Open the editor.
  2. Remove the `id` or `title` field from any screen or section.
  3. Click **Save Changes**.
- **Expected Behavior:**
  - An error message appears:
    - Example: `Screen 1 is missing an 'id'.`
    - Example: `Section 1 in screen home is missing a 'title'.`

### 2. **Test Invalid Date Range (`startDate > endDate`)**
- **How to Test:**
  1. Locate a section with visibility fields (`startDate` and `endDate`).
  2. Swap the `startDate` and `endDate` values to make `startDate > endDate`.
  3. Click **Save Changes**.
- **Expected Behavior:**
  - An error message appears:
    - Example: `Section banner01 in screen home has invalid dates: startDate > endDate.`

### 3. **Test Invalid `rolesAllowed` Values**
- **How to Test:**
  1. Locate a section with `rolesAllowed` in its visibility.
  2. Add an invalid role (e.g., `superadmin` or `unknownRole`).
  3. Click **Save Changes**.
- **Expected Behavior:**
  - An error message appears:
    - Example: `Invalid roles in section banner01 of screen home. Allowed roles: guest, member, admin.`

### 4. **Test Missing `content` Field**
- **How to Test:**
  1. Remove the `content` field from a section.
  2. Click **Save Changes**.
- **Expected Behavior:**
  - An error message appears:
    - Example: `Section banner01 in screen home is missing a 'content' field.`

### 5. **Test Malformed JSON**
- **How to Test:**
  1. Delete a comma, brace, or quotation mark in the JSON structure to make it invalid JSON.
  2. Click **Save Changes**.
- **Expected Behavior:**
  - An error message appears:
    - Example: `Invalid JSON format.`

---

## Technologies Used
- **Frontend:** Next.js
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI

---

## Future Enhancements
- Add support for JSON schema validation.
- Implement collaborative editing features.
- Provide additional theming options.

---

## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute as needed.

---

## Contribution
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

---

## Contact
For any questions or feedback, reach out at: **your-email@example.com**.


