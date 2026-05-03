
---

# 🎓 Student Budget Tracker

A sleek, responsive web application designed to help students manage their monthly finances. Users can set a monthly budget, track expenses by category, visualize spending through dynamic charts, and receive automated alerts for high-value transactions.

## 🚀 Features

*   **Budget Management:** Set a monthly spending limit and track the remaining balance in real-time.
*   **Categorized Tracking:** Log expenses under specific categories like Food, Stationery, Transport, Leisure, and more.
*   **Data Persistence:** Uses `LocalStorage` to ensure your data remains saved even after closing the browser.
*   **Visual Analytics:** Interactive doughnut chart powered by **Chart.js** to visualize spending distribution.
*   **Smart Alerts:** 
    *   Visual cues (color changes) when approaching or exceeding the budget.
    *   **Automated Email Alerts:** Integration with **EmailJS** to notify a parent or guardian if a single transaction exceeds ₹1000.
*   **Responsive Design:** Fully optimized for both desktop and mobile viewing.

---

## 🛠️ Tech Stack

*   **HTML5:** Structural layout and semantic elements.
*   **CSS3:** Custom styling, glassmorphism effects, and responsive grid layouts.
*   **JavaScript (ES6+):** Dynamic logic, LocalStorage management, and API integration.
*   **Chart.js:** For data visualization.
*   **EmailJS API:** For automated email notification services.

---

## 👥 The Team

This project was developed as a collaborative effort:

| Member | Responsibility | Primary Focus |
| :--- | :--- | :--- |
| **Abhishek** | **HTML** | Architected the app structure, input forms, and category display cards. |
| **Sanskar** | **CSS** | Created the visual identity, including the UI theme, gradients, and responsive layouts. |
| **Sanket** | **JavaScript** | Developed the core logic, storage systems, chart integration, and EmailJS alerts. |

---

## 📸 Screenshots



---

## 🔧 Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/student-budget-tracker.git]
    ```
2.  **Configuration:**
    *   Open `index.html` and replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key.
    *   Open `script.js` and replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID` with your specific EmailJS credentials.
    *   Change email id from `iamsanketspatil@gmail.com` to your email id in `send to` section.
3.  **Launch:**
    *   Simply open `index.html` in any modern web browser.

---

## 📝 How It Works

1.  **Set Budget:** Enter your total allowance for the month.
2.  **Add Expense:** Enter the amount, select a category, and click "Add".
3.  **Monitor:** The "Remaining" balance and the chart will update instantly.
4.  **Security:** If you enter an expense > ₹1000, an email is automatically dispatched via the EmailJS bridge to the configured parent email address.
5.  **Reset:** Use the "Reset All" button to clear the storage and start a new month.

---

