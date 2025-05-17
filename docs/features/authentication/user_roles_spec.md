# Authentication and User Roles Specification

## User Roles

The system will have three distinct user roles:

1. **Admin**

   - Has all capabilities of Lead and Member roles
   - Approves Lead role requests
   - First admin account is created automatically during system setup

2. **Lead**

   - Can create and view kudos
   - Approves Member role requests
   - Assigns team to members during approval
   - Any Lead can approve any Member request (not team-restricted)

3. **Member**
   - Can only view kudos

## Registration and Authentication

### User Registration

- Email/password authentication (company email)
- Additional required field: Job Title (free text)
- No email verification needed (using company emails)
- Moderate password security requirements
- New users have no role until approved
- Restricted access until approved for a role

### Role Request and Approval

- Users register with no initial role
- Separate interface for approval processes
- No additional information needed when requesting Lead role
- Admin approves Lead requests
- Leads approve Member requests and assign them to teams
- Users are restricted from accessing the system until approved

### Team Management

- Leads assign team when approving member requests
- No ongoing team management interface needed
- Team creation process to be determined during implementation (either Admin pre-created or Lead-created on the fly)

### Security

- Moderate password requirements
- No additional security measures like email verification
- No role revocation functionality required

### UI/UX

- Separate dedicated interfaces for Admin and Lead approvals
- Pending users are restricted until approved

### Implementation

- Next.js will be used as the technology stack
- Implement protected routes based on user roles:
  - Public routes: Login, Registration
  - Admin routes: Lead approval interface, all Lead/Member routes
  - Lead routes: Member approval interface, kudos creation, viewing
  - Member routes: Viewing kudos only
  - Pending user routes: Limited to a "waiting for approval" page
- Use Next.js middleware or higher-order components for route protection

## Open Questions

- Process for members joining multiple teams or switching teams
- Specific team creation/management implementation details
