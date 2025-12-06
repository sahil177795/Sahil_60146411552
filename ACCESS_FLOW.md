# Access Request and Revoke Flow Documentation

## Overview

This access management system allows visitors to request access to premium content (detailed portfolio, certifications, code samples, etc.) and manage their access requests. The system is implemented as a client-side application using HTML, CSS, and JavaScript with localStorage for data persistence.

## Features

### 1. Access Request Flow
- **Request Form**: Users can submit access requests by filling out a comprehensive form
- **Required Information**:
  - Name
  - Email address
  - Type of access requested (Portfolio, Code Samples, Certifications, References, Full Resume)
  - Reason for access request
- **Optional Information**:
  - Company/Organization name

### 2. Access Revoke Flow
- **Search Functionality**: Find requests by email address
- **View All Requests**: Display all active access requests
- **Revoke Access**: Mark a request as revoked (soft delete)
- **Delete Request**: Permanently remove a request from the system
- **Status Tracking**: Visual indicators for request status (Pending, Approved, Revoked)

## File Structure

```
├── access-request.html    # Access request submission page
├── access-revoke.html     # Access revoke management page
├── access-manager.js      # Core JavaScript library for managing requests
└── ACCESS_FLOW.md         # This documentation file
```

## Technical Implementation

### Storage
- **Technology**: Browser localStorage
- **Storage Key**: `access_requests`
- **Data Format**: JSON array of request objects

### Request Object Structure
```javascript
{
  id: "REQ-{timestamp}",
  requesterName: "string",
  requesterEmail: "string",
  company: "string (optional)",
  accessType: "string",
  reason: "string",
  status: "pending|approved|revoked",
  requestDate: "ISO 8601 timestamp",
  revokedDate: "ISO 8601 timestamp (optional)",
  statusUpdatedDate: "ISO 8601 timestamp (optional)"
}
```

## Access Manager API

The `AccessManager` JavaScript module provides the following methods:

### Public Methods

1. **getAllRequests()**
   - Returns: Array of all access requests
   - Usage: `AccessManager.getAllRequests()`

2. **submitRequest(requestData)**
   - Parameters: requestData object
   - Returns: boolean (success/failure)
   - Usage: `AccessManager.submitRequest({...})`

3. **getRequest(requestId)**
   - Parameters: requestId string
   - Returns: Request object or null
   - Usage: `AccessManager.getRequest('REQ-123456')`

4. **revokeRequest(requestId)**
   - Parameters: requestId string
   - Returns: boolean (success/failure)
   - Usage: `AccessManager.revokeRequest('REQ-123456')`

5. **deleteRequest(requestId)**
   - Parameters: requestId string
   - Returns: boolean (success/failure)
   - Usage: `AccessManager.deleteRequest('REQ-123456')`

6. **updateStatus(requestId, newStatus)**
   - Parameters: requestId string, newStatus string
   - Returns: boolean (success/failure)
   - Usage: `AccessManager.updateStatus('REQ-123456', 'approved')`

7. **getRequestsByEmail(email)**
   - Parameters: email string
   - Returns: Array of requests for the given email
   - Usage: `AccessManager.getRequestsByEmail('user@example.com')`

8. **clearAllRequests()**
   - Returns: boolean (success/failure)
   - Usage: `AccessManager.clearAllRequests()`

## User Workflow

### Requesting Access

1. User navigates to the resume page
2. Clicks "Request Access" link in the Access Management section
3. Fills out the access request form with required information
4. Submits the form
5. Request is stored locally and displayed in "Your Access Requests" section
6. User receives confirmation message

### Revoking Access

1. User navigates to "Revoke Access" page
2. (Optional) Searches for requests by email address
3. Views list of active requests
4. Clicks "Revoke" button on desired request
5. Confirms the revocation
6. Request status is updated to "revoked"
7. User receives confirmation message

### Deleting Requests

1. User navigates to "Revoke Access" page
2. Views list of requests
3. Clicks "Delete" button on desired request
4. Confirms the deletion
5. Request is permanently removed from localStorage
6. User receives confirmation message

## Visual Design

The interface follows the hacker theme consistent with the Jekyll resume site:
- **Color Scheme**: Black background with green text (Matrix-style)
- **Status Indicators**:
  - Pending: Yellow background
  - Approved: Green background
  - Revoked: Red background
- **Interactive Elements**: Green buttons with hover effects
- **Forms**: Monospace font with green borders

## Security Considerations

**Important Notes:**
1. This is a **client-side only** implementation using localStorage
2. Data is stored in the user's browser and is **not sent to any server**
3. This implementation is suitable for demonstration purposes
4. For production use, consider:
   - Server-side storage and processing
   - Authentication and authorization
   - Email notification system
   - Admin panel for managing requests
   - Database integration
   - API endpoints for request management

## Browser Compatibility

- Requires modern browser with localStorage support
- Compatible with:
  - Chrome 4+
  - Firefox 3.5+
  - Safari 4+
  - Edge (all versions)
  - Opera 10.5+
  - IE 8+ (with limitations)

## Future Enhancements

Potential improvements for the system:
1. Email notifications when requests are approved/revoked
2. Admin dashboard for managing all requests
3. Integration with backend API
4. Request expiration dates
5. File upload capability for supporting documents
6. Request history and audit log
7. Multi-language support
8. Export functionality (CSV, PDF)
9. Analytics and reporting

## Testing

To test the system:

1. **Submit a Request**:
   - Navigate to access-request.html
   - Fill out the form and submit
   - Verify the request appears in the list

2. **Search Requests**:
   - Navigate to access-revoke.html
   - Enter an email in the search box
   - Verify filtering works correctly

3. **Revoke Access**:
   - Click "Revoke" on a pending or approved request
   - Verify status changes to "revoked"

4. **Delete Request**:
   - Click "Delete" on any request
   - Verify request is removed from the list

5. **Data Persistence**:
   - Submit a request
   - Close and reopen the browser
   - Verify the request is still present

## Troubleshooting

### Requests Not Saving
- Check if localStorage is enabled in browser
- Verify browser storage quota is not exceeded
- Check browser console for errors

### Requests Not Displaying
- Clear browser cache and reload
- Check browser console for JavaScript errors
- Verify access-manager.js is loaded correctly

### Data Loss
- Note that clearing browser data will delete all requests
- localStorage is domain-specific
- Use export/backup features if implemented

## License

This access management system is part of Sahil's e-Resume project and follows the same licensing terms.

## Support

For questions or issues, contact: sahil_17@yahoo.com
