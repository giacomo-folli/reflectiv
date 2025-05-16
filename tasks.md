# Project Task List (Hierarchical List with IDs, Status, Steps)

All tasks are aligned with the requirements and PDR. 
Status: TODO unless otherwise noted.

## 1. Frontend (Svelte/SvelteKit + TypeScript)

- **FE-1** Set up SvelteKit project with TypeScript [Status: DONE]
    - Initialize new SvelteKit project
    - Configure TypeScript
    - Set up project structure
    - Add linting/formatting
- **FE-2** HomePage: URL input & question generation [Status: DONE]
    - Design layout
    - Add form for URLs
    - Add submit button
    - Display submitted URLs
    - Add 'generate questions' button
    - Show loading/feedback
- **FE-3** Manage ChatGPT URLs (delete) [Status: DONE]
    - Add delete button
    - Confirmation dialog
    - Update UI/backend after deletion
- **FE-4** DiaryPage: daily question & reflection [Status: DONE]
    - Design layout
    - Show today's question
    - Add text area
    - Add save button
    - Show confirmation/error
    - Navigation controls
    - Show past questions/entries
- **FE-5** SettingsPage (optional/future) [Status: TODO]
    - Design settings page [Status: TODO]
    - Add API key/preferences UI [Status: TODO]
- **FE-6** Error handling & user feedback [Status: TODO]
    - Display error banners/messages [Status: TODO]
    - Retry options for failed actions [Status: TODO]

---

## 2. Backend (SvelteKit Endpoints)

- **BE-1** Set up SvelteKit server routes [Status: DONE]
    - Create `/api/process-chats` 
    - Create `/api/diary/question` 
    - Create `/api/diary/entry` 
    - Create `/api/diary/entries` 
    - Input validation for all 
- **BE-2** POST /api/process-chats [Status: DONE]
    - Receive URLs 
    - Validate URLs 
    - Fetch chat content 
    - Handle errors 
    - Call OpenAI API 
    - Store questions 
- **BE-3** GET /api/diary/question [Status: TODO]
    - Receive date/day param 
    - Fetch correct question 
    - Return question 
- **BE-4** POST /api/diary/entry [Status: TODO]
    - Receive entry data 
    - Store in DB 
    - Return status 
- **BE-5** GET /api/diary/entries [Status: TODO]
    - Receive query params 
    - Fetch entries 
    - Return data
- **BE-6** Error handling (backend) [Status: TODO]
    - Handle invalid URLs 
    - Handle OpenAI API errors 
    - Handle DB errors 
    - Handle network errors 
    - Return clear messages/codes

---

## 3. Database (SQLite)

- **DB-1** Set up SQLite database [Status: DONE]
    - Create DB file 
    - Configure access in backend 
- **DB-2** Implement schema [Status: DONE]
    - Create ChatSessions table 
    - Create ChatURLs table 
    - Create GeneratedQuestions table 
    - Create DiaryEntries table 
- **DB-3** Data access layer [Status: TODO]
    - Write parameterized queries 
    - Test CRUD operations 
- **DB-4** Ensure secure storage [Status: TODO]
    - Store DB in secure location 
    - Document location

---

## 4. Integrations

- **INT-1** Integrate with OpenAI API [Status: TODO]
    - Securely store/manage API key 
    - Implement API call logic 
    - Handle errors/responses 
- **INT-2** Fetch & parse ChatGPT URLs [Status: TODO]
    - Fetch shared URL 
    - Parse/extract text 
    - Handle HTML/JS-specific cases 
    - Handle errors 

---

## 5. Non-Functional & UI/UX

- **NF-1** Minimalistic, intuitive UI [Status: TODO]
    - Use clean layouts
    - Focus on reflection tasks 
    - User guidance/tooltips 
- **NF-2** Privacy statement [Status: TODO]
    - Draft privacy statement 
    - Display in UI 
    - Explain OpenAI data usage
- **NF-3** User-facing error messages [Status: TODO]
    - Map errors to messages 
    - Display in UI 
    - Guide user on next steps 
- **NF-4** Code quality & maintainability 
    - Modularize code 
    - Add comments/JSDoc 
    - Follow best practices 

---


All tasks above are fully aligned with [requirements.md] and [prd.md]. Update statuses as you progress.

---

## Notes
- Update this checklist as requirements evolve or new files (e.g. `requirements.md`) are added.
- Refer to `prd.md` for detailed design and rationale.
