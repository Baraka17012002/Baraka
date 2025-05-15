// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const mobileMenu = document.getElementById("mobile-menu")
const greetingElement = document.getElementById("greeting")
const body = document.body

// Theme Toggle Functionality
function initThemeToggle() {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const shouldUseDarkMode = savedTheme === "dark" || (!savedTheme && systemPrefersDark)

  // Apply initial theme
  if (shouldUseDarkMode) {
    body.classList.add("dark-mode")
    updateThemeIcon(true)
  }

  // Theme toggle event listener
  themeToggle.addEventListener("click", () => {
    const isDarkMode = body.classList.toggle("dark-mode")
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    updateThemeIcon(isDarkMode)
  })
}

// Update theme icon based on current theme
function updateThemeIcon(isDarkMode) {
  themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'
  themeToggle.setAttribute("aria-label", `Switch to ${isDarkMode ? "light" : "dark"} mode`)
}

// Mobile Menu Functionality
function initMobileMenu() {
  mobileMenuToggle.addEventListener("click", () => {
    const isVisible = mobileMenu.style.display === "block"
    mobileMenu.style.display = isVisible ? "none" : "block"
    mobileMenuToggle.innerHTML = isVisible ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>'
    mobileMenuToggle.setAttribute("aria-label", isVisible ? "Open menu" : "Close menu")
  })

  // Close mobile menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none"
      mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>'
      mobileMenuToggle.setAttribute("aria-label", "Open menu")
    }
  })
}

// Time-based Greeting
function updateGreeting() {
  if (!greetingElement) return

  const hour = new Date().getHours()
  let greeting = ""

  if (hour < 12) {
    greeting = "Good morning!"
  } else if (hour < 18) {
    greeting = "Good afternoon!"
  } else {
    greeting = "Good evening!"
  }

  greetingElement.textContent = greeting
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      if (!validateForm(this)) {
        event.preventDefault()
      }
    })
  })
}

function validateForm(form) {
  let isValid = true
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const phoneRegex = /^(\+\d{1,3})?\s?(\d{3})?[\s.-]?\d{3}[\s.-]?\d{4}$/

  // Clear previous error messages
  const errorMessages = form.querySelectorAll(".error-message")
  errorMessages.forEach((el) => el.remove())

  // Remove error class from inputs
  const formControls = form.querySelectorAll(".form-control")
  formControls.forEach((el) => el.classList.remove("error"))

  // Validate required fields
  const requiredFields = form.querySelectorAll("[required]")
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      showError(field, "This field is required")
      isValid = false
    }
  })

  // Validate email fields
  const emailFields = form.querySelectorAll('input[type="email"]')
  emailFields.forEach((field) => {
    if (field.value.trim() && !emailRegex.test(field.value)) {
      showError(field, "Please enter a valid email address")
      isValid = false
    }
  })

  // Validate phone fields
  const phoneFields = form.querySelectorAll('input[type="tel"]')
  phoneFields.forEach((field) => {
    if (field.value.trim() && !phoneRegex.test(field.value)) {
      showError(field, "Please enter a valid phone number")
      isValid = false
    }
  })

  return isValid
}

function showError(field, message) {
  field.classList.add("error")
  const errorElement = document.createElement("div")
  errorElement.className = "error-message"
  errorElement.textContent = message
  field.parentNode.appendChild(errorElement)
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle()
  initMobileMenu()
  updateGreeting()
  initFormValidation()
  initImageMap()

  // Update greeting every minute
  setInterval(updateGreeting, 60000)
})
