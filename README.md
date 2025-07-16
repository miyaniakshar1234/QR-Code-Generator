# QR Code Generator

A modern, responsive web application for generating QR codes instantly. Built with Python Flask backend and vanilla HTML/CSS/JavaScript frontend.

## 👨‍💻 Created By
**Akshar Miyani**
- 📧 Email: [miyaniakshar1234@gmail.com](mailto:miyaniakshar1234@gmail.com)
- 📱 Mobile: [+91 97371 60031](tel:+919737160031)
- 🐙 GitHub: [https://github.com/miyaniakshar1234](https://github.com/miyaniakshar1234)

---

## Features

- 🎨 Modern, responsive UI with gradient backgrounds
- ⚡ Real-time QR code generation
- 💾 Download QR codes as PNG files
- 📱 Mobile-friendly design
- ⌨️ Keyboard shortcuts (Enter to generate)
- 🔄 Auto-clear functionality
- ❌ Error handling with user-friendly messages

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **QR Generation**: Python qrcode library with PIL
- **Styling**: Modern CSS with gradients and animations

## Project Structure

```
QR_Code/
├── app.py              # Flask application
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html     # Main HTML template
├── static/
│   ├── style.css      # CSS styles
│   └── script.js      # JavaScript functionality
└── venv/              # Virtual environment
```

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Step 1: Clone or Download the Project
```cmd
# If using git
git clone https://github.com/miyaniakshar1234/QR-Code-Generator.git
cd QR_Code

# Or download and extract the project files
```

### Step 2: Create Virtual Environment
```cmd
python -m venv venv
```

### Step 3: Activate Virtual Environment

**On Windows (PowerShell/CMD):**
```cmd
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

You should see `(venv)` at the beginning of your command prompt, indicating the virtual environment is active.

### Step 4: Install Dependencies
```cmd
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- qrcode[pil] (QR code generation)
- Pillow (image processing)

## Running the Application

### Method 1: Using Virtual Environment Python (Recommended)
```cmd
# Make sure virtual environment is activated
venv\Scripts\activate

# Run the application
python app.py
```

### Method 2: Direct Virtual Environment Execution
```cmd
# Run without activating (Windows)
venv\Scripts\python.exe app.py
```

### Expected Output
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

## Accessing the Application

1. Open your web browser
2. Navigate to: `http://localhost:5000` or `http://127.0.0.1:5000`
3. The QR Code Generator interface will load

## How to Use

1. **Enter Text**: Type any text, URL, or data in the textarea
2. **Generate**: Click "Generate QR Code" button or press Enter
3. **Download**: Click "Download QR Code" to save as PNG file
4. **Clear**: Clear the input to reset the interface

### Supported Input Types
- URLs (https://example.com)
- Plain text (Hello World!)
- Email addresses (user@example.com)
- Phone numbers (+1234567890)
- WiFi credentials
- Contact information
- Any other text data

## Stopping the Application

Press `Ctrl+C` in the terminal where the app is running to stop the server.

## Deactivating Virtual Environment

When you're done working on the project:
```cmd
deactivate
```

## Troubleshooting

### Common Issues

**1. Module Not Found Error**
```
ModuleNotFoundError: No module named 'qrcode'
```
**Solution**: Make sure the virtual environment is activated and dependencies are installed:
```cmd
venv\Scripts\activate
pip install -r requirements.txt
```

**2. Port Already in Use**
```
Address already in use
```
**Solution**: Either stop the existing process or change the port in `app.py`:
```python
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change port to 5001
```

**3. Virtual Environment Issues**
If you encounter issues with the virtual environment, recreate it:
```cmd
# Remove existing venv
rmdir /s venv

# Create new virtual environment
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## Development

### File Structure Details

- **app.py**: Main Flask application with QR generation endpoint
- **templates/index.html**: HTML template with responsive design
- **static/style.css**: Modern CSS with gradients and animations
- **static/script.js**: JavaScript for dynamic functionality
- **requirements.txt**: Python package dependencies

### Adding Features

To add new features:
1. Modify the backend logic in `app.py`
2. Update the frontend in `templates/index.html`
3. Add styling in `static/style.css`
4. Implement JavaScript functionality in `static/script.js`

## 🚀 Deployment

This project is ready for deployment on various platforms:

### Deploy to Heroku

1. **Create a Heroku account** at [heroku.com](https://heroku.com)

2. **Install Heroku CLI** and login:
```bash
heroku login
```

3. **Create a new Heroku app**:
```bash
heroku create your-qr-generator-app
```

4. **Deploy to Heroku**:
```bash
git add .
git commit -m "Deploy QR Code Generator"
git push heroku main
```

5. **Open your deployed app**:
```bash
heroku open
```

### Deploy to Railway

1. **Fork this repository** on GitHub
2. **Visit [railway.app](https://railway.app)** and sign in with GitHub
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select your forked repository**
5. **Railway will automatically detect** the Python app and deploy it

### Deploy to Render

1. **Fork this repository** on GitHub
2. **Visit [render.com](https://render.com)** and sign in with GitHub
3. **Click "New"** → **"Web Service"**
4. **Connect your GitHub repository**
5. **Use these settings**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`

### GitHub Pages (Static Version)

For a static version without backend functionality:
1. **Fork this repository**
2. **Go to Settings** → **Pages**
3. **Select source**: Deploy from a branch
4. **Select branch**: main
5. **Your site will be available** at: `https://yourusername.github.io/repository-name`

## 📁 GitHub Repository Setup

### Quick Setup Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: QR Code Generator by Akshar Miyani"

# Add remote origin (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/qr-code-generator.git

# Push to GitHub
git push -u origin main
```

### Repository Structure for GitHub

```
qr-code-generator/
├── .gitignore          # Git ignore file
├── LICENSE             # MIT License
├── README.md           # This documentation
├── Procfile           # Heroku deployment config
├── runtime.txt        # Python version for deployment
├── requirements.txt   # Python dependencies
├── app.py            # Main Flask application
├── templates/
│   └── index.html    # HTML template
└── static/
    ├── style.css     # CSS styles
    └── script.js     # JavaScript functionality
```

## 🌟 Live Demo

Once deployed, your QR Code Generator will be accessible via:
- **Heroku**: `https://your-app-name.herokuapp.com`
- **Railway**: `https://your-app-name.up.railway.app`
- **Render**: `https://your-app-name.onrender.com`

## 📝 Environment Variables

For production deployment, you may want to set:
- `FLASK_ENV=production`
- `PORT` (automatically set by most platforms)

## 🔧 Development vs Production

The app automatically detects the environment:
- **Development**: Runs on `localhost:5000` with debug mode
- **Production**: Runs on `0.0.0.0` with the PORT environment variable

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all dependencies are properly installed
3. Verify the virtual environment is activated
4. Check that Python 3.7+ is installed

For deployment issues:
- Check platform-specific documentation
- Ensure all required files are committed to Git
- Verify requirements.txt includes all dependencies

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## ⭐ Show Your Support

If you found this project helpful, please give it a star on GitHub!

---

**Created with ❤️ by Akshar Miyani | Happy QR Code Generating! 🎉**
