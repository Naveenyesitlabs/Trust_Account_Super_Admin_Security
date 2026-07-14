# Super Admin Frontend Security Validation Report

Date: July 7, 2026

## Scope

This report covers only the Super Admin frontend application located in this project.

Validation mapping:

- Code against = SAST
- Packages against = SCA
- Running UI/login/API usage against = DAST

## Executive Summary

Overall Status: Needs Hardening

Overall Score: 6/10

Summary:

- Super Admin login flow is operational and authenticated login was successfully validated.
- Package-level dependency audit is clean at the time of assessment.
- The application has important frontend security weaknesses around credential persistence, token storage, and client-side route protection.

## 1. SAST - Static Application Security Testing

Scope:
Frontend source code review of authentication flow, token handling, route protection, API calling patterns, and stored credential behavior.

Status: Completed

Score: 5/10

Positive findings:

- API requests for protected backend actions include a bearer token.
- Super Admin role is checked after login and during user verification flow.
- Backend base URL is environment-driven using `VITE_BACKEND_URL`.

Key observations:

- The `Keep me logged in` feature stores the user password in a browser cookie after client-side encryption using a hardcoded key `secretKey`, which is recoverable and not secure. See [src/pages/Login.jsx](E:\Trust_Account_Security_Test_Report\trust-account-super-admin-main\trust-account-super-admin-main\src\pages\Login.jsx:33) and [src/component/AutoFillLogin.jsx](E:\Trust_Account_Security_Test_Report\trust-account-super-admin-main\trust-account-super-admin-main\src\component\AutoFillLogin.jsx:28).
- The saved credential cookie is set without `Secure`, `SameSite`, or `HttpOnly` protections. See [src/pages/Login.jsx](E:\Trust_Account_Security_Test_Report\trust-account-super-admin-main\trust-account-super-admin-main\src\pages\Login.jsx:44).
- The JWT token is stored in `localStorage`, which increases exposure risk in case of XSS. See [src/redux/slices/adminSlice.js](E:\Trust_Account_Security_Test_Report\trust-account-super-admin-main\trust-account-super-admin-main\src\redux\slices\adminSlice.js:153).
- Route protection is not enforced at the router level. The `/user-management` page is directly routable and only redirects after component logic runs. See [src/App.jsx](E:\Trust_Account_Security_Test_Report\trust-account-super-admin-main\trust-account-super-admin-main\src\App.jsx:10) and [src/pages/UserManagement.jsx](E:\Trust_Account_Security_Test_Report\trust-account-super-admin-main\trust-account-super-admin-main\src\pages\UserManagement.jsx:57).
- The frontend still points to a staging backend URL in `.env`, which should be reviewed before production release. See [.env](E:\Trust_Account_Security_Test_Report\trust-account-super-admin-main\trust-account-super-admin-main.env:3).

Conclusion:
The Super Admin frontend is functional, but current credential persistence and client-side protection patterns do not meet a strong security posture.

## 2. SCA - Software Composition Analysis

Scope:
Package and dependency review using `npm audit`.

Status: Completed

Score: 10/10

Result:

- Known package vulnerabilities found: 0
- Dependency audit status: clean at time of assessment

Conclusion:
No known dependency vulnerability was reported by the package audit at the time of testing.

## 3. DAST - Dynamic Application Security Testing

Scope:
Runtime behavior review based on successful Super Admin login validation and frontend authentication flow behavior.

Status: Completed

Score: 6/10

Validated runtime result:

- Super Admin login was successful and returned a valid authenticated response with token.
- Protected backend calls are designed to send the bearer token from stored frontend session data.

Runtime observations:

- Session token persistence is handled in `localStorage` rather than a more secure server-managed cookie approach.
- The `Keep me logged in` flow persists recoverable credentials on the client side.
- Client-side route protection depends on post-load checks instead of a stricter protected-route wrapper.

Conclusion:
The login flow is working, but client-side session storage and remembered-credential handling reduce runtime security confidence.

## Final Client Conclusion

The Super Admin frontend is operational and package security is currently clean. However, this application should be considered partially secure rather than fully hardened because it stores recoverable login credentials on the client side, persists tokens in `localStorage`, and relies on softer client-side route guarding.

Recommended client-facing verdict:

The Super Admin application is functional and usable, but additional frontend hardening is recommended before calling it strongly secure from a privileged-access perspective.

<!--

SAST = code against review
SCA  = packages/dependencies audit
DAST = running backend/API validation


* Final scoring
_________________________________

SAST: 5/10
SCA: 10/10
DAST: 6/10
Overall Score: 6/10

Overall Status: Needs Hardening

Most important findings:

The password is being stored in a cookie when "Keep me logged in" is enabled.

The encryption key is hardcoded in the frontend.

The JWT token is being stored in localStorage.

Route protection is not implemented using a strict protected-route wrapper.

-->
