# 🚀 Final-Year-Project - Blockchain-Based Land Registry

## 📌 Project Structure

📂 **Main Project:** `Final-year-project`  
📂 **Sub-Projects:**
- `blockchain` (Smart Contract & Backend)
- `frontend` (User Interface)

---

## 📖 Documentation

📜 **Main README**  
📌 Location: `README.md`

📜 **Blockchain Sub-Project README**  
📌 Location: `blockchain/README.md`  
📌 Contains instructions for running Hardhat tasks:
```sh
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

📜 **Frontend Sub-Project README**  
📌 Location: `frontend/README.md`

---

## 📦 Requirements and Dependencies

### 🔗 **Blockchain Sub-Project** (`blockchain/package.json`)
**Dependencies:**
- `@nomicfoundation/hardhat-toolbox`
- `@nomiclabs/hardhat-ethers`
- `ethereumjs-testrpc`
- `hardhat`
- `prettier`
- `ts-node`
- `chai`
- `truffle`

### 🖼️ **Compare Image Sub-Project** (`blockchain/compare-image/package.json`)
**Dependencies:**
- `cors`
- `express`
- `jimp`
- `pixelmatch`
- `pngjs`

**Dev Dependencies:**
- `nodemon`

### 💻 **Frontend Sub-Project** (`frontend/package.json`)
**Dependencies:**
- `react`, `react-dom`, `next`
- `@reduxjs/toolkit`, `react-redux`
- `ethers`
- `antd`, `axios`, `framer-motion`
- `mapbox-gl`, `chart.js`, `moment`
- `react-toastify`, `react-icons`, `tailwindcss`

**Dev Dependencies:**
- `eslint`, `eslint-config-next`
- `typescript`
- `postcss`, `autoprefixer`

---

## ⚙️ Steps to Run the Project

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yisak-67/Final-year-project.git
cd Final-year-project
```

### 2️⃣ Setup Blockchain Sub-Project
Navigate to the blockchain directory:
```sh
cd blockchain
```
Install dependencies:
```sh
npm install
```
Run Hardhat tasks as specified in `blockchain/README.md`.

### 3️⃣ Setup Frontend Sub-Project
Navigate to the frontend directory:
```sh
cd ../frontend
```
Install dependencies:
```sh
npm install
```
Start the development server:
```sh
npm run dev
```

### 4️⃣ Other Sub-Projects
Follow similar steps for other sub-projects if needed, such as `blockchain/compare-image`.

---

## 🌎 Environment Variables
📌 Check for any required environment variables in the README or `.env.example` files and set them up accordingly.

---

## ❓ Need Help?
If you encounter any issues, refer to the README files or seek assistance. Feel free to contribute and improve the project! 🚀
