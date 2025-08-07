// Language definitions (with payment support fields)
const languages = {
    en: {
      loginTitle: "Login",
      usernamePlaceholder: "Username",
      passwordPlaceholder: "Password",
      loginButton: "Login",
      registerText: "New user? <a href='#' onclick='showRegister()'>Register</a>",
      registerTitle: "Register",
      regUsernamePlaceholder: "Username",
      regPasswordPlaceholder: "Password",
      registerButton: "Register",
      loginText: "Already have an account? <a href='#' onclick='showLogin()'>Login</a>",
      posTitle: "POS System",
      logoutButton: "Logout",
      loanTitle: "Add Loan",
      customerNamePlaceholder: "Customer Name",
      addLoanButton: "Add Loan",
      loanListTitle: "Loan List",
      searchPlaceholder: "Search by Name",
      paidAmount: "Paid Amount",
      remainingAmount: "Remaining",
      addPayment: "Add Payment",
      paymentPrompt: "Enter payment amount:",
      paymentSuccess: "Payment added successfully.",
      paymentError: "Invalid amount. Please enter a positive number less than or equal to the remaining amount.",
      delete: "Delete",
      paymentHistory: "Payment History"
    },
    my: {
      loginTitle: "ဝင်မည်",
      usernamePlaceholder: "အသုံးပြုသူအမည်",
      passwordPlaceholder: "စကားဝှက်",
      loginButton: "ဝင်မည်",
      registerText: "အသုံးပြုသူအသစ်? <a href='#' onclick='showRegister()'>မှတ်ပုံတင်ရန်</a>",
      registerTitle: "မှတ်ပုံတင်ရန်",
      regUsernamePlaceholder: "အသုံးပြုသူအမည်",
      regPasswordPlaceholder: "စကားဝှက်",
      registerButton: "မှတ်ပုံတင်မည်",
      loginText: "အသုံးပြုသူရှိပြီးသား? <a href='#' onclick='showLogin()">ဝင်ရန်</a>",
      posTitle: "POS စနစ်",
      logoutButton: "ထွက်ရန်",
      loanTitle: "ချေးငွေ ထည့်ရန်",
      customerNamePlaceholder: "အသုံးပြုသူအမည်",
      addLoanButton: "ထည့်မည်",
      loanListTitle: "ချေးငွေစာရင်း",
      searchPlaceholder: "အမည်ဖြင့်ရှာရန်",
      paidAmount: "ပေးငွေ",
      remainingAmount: "ကျန်ငွေ",
      addPayment: "ငွေပေးမည်",
      paymentPrompt: "ပေးမည့်ငွေပမာဏကို ရိုက်ထည့်ပါ:",
      paymentSuccess: "ငွေပေးခြင်း အောင်မြင်ပါသည်။",
      paymentError: "မှန်ကန်သော ငွေပမာဏကို ထည့်ပါ။ ကျန်ငွေထက်မကျော်ရ။",
      delete: "ဖျက်မည်",
      paymentHistory: "ပေးချေမှုမှတ်တမ်း"
    }
  };

let currentLanguage = 'my';

function setLanguage(lang) {
  currentLanguage = lang;
  document.getElementById("languageSelection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
  updateText();
}

function updateText() {
  let lang = languages[currentLanguage];
  // Login Section
  document.getElementById("loginTitle").innerText = lang.loginTitle;
  document.getElementById("username").placeholder = lang.usernamePlaceholder;
  document.getElementById("password").placeholder = lang.passwordPlaceholder;
  document.getElementById("loginButton").innerText = lang.loginButton;
  document.getElementById("registerText").innerHTML = lang.registerText;
  // Register Section
  document.getElementById("registerTitle").innerText = lang.registerTitle;
  document.getElementById("regUsername").placeholder = lang.regUsernamePlaceholder;
  document.getElementById("regPassword").placeholder = lang.regPasswordPlaceholder;
  document.getElementById("registerButton").innerText = lang.registerButton;
  document.getElementById("loginText").innerHTML = lang.loginText;
  // POS System Section
  if (document.getElementById("posTitle"))
    document.getElementById("posTitle").innerText = lang.posTitle;
  if (document.getElementById("logoutButton"))
    document.getElementById("logoutButton").innerText = lang.logoutButton;
  if (document.getElementById("loanTitle"))
    document.getElementById("loanTitle").innerText = lang.loanTitle;
  if (document.getElementById("customerName"))
    document.getElementById("customerName").placeholder = lang.customerNamePlaceholder;
  if (document.getElementById("addLoanButton"))
    document.getElementById("addLoanButton").innerText = lang.addLoanButton;
  if (document.getElementById("loanListTitle"))
    document.getElementById("loanListTitle").innerText = lang.loanListTitle;
  if (document.getElementById("searchInput"))
    document.getElementById("searchInput").placeholder = lang.searchPlaceholder;
}

function showRegister() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
}

