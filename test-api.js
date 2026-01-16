// Test script to verify API connection
// Run this in browser console when the app is running

// Test API connection
async function testAPIConnection() {
  try {
    console.log('Testing API connection...');
    
    // Test register endpoint
    const registerData = {
      first_name: 'Test',
      middle_name: 'User',
      last_name: 'API',
      second_last_name: 'Test',
      document_type: 'DNI',
      document_number: '12345678',
      phone: '0991234567',
      email: 'test@example.com',
      password: 'password123'
    };
    
    console.log('Testing register endpoint...');
    const registerResponse = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(registerData)
    });
    
    const registerResult = await registerResponse.json();
    console.log('Register response:', registerResult);
    
    // Test login endpoint
    console.log('Testing login endpoint...');
    const loginResponse = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginResult = await loginResponse.json();
    console.log('Login response:', loginResult);
    
    if (loginResult.access_token) {
      console.log('Login successful! Token:', loginResult.access_token);
      
      // Test profile endpoint with token
      console.log('Testing profile endpoint...');
      const profileResponse = await fetch('http://127.0.0.1:8000/api/profile', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${loginResult.access_token}`
        }
      });
      
      const profileResult = await profileResponse.json();
      console.log('Profile response:', profileResult);
      
      // Test logout
      console.log('Testing logout endpoint...');
      const logoutResponse = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${loginResult.access_token}`
        }
      });
      
      const logoutResult = await logoutResponse.json();
      console.log('Logout response:', logoutResult);
    }
    
  } catch (error) {
    console.error('API test error:', error);
  }
}

// Auto-run test
testAPIConnection();
