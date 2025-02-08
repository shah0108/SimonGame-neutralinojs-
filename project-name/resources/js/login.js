// const userFilePath = 'users.json';

// // Initialize the user file if it doesn't exist
// async function initializeUserFile() {
//   try {
//     await Neutralino.filesystem.readFile(userFilePath);
//     console.log('User file exists.');
//   } catch (error) {
//     console.log('User file not found. Creating a new file...');
//     const defaultData = { users: [] }; // Default structure
//     try {
//       await Neutralino.filesystem.writeFile(userFilePath, JSON.stringify(defaultData, null, 2));
//       console.log('User file created successfully!');
//     } catch (writeError) {
//       console.error('Failed to create user file:', writeError);
//     }
//   }
// }

// // Read user data from the JSON file
// async function readUserData() {
//   try {
//     const data = await Neutralino.filesystem.readFile(userFilePath);
//     console.log('User data read successfully.');
//     return JSON.parse(data);
//   } catch (error) {
//     console.error('Error reading user file:', error);
//     return { users: [] };
//   }
// }

// // Save user data to the JSON file
// async function saveUserData(users) {
//   try {
//     await Neutralino.filesystem.writeFile(userFilePath, JSON.stringify({ users }, null, 2));
//     console.log('User data saved successfully!');
//   } catch (error) {
//     console.error('Error saving user file:', error);
//   }
// }

// // Handle Sign-Up Form Submission
// document.getElementById('signup-form').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   console.log('Sign-up form submitted.');

//   const username = document.getElementById('signup-name').value;
//   const email = document.getElementById('signup-email').value;
//   const password = document.getElementById('signup-password').value;

//   // Validation
//   if (!username || !email || !password) {
//     alert('All fields are required!');
//     return;
//   }

//   const userData = await readUserData();

//   // Check if email is already registered
//   const userExists = userData.users.some(user => user.email === email);
//   if (userExists) {
//     alert('Email already registered. Please log in.');
//     return;
//   }

//   // Add new user to the list
//   userData.users.push({ username, email, password });

//   // Save updated user data
//   await saveUserData(userData.users);

//   alert('Account created successfully! Redirecting to login...');
//   window.location.href = 'login.html'; // Redirect to login page
// });

// // Handle Login Form Submission
// document.getElementById('login-form').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   console.log('Login form submitted.');

//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-password').value;

//   const userData = await readUserData();

//   // Find user by email
//   const user = userData.users.find(user => user.email === email);

//   if (!user) {
//     alert('Email not registered. Please sign up.');
//     return;
//   }

//   if (user.password !== password) {
//     alert('Incorrect password. Please try again.');
//     return;
//   }

//   // Valid user
//   localStorage.setItem('isLoggedIn', 'true');
//   localStorage.setItem('username', user.username || 'Guest');
//   window.location.href = 'index.html'; // Redirect to main page
// });

// // Initialize the user file when the script loads
// initializeUserFile();


const userFilePath = `${NL_PATH}/users.json`; // Use Neutralino's predefined path

// Initialize Neutralino
Neutralino.init();

// Initialize the user file if it doesn't exist
async function initializeUserFile() {
    try {
        await Neutralino.filesystem.readFile(userFilePath);
        console.log('User file exists.');
    } catch (error) {
        console.log('User file not found. Creating a new one...');
        const defaultData = { users: [] }; 
        await saveUserData(defaultData.users);
    }
}

// Read user data from the JSON file
async function readUserData() {
    try {
        const data = await Neutralino.filesystem.readFile(userFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading user file:', error);
        return { users: [] };
    }
}

// Save user data to the JSON file
async function saveUserData(users) {
    try {
        await Neutralino.filesystem.writeFile(userFilePath, JSON.stringify({ users }, null, 2));
        console.log('User data saved successfully!');
    } catch (error) {
        console.error('Error saving user file:', error);
    }
}

// DOM Ready event
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Sign-up form submitted.');

            const username = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value.trim();

            if (!username || !email || !password) {
                alert('All fields are required!');
                return;
            }

            const userData = await readUserData();
            const userExists = userData.users.some(user => user.email.toLowerCase() === email.toLowerCase());

            if (userExists) {
                alert('Email already registered. Please log in.');
                return;
            }

            userData.users.push({ username, email, password });
            await saveUserData(userData.users);

            alert('Account created successfully! Redirecting to login...');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Login form submitted.');

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();

            const userData = await readUserData();
            const user = userData.users.find(user => user.email.toLowerCase() === email.toLowerCase());

            if (!user) {
                alert('Email not registered. Please sign up.');
                return;
            }

            if (user.password !== password) {
                alert('Incorrect password. Please try again.');
                return;
            }

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', user.username || 'Guest');
            window.location.href = 'index.html';
        });
    }
});

// Initialize user file on script load
initializeUserFile();