function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let storedUser = localStorage.getItem("username") || "admin";
  let storedPass = localStorage.getItem("password") || "1234";
  if (username === storedUser && password === storedPass) {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("posSystem").classList.remove("hidden");
    updateText();
    displayLoans();
  } else {
    alert(currentLanguage === 'en' ? "Invalid username or password" : "အသုံးပြုသူအမည် သို့မဟုတ် စကားဝှက် မှားနေပါသည်");
  }
}

function register() {
  let regUsername = document.getElementById("regUsername").value;
  let regPassword = document.getElementById("regPassword").value;
  if (regUsername && regPassword) {
    localStorage.setItem("username", regUsername);
    localStorage.setItem("password", regPassword);
    alert(currentLanguage === 'en' ? "Registration Successful! Now you can log in." : "မှတ်ပုံတင်ခြင်း အောင်မြင်ပါသည်။ ဝင်ရောက်နိုင်ပါပြီ။");
    showLogin();
  } else {
    alert(currentLanguage === 'en' ? "Please enter both username and password." : "ကျေးဇူးပြု၍ အသုံးပြုသူအမည် နှင့် စကားဝှက် ရိုက်ထည့်ပါ။");
  }
}

// ===== Loan Management Functions =====

function addLoan() {
  let customerName = document.getElementById("customerName").value.trim();
  let loanDate = document.getElementById("loanDate").value;
  let loanAmount = parseFloat(document.getElementById("loanAmount").value);
  let loanItems = document.getElementById("loanItems").value.trim();

  if (!customerName || !loanDate || isNaN(loanAmount)) {
    alert(currentLanguage === 'en' ? "Please fill in all loan details correctly." : "ကျေးဇူးပြု၍ ချေးငွေအချက်အလက်များကို မှန်ကန်စွာ ဖြည့်ပါ။");
    return;
  }

  let durationComponents = calculateDurationComponents(loanDate);
  let durationText = `${durationComponents.years} years, ${durationComponents.months} months`;
  let loan = {
    id: Date.now(), // unique id
    loanDate: loanDate,
    loanAmount: loanAmount,
    paidAmount: 0,
    payments: [],
    loanItems: loanItems,
    duration: durationText,
    deleted: false
  };

  let customers = JSON.parse(localStorage.getItem("customers")) || {};
  if (customers[customerName]) {
    customers[customerName].push(loan);
  } else {
    customers[customerName] = [loan];
  }
  localStorage.setItem("customers", JSON.stringify(customers));
  displayLoans();
  // Clear inputs
  document.getElementById("customerName").value = "";
  document.getElementById("loanDate").value = "";
  document.getElementById("loanAmount").value = "";
  document.getElementById("loanItems").value = "";
}

function calculateDurationComponents(loanDate) {
  let start = new Date(loanDate);
  let now = new Date();
  let diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  let years = Math.floor(diffDays / 365);
  let months = Math.floor((diffDays % 365) / 30);
  return { years, months };
}

