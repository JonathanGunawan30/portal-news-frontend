# Jonathan News Portal — Frontend

A modern, high-performance news portal frontend built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**. This application provides a seamless reading experience for users and a robust dashboard for administrators to manage categories and content.

---

## 🚀 Features

### **Public Portal**
- **Dynamic News Feed:** Categorized posts with featured cards.
- **Content Discovery:** Browse by category or search all content.
- **Detailed Articles:** Rich text rendering for in-depth stories.
- **SEO Optimized:** Automatic metadata, OpenGraph images, and JSON-LD for search engines.
- **Cookie Consent:** Privacy-focused banner integrated with Google Analytics.
- **Animated 404:** Custom Lottie-powered Not Found page.

### **Admin Dashboard**
- **Secure Authentication:** Login protected by **Google reCAPTCHA v3 Enterprise**.
- **Content Management (CMS):** Create, edit, and delete news articles with a Rich Text Editor (Tiptap).
- **Category Management:** Organize content into manageable categories.
- **User Profile:** Secure password update functionality.
- **Modern UI:** Built with Radix UI primitives and TanStack Table for data-heavy views.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** React Hooks & Server Actions
- **Forms & Validation:** [Zod](https://zod.dev/) + React State
- **API Client:** [Axios](https://axios-http.com/) with customized interceptors
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [Sonner](https://react-hot-toast.com/) (Toasts)
- **Animations:** [Lottie React](https://github.com/Gamote/lottie-react), [Tailwind Animate](https://github.com/jamiebuilds/tailwind-animate)

---

## 📂 Project Structure

```text
src/
├── app/               # Next.js App Router (Routes & Layouts)
│   ├── (auth)/        # Authentication routes (Login)
│   ├── (public)/      # Public-facing news pages
│   └── dashboard/     # Admin-only management area
├── components/        # Reusable UI components
│   └── ui/            # Base Radix-based components
├── lib/               # Utility functions & Axios configuration
├── model/             # TypeScript interfaces & API models
├── types/             # Global type declarations
└── middleware.ts      # Authentication & route protection
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

---

## 🛠️ Getting Started

### **Prerequisites**
- Node.js 18.x or later
- pnpm (recommended) or npm

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/jonathangunawan30/portal-news-frontend.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```

### **Development**
Run the development server:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### **Building for Production**
Build the optimized application:
```bash
pnpm build
```
Start the production server:
```bash
pnpm start
```

---

## 🔒 Security & Performance

- **reCAPTCHA v3 Enterprise:** Integrated into the admin login to prevent automated attacks.
- **Auth Middleware:** Server-side route protection ensuring only authorized users access the dashboard.
- **Server Components:** Leverages Next.js RSC for faster initial page loads and better SEO.
- **Dynamic Imports:** Lottie animations and heavy editors are loaded only when needed.

---

&copy; 2026 Jonathan News Portal. All rights reserved. Built with ❤️ by [Jonathan Gunawan](https://github.com/jonathangunawan30).
