# Voting System API Integration Documentation

## Overview
The voting system is now fully integrated with mock data simulation to test the complete voting flow from design selection through vote recording and duplicate detection.

---

## Architecture

### 1. **Mock Data Files**

#### `src/data/voters-mock-data.ts`
Contains simulated voter records with email/phone verification:
- Pre-populated with 5 sample voters
- Each voter has: `id`, `email/phone`, `designId`, `designName`, `voteDate`
- Used to simulate duplicate vote detection

---

## 2. **API Integration**

### Vote Submission Endpoint
**Path:** `src/app/api/vote/submit/route.ts`

#### Request Body
```json
{
  "designId": 1,
  "designName": "Design Name",
  "email": "user@example.com" // OR
  "phone": "+1234567890"
}
```

#### Response Cases

**Success (201):**
```json
{
  "success": true,
  "message": "Vote recorded successfully",
  "data": {
    "voteId": "v6",
    "designId": 1,
    "designName": "Design Name",
    "votedAt": "2026-01-21T10:30:00Z"
  }
}
```

**Duplicate Vote (409):**
```json
{
  "success": false,
  "message": "You have already voted in this cycle",
  "error": {
    "type": "ALREADY_VOTED",
    "previousVoteData": {
      "designName": "Abstract Dreams",
      "voteDate": "2026-01-19T14:22:00Z"
    }
  }
}
```

---

## 3. **Components**

### Vote Modal
**File:** `src/components/website/vote/vote-modal.tsx`

**Props:**
```tsx
interface VoteModalProps {
  designId: number;
  designName: string;
  onClose: () => void;
}
```

**Features:**
- Email/Phone toggle tabs
- Real API integration with `/api/vote/submit`
- Loading states and error handling
- Automatic routing on success or duplicate detection

### VoteGrid Component
**File:** `src/components/website/vote/VoteGrid.tsx`

**Updated Features:**
- Passes `designId` and `designName` to modal
- Tracks selected design state
- "View & Vote" button on each design card

### DesignerDetailCard Component
**File:** `src/components/website/vote/DesignerDetailCard.tsx`

**Updated Features:**
- Vote buttons on design detail page
- Enhanced modal integration with design info
- Better styling (orange theme)

---

## 4. **Pages**

### Vote Recorded Page
**Path:** `/vote/voteRecorded`

**Features:**
- Shows vote confirmation with Vote ID
- Displays design name and timestamp
- Vote details card with gradient styling
- Success metrics and next steps
- Navigation to vote again or home

**URL Parameters:**
```
/vote/voteRecorded?voteId=v6&design=Design%20Name
```

### Already Voted Page
**Path:** `/vote/lookLike`

**Features:**
- Shows previous vote details
- Displays design name and vote date
- FAQ section explaining the rules
- Support contact option
- Warning about duplicate voting attempts

**URL Parameters:**
```
/vote/lookLike?design=Design%20Name&date=2026-01-19T14:22:00Z
```

---

## 5. **Testing the Voting Flow**

### Test Case 1: New Vote
1. Go to `/vote/finalist`
2. Click "View & Vote" on any design
3. Enter email: `newuser@example.com`
4. Submit → Redirected to `/vote/voteRecorded`

### Test Case 2: Duplicate Vote Detection
1. Go to `/vote/finalist`
2. Click "View & Vote" on any design
3. Enter email: `john.doe@gmail.com` (existing voter)
4. Submit → Redirected to `/vote/lookLike`

### Existing Test Emails
- `john.doe@gmail.com` - voted for Design ID 1
- `alice.smith@outlook.com` - voted for Design ID 2
- `test@example.com` - voted for Design ID 4

### Existing Test Phones
- `+2348012345678` - voted for Design ID 3
- `+2349876543210` - voted for Design ID 5

---

## 6. **Flow Diagram**

```
User on Finalist Page
        ↓
   Clicks "View & Vote"
        ↓
   Vote Modal Opens
        ↓
   User enters Email/Phone
        ↓
   Submits Vote
        ↓
   API calls /api/vote/submit
        ↓
   ┌─────────────────────┐
   │  Check if voter exists
   │     
   ├─────────────────┬──────────────┐
   │                 │              │
   ↓                 ↓              ↓
NEW VOTER      DUPLICATE      ERROR
   │                │              │
   ↓                ↓              ↓
Success (201)   Already Voted  Invalid Input
   │              (409)         (400)
   ↓                │              │
/vote/voteRecorded /vote/lookLike  Modal shows
   ↓                ↓              error
Vote ID Card    Warning Card     
   │                │
   ↓                ↓
Navigation      Navigation
Options         Options
```

---

## 7. **Database Mock Structure**

### Voter Record
```ts
type Voter = {
  id: string;           // v1, v2, v3...
  email?: string;       // user@example.com
  phone?: string;       // +1234567890
  designId: number;     // 1, 2, 3...
  designName: string;   // "Design Name"
  voteDate: string;     // ISO timestamp
  ipAddress?: string;   // Future use
};
```

---

## 8. **Error Handling**

| Error Type | Status | Action |
|-----------|--------|--------|
| ALREADY_VOTED | 409 | Route to `/vote/lookLike` |
| INVALID_INPUT | 400 | Show modal error message |
| ERROR | 500 | Show generic error message |

---

## 9. **Future Enhancements**

- [ ] Real database integration (MongoDB/PostgreSQL)
- [ ] SMS verification for phone votes
- [ ] Email confirmation
- [ ] Vote editing within grace period
- [ ] Admin dashboard for vote analytics
- [ ] IP-based fraud detection
- [ ] Rate limiting per IP
- [ ] Captcha verification
- [ ] Integration with authentication system

---

## 10. **API Endpoints Summary**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/vote/submit` | Submit a vote |
| GET | `/api/vote/submit` | Get all votes (admin) |

---

## 11. **Component Tree**

```
App
├── (website)
│   ├── vote/finalist/page.tsx
│   │   └── VoteGrid
│   │       ├── Design Card
│   │       └── VoteModal
│   ├── vote/designerDetails/page.tsx
│   │   └── DesignerDetailCard
│   │       └── VoteModal
│   ├── vote/voteRecorded/page.tsx
│   │   └── Success Page
│   └── vote/lookLike/page.tsx
│       └── Already Voted Page
└── api/vote/submit
    └── POST Handler
```

---

## 12. **Files Modified/Created**

### Created:
- ✅ `src/data/voters-mock-data.ts`
- ✅ `src/app/api/vote/submit/route.ts`

### Updated:
- ✅ `src/components/website/vote/vote-modal.tsx`
- ✅ `src/components/website/vote/VoteGrid.tsx`
- ✅ `src/components/website/vote/DesignerDetailCard.tsx`
- ✅ `src/app/(website)/vote/voteRecorded/page.tsx`
- ✅ `src/app/(website)/vote/lookLike/page.tsx`

---

## 13. **Configuration Variables**

No environment variables needed for mock testing. When moving to production:

```env
NEXT_PUBLIC_API_URL=https://api.maltina-tour.com
API_SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
EMAIL_SERVICE_URL=your_email_service
SMS_SERVICE_URL=your_sms_service
```

---

## Quick Start

1. **Test New Vote:**
   - Go to `/vote/finalist`
   - Click vote button with a new email
   - Confirm success page

2. **Test Duplicate Detection:**
   - Use: `john.doe@gmail.com`
   - Should redirect to `/vote/lookLike`

3. **Test Designer Details Page:**
   - Click any design from finalist grid
   - Click "Vote for this Design"
   - Try voting

---

**Last Updated:** January 21, 2026
**Status:** ✅ Complete with Mock Data Integration