function displayLoans() {
  let customers = JSON.parse(localStorage.getItem("customers")) || {};
  let loanListDiv = document.getElementById("loanList");
  loanListDiv.innerHTML = "";

  let lang = languages[currentLanguage];

  // Create table and header
  let table = document.createElement("table");
  table.id = "loanTable";
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  [
    "No",
    "Customer Name",
    "Loan Amount",
    lang.paidAmount,
    lang.remainingAmount,
    "Loan Date",
    "Duration (Years, Months)",
    "Items",
    lang.paymentHistory,
    "Action"
  ].forEach(text => {
    let th = document.createElement("th");
    th.innerText = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  let tbody = document.createElement("tbody");
  let customerCounter = 1;
  for (let customer in customers) {
    let loans = customers[customer];
    loans.sort((a, b) => new Date(a.loanDate) - new Date(b.loanDate));
    loans.forEach((loan, index) => {
      let row = document.createElement("tr");
      if (loan.deleted) {
        row.classList.add("deleted");
      }
      // For the first loan of a customer, show customer No and name; else leave blank
      let tdNo = document.createElement("td");
      let tdCustomer = document.createElement("td");
      if (index === 0) {
        tdNo.innerText = customerCounter;
        tdCustomer.innerText = customer;
        customerCounter++;
      } else {
        tdNo.innerText = "";
        tdCustomer.innerText = "";
      }
      let tdAmount = document.createElement("td");
      tdAmount.innerText = loan.loanAmount.toLocaleString();

      let tdPaid = document.createElement("td");
      tdPaid.innerText = (loan.paidAmount || 0).toLocaleString();

      let tdRemain = document.createElement("td");
      let remain = loan.loanAmount - (loan.paidAmount || 0);
      tdRemain.innerText = remain.toLocaleString();

      let tdDate = document.createElement("td");
      tdDate.innerText = loan.loanDate;
      let tdDuration = document.createElement("td");
      tdDuration.innerText = loan.duration;
      let tdItems = document.createElement("td");
      tdItems.innerText = loan.loanItems;

      // Payment history cell
      let tdHistory = document.createElement("td");
      if (loan.payments && loan.payments.length > 0) {
        let histUl = document.createElement("ul");
        loan.payments.forEach(p => {
          let histLi = document.createElement("li");
          histLi.innerText = `${new Date(p.date).toLocaleDateString()} : ${p.amount.toLocaleString()}`;
          histUl.appendChild(histLi);
        });
        tdHistory.appendChild(histUl);
      } else {
        tdHistory.innerText = "-";
      }

      // Action buttons
      let tdAction = document.createElement("td");
      if (!loan.deleted) {
        let payBtn = document.createElement("button");
        payBtn.innerText = lang.addPayment;
        payBtn.onclick = function() {
          addPayment(customer, loan.id);
        };
        tdAction.appendChild(payBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = lang.delete;
        deleteBtn.onclick = function() {
          deleteLoan(customer, loan.id);
        };
        tdAction.appendChild(deleteBtn);
      }

      row.appendChild(tdNo);
      row.appendChild(tdCustomer);
      row.appendChild(tdAmount);
      row.appendChild(tdPaid);
      row.appendChild(tdRemain);
      row.appendChild(tdDate);
      row.appendChild(tdDuration);
      row.appendChild(tdItems);
      row.appendChild(tdHistory);
      row.appendChild(tdAction);

      tbody.appendChild(row);
    });
  }
  table.appendChild(tbody);
  loanListDiv.appendChild(table);
}

function addPayment(customerName, loanId) {
  let customers = JSON.parse(localStorage.getItem("customers")) || {};
  let lang = languages[currentLanguage];
  if (customers[customerName]) {
    let loan = customers[customerName].find(loan => loan.id === loanId);
    if (loan && !loan.deleted) {
      let remain = loan.loanAmount - (loan.paidAmount || 0);
      let promptMsg = lang.paymentPrompt + " (" + remain.toLocaleString() + ")";
      let input = prompt(promptMsg, "");
      if (input === null) return; // Cancelled
      let payAmount = parseFloat(input);
      if (
        isNaN(payAmount) ||
        payAmount <= 0 ||
        payAmount > remain
      ) {
        alert(lang.paymentError);
        return;
      }
      // Add payment
      loan.paidAmount = (loan.paidAmount || 0) + payAmount;
      loan.payments = loan.payments || [];
      loan.payments.push({ amount: payAmount, date: new Date().toISOString() });
      localStorage.setItem("customers", JSON.stringify(customers));
      alert(lang.paymentSuccess);
      displayLoans();
    }
  }
}

function searchLoan() {
  let query = document.getElementById("searchInput").value.toLowerCase();
  if (!query) {
    displayLoans();
    return;
  }
  let customers = JSON.parse(localStorage.getItem("customers")) || {};
  let filteredCustomers = {};
  for (let customer in customers) {
    if (customer.toLowerCase().includes(query)) {
      filteredCustomers[customer] = customers[customer];
    }
  }
  let loanListDiv = document.getElementById("loanList");
  loanListDiv.innerHTML = "";

  let lang = languages[currentLanguage];

  let table = document.createElement("table");
  table.id = "loanTable";
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  [
    "No",
    "Customer Name",
    "Loan Amount",
    lang.paidAmount,
    lang.remainingAmount,
    "Loan Date",
    "Duration (Years, Months)",
    "Items",
    lang.paymentHistory,
    "Action"
  ].forEach(text => {
    let th = document.createElement("th");
    th.innerText = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  let tbody = document.createElement("tbody");
  let customerCounter = 1;
  for (let customer in filteredCustomers) {
    let loans = filteredCustomers[customer];
    loans.sort((a, b) => new Date(a.loanDate) - new Date(b.loanDate));
    loans.forEach((loan, index) => {
      let row = document.createElement("tr");
      if (loan.deleted) {
        row.classList.add("deleted");
      }
      let tdNo = document.createElement("td");
      let tdCustomer = document.createElement("td");
      if (index === 0) {
        tdNo.innerText = customerCounter;
        tdCustomer.innerText = customer;
        customerCounter++;
      } else {
        tdNo.innerText = "";
        tdCustomer.innerText = "";
      }
      let tdAmount = document.createElement("td");
      tdAmount.innerText = loan.loanAmount.toLocaleString();

      let tdPaid = document.createElement("td");
      tdPaid.innerText = (loan.paidAmount || 0).toLocaleString();

      let tdRemain = document.createElement("td");
      let remain = loan.loanAmount - (loan.paidAmount || 0);
      tdRemain.innerText = remain.toLocaleString();

      let tdDate = document.createElement("td");
      tdDate.innerText = loan.loanDate;
      let tdDuration = document.createElement("td");
      tdDuration.innerText = loan.duration;
      let tdItems = document.createElement("td");
      tdItems.innerText = loan.loanItems;

      // Payment history cell
      let tdHistory = document.createElement("td");
      if (loan.payments && loan.payments.length > 0) {
        let histUl = document.createElement("ul");
        loan.payments.forEach(p => {
          let histLi = document.createElement("li");
          histLi.innerText = `${new Date(p.date).toLocaleDateString()} : ${p.amount.toLocaleString()}`;
          histUl.appendChild(histLi);
        });
        tdHistory.appendChild(histUl);
      } else {
        tdHistory.innerText = "-";
      }

      // Action buttons
      let tdAction = document.createElement("td");
      if (!loan.deleted) {
        let payBtn = document.createElement("button");
        payBtn.innerText = lang.addPayment;
        payBtn.onclick = function() {
          addPayment(customer, loan.id);
        };
        tdAction.appendChild(payBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = lang.delete;
        deleteBtn.onclick = function() {
          deleteLoan(customer, loan.id);
        };
        tdAction.appendChild(deleteBtn);
      }

      row.appendChild(tdNo);
      row.appendChild(tdCustomer);
      row.appendChild(tdAmount);
      row.appendChild(tdPaid);
      row.appendChild(tdRemain);
      row.appendChild(tdDate);
      row.appendChild(tdDuration);
      row.appendChild(tdItems);
      row.appendChild(tdHistory);
      row.appendChild(tdAction);

      tbody.appendChild(row);
    });
  }
  table.appendChild(tbody);
  loanListDiv.appendChild(table);
}

function deleteLoan(customerName, loanId) {
  let customers = JSON.parse(localStorage.getItem("customers")) || {};
  if (customers[customerName]) {
    customers[customerName] = customers[customerName].map(loan => {
      if (loan.id === loanId) {
        loan.deleted = true;
      }
      return loan;
    });
    localStorage.setItem("customers", JSON.stringify(customers));
    displayLoans();
  }
}

function logout() {
  document.getElementById("posSystem").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  updateText();
  displayLoans();
});