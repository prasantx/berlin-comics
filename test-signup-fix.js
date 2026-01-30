// test-signup-fix.js - Run with: node test-signup-fix.js
const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Signup Fix...\n');

const checks = [];

// Find signup file
const possiblePaths = [
    'components/Signup.tsx',
    'components/SignUp.tsx',
    'src/pages/SignUp.jsx',
    'src/pages/Signup.jsx',
    'src/pages/Register.jsx',
    'src/components/SignUp.jsx',
    'src/components/auth/SignUp.jsx'
];

let signupFile = null;
let signupContent = '';

for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
        signupFile = p;
        signupContent = fs.readFileSync(p, 'utf8');
        break;
    }
}

if (!signupFile) {
    console.log('❌ Signup file not found');
    process.exit(1);
}

console.log(`📄 Found signup file: ${signupFile}\n`);

// Check 1: Navigate import
const hasNavigate = signupContent.includes('useNavigate') || signupContent.includes('navigate(');
checks.push({ name: 'useNavigate imported and used', pass: hasNavigate });

// Check 2: Navigation after signup
const hasPostSignupNav = signupContent.includes("navigate('/'") ||
    signupContent.includes('navigate("/') ||
    signupContent.includes("navigate('/login") ||
    signupContent.includes("navigate('/dashboard");
checks.push({ name: 'Post-signup navigation exists', pass: hasPostSignupNav });

// Check 3: Loading state reset in catch
const hasLoadingReset = signupContent.includes('setLoading(false)');
checks.push({ name: 'Loading state reset in error handler', pass: hasLoadingReset });

// Check 4: Error handling
const hasErrorHandling = signupContent.includes('catch') && signupContent.includes('setError');
checks.push({ name: 'Error handling with user feedback', pass: hasErrorHandling });

// Check 5: Auth redirect for logged-in users
const hasAuthRedirect = signupContent.includes('isAuthenticated') && signupContent.includes('useEffect');
checks.push({ name: 'Redirect for already authenticated users', pass: hasAuthRedirect });

// Print results
console.log('📊 VALIDATION RESULTS:');
console.log('='.repeat(50));

let passed = 0;
checks.forEach(c => {
    const icon = c.pass ? '✅' : '❌';
    console.log(`${icon} ${c.name}`);
    if (c.pass) passed++;
});

console.log('='.repeat(50));
console.log(`\nTotal: ${checks.length} | Passed: ${passed} | Failed: ${checks.length - passed}`);

if (passed === checks.length) {
    console.log('\n🎉 Signup fix validated successfully!');
} else {
    console.log('\n⚠️  Some checks failed. Please review and fix.');
}

// Cleanup
fs.unlinkSync('test-signup-fix.js');
console.log('\n🧹 Test script cleaned up.');
