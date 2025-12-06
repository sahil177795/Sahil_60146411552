/**
 * Access Manager - Client-side access request management system
 * Uses localStorage for persistent storage of access requests
 */

var AccessManager = (function() {
    'use strict';
    
    var STORAGE_KEY = 'access_requests';
    
    /**
     * Get all access requests from localStorage
     * @returns {Array} Array of access request objects
     */
    function getAllRequests() {
        try {
            var data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error reading requests from localStorage:', e);
            return [];
        }
    }
    
    /**
     * Save access requests to localStorage
     * @param {Array} requests - Array of access request objects
     * @returns {boolean} True if save was successful
     */
    function saveRequests(requests) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
            return true;
        } catch (e) {
            console.error('Error saving requests to localStorage:', e);
            return false;
        }
    }
    
    /**
     * Submit a new access request
     * @param {Object} requestData - Access request data
     * @returns {boolean} True if request was submitted successfully
     */
    function submitRequest(requestData) {
        try {
            var requests = getAllRequests();
            
            // Validate required fields
            if (!requestData.requesterName || !requestData.requesterEmail || 
                !requestData.accessType || !requestData.reason) {
                return false;
            }
            
            // Add timestamp and ID if not present
            if (!requestData.requestDate) {
                requestData.requestDate = new Date().toISOString();
            }
            if (!requestData.id) {
                requestData.id = 'REQ-' + Date.now();
            }
            if (!requestData.status) {
                requestData.status = 'pending';
            }
            
            requests.push(requestData);
            return saveRequests(requests);
        } catch (e) {
            console.error('Error submitting request:', e);
            return false;
        }
    }
    
    /**
     * Get a specific request by ID
     * @param {string} requestId - Request ID
     * @returns {Object|null} Request object or null if not found
     */
    function getRequest(requestId) {
        var requests = getAllRequests();
        for (var i = 0; i < requests.length; i++) {
            if (requests[i].id === requestId) {
                return requests[i];
            }
        }
        return null;
    }
    
    /**
     * Revoke an access request
     * @param {string} requestId - Request ID to revoke
     * @returns {boolean} True if request was revoked successfully
     */
    function revokeRequest(requestId) {
        try {
            var requests = getAllRequests();
            var found = false;
            
            for (var i = 0; i < requests.length; i++) {
                if (requests[i].id === requestId) {
                    requests[i].status = 'revoked';
                    requests[i].revokedDate = new Date().toISOString();
                    found = true;
                    break;
                }
            }
            
            if (found) {
                return saveRequests(requests);
            }
            return false;
        } catch (e) {
            console.error('Error revoking request:', e);
            return false;
        }
    }
    
    /**
     * Delete an access request permanently
     * @param {string} requestId - Request ID to delete
     * @returns {boolean} True if request was deleted successfully
     */
    function deleteRequest(requestId) {
        try {
            var requests = getAllRequests();
            var newRequests = [];
            var found = false;
            
            for (var i = 0; i < requests.length; i++) {
                if (requests[i].id !== requestId) {
                    newRequests.push(requests[i]);
                } else {
                    found = true;
                }
            }
            
            if (found) {
                return saveRequests(newRequests);
            }
            return false;
        } catch (e) {
            console.error('Error deleting request:', e);
            return false;
        }
    }
    
    /**
     * Update request status
     * @param {string} requestId - Request ID
     * @param {string} newStatus - New status (pending, approved, revoked)
     * @returns {boolean} True if status was updated successfully
     */
    function updateStatus(requestId, newStatus) {
        try {
            var validStatuses = ['pending', 'approved', 'revoked'];
            if (validStatuses.indexOf(newStatus) === -1) {
                console.error('Invalid status:', newStatus);
                return false;
            }
            
            var requests = getAllRequests();
            var found = false;
            
            for (var i = 0; i < requests.length; i++) {
                if (requests[i].id === requestId) {
                    requests[i].status = newStatus;
                    requests[i].statusUpdatedDate = new Date().toISOString();
                    found = true;
                    break;
                }
            }
            
            if (found) {
                return saveRequests(requests);
            }
            return false;
        } catch (e) {
            console.error('Error updating status:', e);
            return false;
        }
    }
    
    /**
     * Get requests by email
     * @param {string} email - Email address
     * @returns {Array} Array of requests for the given email
     */
    function getRequestsByEmail(email) {
        var requests = getAllRequests();
        var result = [];
        var emailLower = email.toLowerCase();
        
        for (var i = 0; i < requests.length; i++) {
            if (requests[i].requesterEmail.toLowerCase() === emailLower) {
                result.push(requests[i]);
            }
        }
        
        return result;
    }
    
    /**
     * Clear all requests (for testing/demo purposes)
     * @returns {boolean} True if cleared successfully
     */
    function clearAllRequests() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (e) {
            console.error('Error clearing requests:', e);
            return false;
        }
    }
    
    // Public API
    return {
        getAllRequests: getAllRequests,
        submitRequest: submitRequest,
        getRequest: getRequest,
        revokeRequest: revokeRequest,
        deleteRequest: deleteRequest,
        updateStatus: updateStatus,
        getRequestsByEmail: getRequestsByEmail,
        clearAllRequests: clearAllRequests
    };
})();
